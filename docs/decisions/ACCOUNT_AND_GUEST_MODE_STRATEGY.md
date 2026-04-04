# Account & Guest Mode Strategy

## Current State
Both STAAR Power Portal (web) and RiseIQ (app) operate in **guest mode only**:
- Profile stored locally (localStorage on web, AppStorage/UserDefaults on iOS)
- No login, no accounts, no server-side data
- All progress is device-local
- No cross-device sync

## Design Principle
**Guest mode is a first-class product path, not a downgraded experience.** The majority of users (kids + parents) should be able to get full value without ever creating an account.

## Three-Phase Account Architecture

### Phase A: Guest Mode (Current — Shipped)
| Feature | How It Works |
|---------|-------------|
| Profile | Local nickname + avatar + grade |
| Progress | localStorage (web) / UserDefaults (app) |
| Streaks | Tracked locally per device |
| Badges | Earned and stored locally |
| Questions | Bundled with app/site, no download needed |
| Sync | None — device-local only |
| Privacy | Zero data collection, zero tracking |

**Label**: "Local Profile" or "Guest Profile"
**Messaging**: "No account needed — your progress stays on this device"

### Phase B: Optional Account (Future — Planned, Not Built)
| Feature | How It Works |
|---------|-------------|
| Account | Email or Apple Sign-In (optional) |
| Sync | Cloud backup of progress, badges, streaks |
| Multi-device | Same profile on phone + tablet + web |
| Family | Parent can see child's progress remotely |
| Provider | Netlify Identity, Firebase Auth, or Supabase |
| Migration | Guest data merges into account on first sign-in |

**Trigger to build**: When families request cross-device sync or when school deployments need teacher visibility.

**UI treatment**: "Sign in to save across devices" — never block access without an account.

### Phase C: School Accounts (Future — Planned, Not Built)
| Feature | How It Works |
|---------|-------------|
| School admin | Teacher/admin dashboard |
| Class management | Assign grades, view class progress |
| Rostering | Clever/ClassLink SSO integration |
| Branding | School-branded portal via config layer |

**Trigger to build**: When a school district formally requests it.

## Guest vs Account: What Changes

| Feature | Guest (Now) | Signed In (Future) |
|---------|------------|-------------------|
| Practice questions | Full access | Full access |
| Missions & badges | Full access | Full access |
| Progress tracking | Device-local | Cloud-synced |
| Profile | Local only | Synced across devices |
| Streaks | Device-local | Cloud-synced |
| Parent visibility | Same device only | Remote dashboard |
| Data export | Not available | Export to PDF/CSV |

**Key rule**: Guests never see a downgraded experience. Accounts ADD sync — they don't unlock gated content.

## UI Copy Recommendations

### Web (current profile setup)
- Change "Set up your study profile" to "Set up your local study profile"
- Add small note: "Your progress saves on this device. No account needed."

### App (current profile setup)
- Welcome text already says "Welcome to RiseIQ"
- Add below grade selection: "Your progress stays on this device"

### Future account prompt (NOT built yet, for planning)
- "Want to save across devices? Create a free account"
- Never: "Sign up to continue" or "Login required"
- Always: "Continue as guest" as the primary/default option

## Technical Readiness for Phase B
The current architecture is already well-positioned:
- Profile data is serializable (Codable on iOS, JSON on web)
- Progress data uses clean key-value patterns
- Question banks are bundled (no account needed to access content)
- Adding a sync layer later = overlay, not rewrite

## What NOT to Do
- Don't add fake login buttons
- Don't add "Sign up" prompts that go nowhere
- Don't gate any content behind accounts
- Don't add OAuth libraries before they're needed
- Don't collect email addresses without a real purpose
