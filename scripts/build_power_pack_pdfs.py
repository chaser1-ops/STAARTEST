#!/usr/bin/env python3
"""Markdown → branded PDF converter for STAAR Power Portal Wave 1 content.

Usage:
    python3 scripts/build_power_pack_pdfs.py <grade>      # one grade
    python3 scripts/build_power_pack_pdfs.py --all        # all 6 grades

Reads from content-drafts/wave-1/ and writes to site/assets/pdfs/.
Existing Grade 3 PDF is never touched.
"""
import re
import sys
from pathlib import Path

import markdown
from weasyprint import HTML, CSS

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "content-drafts" / "wave-1"
OUTPUT_DIR = ROOT / "site" / "assets" / "pdfs"

GRADES = {
    "kindergarten": {
        "src": "gradek_power_pack_content.md",
        "out": "garland_staar_kindergarten_power_pack.pdf",
        "label": "Kindergarten",
        "subtitle": "Pre-STAAR Foundations · Reading + Math",
    },
    "grade1": {
        "src": "grade1_power_pack_content.md",
        "out": "garland_staar_grade1_power_pack.pdf",
        "label": "Grade 1",
        "subtitle": "Pre-STAAR Foundations · Reading + Math",
    },
    "grade2": {
        "src": "grade2_power_pack_content.md",
        "out": "garland_staar_grade2_power_pack.pdf",
        "label": "Grade 2",
        "subtitle": "Pre-STAAR Foundations · Reading + Math",
    },
    "grade4": {
        "src": "grade4_power_pack_content.md",
        "out": "garland_staar_grade4_power_pack.pdf",
        "label": "Grade 4",
        "subtitle": "STAAR Power Pack · Reading + Math (TEKS-aligned)",
    },
    "grade5": {
        "src": "grade5_power_pack_content.md",
        "out": "garland_staar_grade5_power_pack.pdf",
        "label": "Grade 5",
        "subtitle": "STAAR Power Pack · Reading + Math + Science (TEKS-aligned)",
    },
    "grade6": {
        "src": "grade6_power_pack_content.md",
        "out": "garland_staar_grade6_power_pack.pdf",
        "label": "Grade 6",
        "subtitle": "STAAR Power Pack · Reading + Math (TEKS-aligned)",
    },
}


# ─── Visual placeholder renderer ──────────────────────────────────────────────

STAR_PATH = "M10,1 L12.5,7 L19,7.5 L14,12 L15.5,18.5 L10,15 L4.5,18.5 L6,12 L1,7.5 L7.5,7 Z"


def _star_row(n, fill="#fbbf24"):
    """Yellow stars in a row."""
    parts = []
    spacing = 24
    for i in range(n):
        x = i * spacing
        parts.append(
            f'<g transform="translate({x},0)"><path d="{STAR_PATH}" fill="{fill}" stroke="#d97706" stroke-width="0.5"/></g>'
        )
    width = max(20, n * spacing + 4)
    return f'<svg class="visual" width="{width}" height="22" viewBox="0 0 {width} 22" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'


def _apple_row(n, fill="#dc2626"):
    """Red apples in a row, with leaf detail."""
    parts = []
    spacing = 24
    for i in range(n):
        cx = i * spacing + 11
        parts.append(
            f'<circle cx="{cx}" cy="13" r="9" fill="{fill}" stroke="#7f1d1d" stroke-width="0.6"/>'
        )
        parts.append(
            f'<path d="M{cx},4 q3,-3 5,-1" fill="none" stroke="#16a34a" stroke-width="1.5"/>'
        )
    width = max(22, n * spacing + 4)
    return f'<svg class="visual" width="{width}" height="24" viewBox="0 0 {width} 24" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'


def _circle_row(n, fill, label=None):
    """Brown cookies / blue balls etc — simple circles in a row."""
    parts = []
    spacing = 22
    label_offset = 0
    if label:
        parts.append(
            f'<text x="0" y="14" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#1f2937">{label}</text>'
        )
        label_offset = 75
    for i in range(n):
        cx = label_offset + i * spacing + 10
        parts.append(
            f'<circle cx="{cx}" cy="10" r="8" fill="{fill}" stroke="#1f2937" stroke-width="0.4"/>'
        )
    width = label_offset + max(20, n * spacing + 4)
    return f'<svg class="visual" width="{width}" height="22" viewBox="0 0 {width} 22" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'


def _comparison_groups(groups):
    """Two or three labeled rows of items: groups = [(label, count, fill), ...]"""
    rows_html = []
    for i, (label, count, fill) in enumerate(groups):
        y_offset = i * 24
        rows_html.append(
            f'<g transform="translate(0,{y_offset})">'
            f'<text x="0" y="14" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#1f2937">{label}</text>'
        )
        for j in range(count):
            cx = 80 + j * 22 + 10
            rows_html.append(
                f'<circle cx="{cx}" cy="10" r="8" fill="{fill}" stroke="#1f2937" stroke-width="0.4"/>'
            )
        rows_html.append("</g>")
    height = 24 * len(groups)
    max_count = max(c for _, c, _ in groups)
    width = 80 + max_count * 22 + 8
    return (
        f'<svg class="visual" width="{width}" height="{height}" viewBox="0 0 {width} {height}" '
        f'xmlns="http://www.w3.org/2000/svg">{"".join(rows_html)}</svg>'
    )


def _dog_next_to_box():
    """All-emoji visual: dog next to box. Sidesteps WeasyPrint SVG <rect> + emoji
    mixing quirks where the rectangle wasn't rendering."""
    return (
        '<span class="visual emoji-visual">'
        '<span class="emoji-large">🐕</span>'
        '<span class="position-word">[next to]</span>'
        '<span class="emoji-large">📦</span>'
        "</span>"
    )


def _shape_primitives_row():
    """Four labeled shape primitives in a row — for the K Q7 'circle, square,
    triangle, rectangle' shape-recognition prompt."""
    cell_width = 70
    cell_height = 60
    width = cell_width * 4
    cells = []
    # Circle
    cells.append(
        f'<g transform="translate(0,0)">'
        f'<circle cx="{cell_width//2}" cy="22" r="18" fill="#5ee6ff" stroke="#1f2937" stroke-width="1.2"/>'
        f'<text x="{cell_width//2}" y="55" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">circle</text>'
        f"</g>"
    )
    # Square
    cells.append(
        f'<g transform="translate({cell_width},0)">'
        f'<rect x="{cell_width//2 - 18}" y="4" width="36" height="36" fill="#9a7cff" stroke="#1f2937" stroke-width="1.2" rx="2"/>'
        f'<text x="{cell_width//2}" y="55" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">square</text>'
        f"</g>"
    )
    # Triangle
    cells.append(
        f'<g transform="translate({cell_width*2},0)">'
        f'<polygon points="{cell_width//2},4 {cell_width//2 - 18},40 {cell_width//2 + 18},40" fill="#ffd166" stroke="#1f2937" stroke-width="1.2"/>'
        f'<text x="{cell_width//2}" y="55" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">triangle</text>'
        f"</g>"
    )
    # Rectangle (elongated)
    cells.append(
        f'<g transform="translate({cell_width*3},0)">'
        f'<rect x="{cell_width//2 - 26}" y="10" width="52" height="24" fill="#ff5fa2" stroke="#1f2937" stroke-width="1.2" rx="2"/>'
        f'<text x="{cell_width//2}" y="55" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">rectangle</text>'
        f"</g>"
    )
    return (
        f'<svg class="visual" width="{width}" height="{cell_height}" '
        f'viewBox="0 0 {width} {cell_height}" xmlns="http://www.w3.org/2000/svg">{"".join(cells)}</svg>'
    )


# Match both `[Visual: ...]` and `[Visual choices: ...]` (case-insensitive on prefix)
VISUAL_PATTERN = re.compile(r"\[Visual(?:\s+choices)?:\s*([^\]]+)\]", re.IGNORECASE)


def render_visual(description):
    """Return SVG/HTML for a [Visual: ...] description, or italic fallback."""
    desc = description.strip().lower()

    # "5 stars in one row"
    m = re.search(r"(\d+)\s*stars?\s+in\s+one\s+row", desc)
    if m:
        return _star_row(int(m.group(1)))

    # "8 apples, spaced clearly"
    m = re.search(r"(\d+)\s*apples?", desc)
    if m:
        return _apple_row(int(m.group(1)))

    # "Group A has X cookies. Group B has Y cookies." (with optional Group C)
    m = re.findall(r"group\s+([abc])\s+has\s+(\d+)\s+(\w+)", desc)
    if m:
        # cookie color map
        colors = {"cookies": "#a16207", "balls": "#3b82f6", "apples": "#dc2626"}
        item_kind = m[0][2]
        fill = colors.get(item_kind, "#6b7280")
        groups = [(f"Group {grp.upper()}:", int(count), fill) for grp, count, _ in m]
        return _comparison_groups(groups)

    # "dog sitting next to a box"
    if "dog" in desc and "box" in desc:
        return _dog_next_to_box()

    # Shape recognition row: "circle, square, triangle, rectangle"
    if "circle" in desc and "square" in desc and "triangle" in desc and "rectangle" in desc:
        return _shape_primitives_row()

    # Fallback — italic text marker
    return f'<em class="visual-fallback">[Visual: {description.strip()}]</em>'


def replace_visuals(html):
    """Replace [Visual: ...] markers in HTML with inline SVG."""
    return VISUAL_PATTERN.sub(lambda m: render_visual(m.group(1)), html)


# ─── Markdown preprocessing ───────────────────────────────────────────────────


def strip_decorative_hr(md):
    """Remove leading `---` decorative horizontal rule (cosmetic divider)."""
    lines = md.split("\n")
    # skip leading blank lines
    while lines and not lines[0].strip():
        lines.pop(0)
    if lines and lines[0].strip() == "---":
        # this is a leading --- not followed by frontmatter (frontmatter already stripped)
        lines.pop(0)
        # skip blank lines after
        while lines and not lines[0].strip():
            lines.pop(0)
    return "\n".join(lines)


def md_to_html_body(md_text):
    """Markdown → HTML body fragment."""
    md_text = strip_decorative_hr(md_text)
    html = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "sane_lists", "smarty", "attr_list"],
    )
    html = replace_visuals(html)
    return html


# ─── HTML/CSS templates ───────────────────────────────────────────────────────

BRAND_CSS = """
@page {
    size: Letter;
    margin: 0.6in 0.6in 0.7in 0.6in;
    @bottom-center {
        content: "staartest.app  ·  Free forever  ·  No account, no tracking  ·  Brought to you by RISE Studio Labs";
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 8pt;
        color: #6b7280;
        padding-top: 6pt;
    }
    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 8pt;
        color: #6b7280;
        padding-top: 6pt;
    }
}

@page :first {
    margin-top: 0.4in;
}

* { box-sizing: border-box; }

html, body {
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 11pt;
    line-height: 1.55;
    color: #0f172a;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}

/* Brand gradient bar at top of page (page-relative, repeats on each page via running header) */
.brand-bar {
    height: 6pt;
    background: linear-gradient(90deg, #5ee6ff 0%, #9a7cff 50%, #ff5fa2 100%);
    margin: 0 0 16pt 0;
    border-radius: 1pt;
}

/* Cover */
.cover {
    margin-bottom: 18pt;
    padding-bottom: 12pt;
    border-bottom: 1px solid #e5e7eb;
}

.cover-eyebrow {
    font-size: 9pt;
    font-weight: 700;
    color: #5b21b6;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0 0 6pt 0;
}

.cover-title {
    font-size: 26pt;
    font-weight: 800;
    color: #09111f;
    margin: 0 0 4pt 0;
    line-height: 1.15;
    letter-spacing: -0.01em;
}

.cover-subtitle {
    font-size: 12pt;
    color: #475569;
    margin: 0;
    font-weight: 500;
}

/* Markdown content */
h1:not(.cover-title) {
    /* Suppress duplicate H1 from markdown body — the cover renders the title.
       Scoped so the cover-title H1 is preserved. */
    display: none;
}

h2 {
    font-size: 15pt;
    font-weight: 700;
    color: #09111f;
    margin: 18pt 0 8pt 0;
    padding-left: 8pt;
    border-left: 4px solid #5ee6ff;
    page-break-after: avoid;
}

h3 {
    font-size: 12pt;
    font-weight: 700;
    color: #5b21b6;
    margin: 12pt 0 6pt 0;
    page-break-after: avoid;
}

h4 {
    font-size: 11pt;
    font-weight: 700;
    color: #1f2937;
    margin: 10pt 0 4pt 0;
    page-break-after: avoid;
}

p {
    margin: 0 0 8pt 0;
}

ul, ol {
    margin: 0 0 10pt 0;
    padding-left: 22pt;
}

li {
    margin: 0 0 4pt 0;
}

strong { font-weight: 700; color: #09111f; }
em { font-style: italic; }

/* Tables */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 8pt 0 12pt 0;
    page-break-inside: avoid;
}

thead th {
    background: #ecfeff;
    color: #0e7490;
    font-weight: 700;
    text-align: left;
    padding: 6pt 8pt;
    border-bottom: 2px solid #5ee6ff;
}

tbody td {
    padding: 5pt 8pt;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
}

tbody tr:nth-child(odd) td { background: #f8fafc; }
tbody tr:nth-child(even) td { background: #ffffff; }

/* Code */
code {
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
    font-size: 10pt;
    background: #f1f5f9;
    padding: 1pt 4pt;
    border-radius: 2pt;
    color: #1e293b;
}

pre {
    background: #f1f5f9;
    padding: 8pt 10pt;
    border-radius: 4pt;
    border-left: 3px solid #9a7cff;
    overflow-x: auto;
    page-break-inside: avoid;
}

pre code { background: transparent; padding: 0; font-size: 10pt; }

/* Block quotes (Power Move callouts) */
blockquote {
    background: linear-gradient(90deg, #ecfeff, #f5f3ff);
    border-left: 4px solid #9a7cff;
    padding: 10pt 14pt;
    margin: 10pt 0;
    border-radius: 2pt;
    page-break-inside: avoid;
    color: #1e293b;
}

blockquote p:last-child { margin-bottom: 0; }

/* Horizontal rules — soft separator */
hr {
    border: 0;
    height: 1px;
    background: #e5e7eb;
    margin: 14pt 0;
}

/* Visual SVGs (inline rendered visuals) */
svg.visual {
    display: inline-block;
    vertical-align: middle;
    margin: 2pt 0;
}

em.visual-fallback {
    color: #6b7280;
    font-style: italic;
}

/* Emoji-based visual (e.g., dog next to box) */
.emoji-visual {
    display: inline-flex;
    align-items: center;
    gap: 8pt;
    margin: 4pt 0;
    vertical-align: middle;
}

.emoji-visual .emoji-large {
    font-size: 22pt;
    line-height: 1;
}

.emoji-visual .position-word {
    font-style: italic;
    color: #6b7280;
    font-size: 10pt;
    padding: 2pt 4pt;
}

/* Links — stay inline-blue, no underline since print */
a {
    color: #1d4ed8;
    text-decoration: underline;
    text-decoration-color: rgba(29, 78, 216, 0.4);
}

/* Avoid orphan headings */
h2 + p, h3 + p, h4 + p { page-break-before: avoid; }
"""


def page_html(label, subtitle, body_html):
    """Wrap content in branded HTML document."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Garland {label} STAAR Power Pack</title>
</head>
<body>
<div class="brand-bar"></div>
<div class="cover">
  <p class="cover-eyebrow">Garland · STAAR Power Portal · Free Forever</p>
  <h1 class="cover-title">{label} STAAR Power Pack</h1>
  <p class="cover-subtitle">{subtitle}</p>
</div>
{body_html}
</body>
</html>
"""


# ─── Conversion orchestrator ──────────────────────────────────────────────────


def convert_pack(grade_key):
    cfg = GRADES[grade_key]
    src = SOURCE_DIR / cfg["src"]
    out = OUTPUT_DIR / cfg["out"]

    if not src.exists():
        print(f"  FAIL: source missing {src}")
        return False

    md_text = src.read_text(encoding="utf-8")
    body_html = md_to_html_body(md_text)
    full_html = page_html(cfg["label"], cfg["subtitle"], body_html)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    HTML(string=full_html, base_url=str(ROOT)).write_pdf(
        str(out), stylesheets=[CSS(string=BRAND_CSS)]
    )

    size_kb = out.stat().st_size / 1024
    print(f"  OK: {cfg['out']} ({size_kb:.1f} KB)")
    return True


def main():
    if len(sys.argv) < 2:
        print("Usage: build_power_pack_pdfs.py <grade> | --all")
        print("Grades:", ", ".join(GRADES.keys()))
        sys.exit(1)

    arg = sys.argv[1]
    if arg == "--all":
        results = {g: convert_pack(g) for g in GRADES}
        ok = sum(1 for v in results.values() if v)
        print(f"\n{ok} / {len(GRADES)} packs converted successfully")
        sys.exit(0 if ok == len(GRADES) else 1)

    if arg not in GRADES:
        print(f"Unknown grade: {arg}. Valid: {list(GRADES.keys())}")
        sys.exit(1)

    success = convert_pack(arg)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
