# 🧠 Cline Memory Bank - ReadStellar Project

## 📋 Project Overview

**Project Name:** ReadStellar  
**Type:** Blockchain dApp  
**Platform:** Stellar Soroban  
**Concept:** Web3 integrated reading app with NFT badges and token rewards  
**Target:** Book reading engagement through gamification and blockchain rewards

---

## 🎯 Project Phases

### Phase I: MVP Foundation (Current Focus - PDR Requirements)
**Status:** 🚧 In Development  
**Duration:** ~2.5 hours initial development  
**Goal:** Basic frontend + minimal contract integration + testnet deployment

#### Phase I Scope - What We're Building:

**1. Freighter Wallet Integration:**
- Connect button using `window.freighterApi`
- Save `publicKey` to localStorage or state
- Disconnect clears state
- Redirect to `/main` on successful connection
- **Reference:** Check `FreighterWalletDocs.md` during implementation

**2. Pages Structure:**

**index.tsx (Landing/Connect Page):**
- Single "Connect Wallet" button
- Modern, clean design with Tailwind CSS
- Freighter wallet connection logic
- Redirect to `/main` after successful connection

**main.tsx (Reading Dashboard):**
- Display connected wallet address
- Book reading interface with:
  - Input: Book selection/title
  - Button: "Start Reading"
  - Button: "Complete Book"
  - Display: Total books read counter
  - Display: Last completed book info
- Disconnect wallet button

**3. Soroban Contract (Rust) - MINIMAL:**

**Contract Name:** `reading_tracker`

**Functions (Maximum 3-4):**
```rust
// Function 1: Record book completion
fn complete_book(env: Env, reader: Address, book_title: String) -> Result<(), Error>
// Saves: reader address + book title + timestamp

// Function 2: Get total books read by user
fn get_total_books(env: Env, reader: Address) -> u32
// Returns: count of books completed

// Function 3: Get last completed book
fn get_last_book(env: Env, reader: Address) -> String
// Returns: last book title

// Optional Function 4: Get global reading count
fn get_global_count(env: Env) -> u32
// Returns: total books read by all users
```

**Storage:**
- Use `env.storage().persistent()` or `env.storage().instance()`
- Simple key-value pairs only
- No complex data structures

**4. Frontend Integration:**
- Call contract functions via Stellar SDK (testnet)
- Sign transactions with Freighter
- Use try/catch for all async operations
- Console.log transaction results for debugging
- Display loading states during contract calls
- Show success/error messages to user

#### Phase I Technical Stack:
- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, TypeScript
- **Contract:** Rust + Soroban SDK (basic usage only)
- **Wallet:** Freighter API (connect/sign only)
- **Network:** Stellar Testnet
- **SDK:** @stellar/stellar-sdk

#### Phase I File Structure (Minimal):
```
/src
  /app
    page.tsx              # Connect wallet page
    /main
      page.tsx            # Reading dashboard
  /lib
    wallet.ts             # Freighter wallet functions
    soroban.ts            # Contract call functions
    contract-config.ts    # Contract ID storage
  /components
    ConnectButton.tsx     # Reusable wallet button
    BookCompleteForm.tsx  # Book completion UI

/contracts
  /reading_tracker
    src/lib.rs           # Main contract code
    Cargo.toml           # Dependencies
```

#### Phase I Development Workflow:

**Step 1: Frontend Setup (30 min)**
```bash
npx create-next-app@latest readstellar --typescript --tailwind --app
cd readstellar
npm install @stellar/stellar-sdk
```

**Step 2: Contract Development (45 min)**
```bash
cd contracts
soroban contract init reading_tracker
cd reading_tracker
# Write contract with 3-4 simple functions
cargo test
```

**Step 3: Contract Deployment (15 min)**
```bash
soroban contract build
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/reading_tracker.wasm \
  --source ADMIN_SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

**Step 4: Integration (30 min)**
- Implement `lib/soroban.ts` with contract call functions
- Wire up UI buttons to contract functions
- Add loading states and error handling
- Test complete user flow

#### Phase I Testing Checklist:

**✅ Wallet Connection:**
- [ ] Can connect Freighter wallet
- [ ] PublicKey saved and displayed
- [ ] Redirect to /main works
- [ ] Disconnect clears state

**✅ Contract Deployment:**
- [ ] Contract builds successfully
- [ ] Contract deploys to testnet
- [ ] Contract ID is saved
- [ ] Functions are callable via CLI test

**✅ Contract Integration:**
- [ ] Can call `complete_book()` from frontend
- [ ] Transaction signs with Freighter
- [ ] Success message displays
- [ ] Counter updates correctly

**✅ Read Operations:**
- [ ] `get_total_books()` returns correct count
- [ ] `get_last_book()` returns last title
- [ ] Data persists between sessions

**✅ Error Handling:**
- [ ] Wallet connection errors caught
- [ ] Transaction errors displayed
- [ ] Network errors handled gracefully

#### Phase I Success Criteria:
1. ✅ Contract deployed and running on Stellar Testnet
2. ✅ Freighter wallet connects/disconnects properly
3. ✅ Can complete a "book" (call contract function)
4. ✅ Counter increments correctly
5. ✅ Last book title displays
6. ✅ All operations work end-to-end in <2 hours development time

#### Phase I User Flow:
```
User visits app
  → Clicks "Connect Wallet"
  → Freighter prompts connection
  → Redirects to /main
  → Enters book title "1984"
  → Clicks "Complete Book"
  → Freighter prompts signature
  → Transaction submits
  → Success message shows
  → Counter updates: "You've read 1 book(s)"
  → Last book shows: "1984"
```

#### Phase I Constraints (STRICT):

**❌ NOT Allowed in Phase I:**
- Complex business logic
- Token operations (READ token is Phase II+)
- Badge/NFT minting (Phase II+)
- Quiz system (Phase II+)
- Multi-page book reader
- User registration/database
- File uploads (EPUB files)
- Review system
- Leaderboards
- Goal tracking
- Fee calculations
- Access control/permissions
- Complex file structures
- External crates beyond Soroban SDK

**✅ Allowed in Phase I:**
- Simple state storage
- Basic counter operations
- Wallet address storage
- String storage (book titles)
- Read/write operations only
- Console logging
- Basic error handling
- Minimal UI components

---

### Phase II: Core Reading Features & Badge System
**Status:** 📋 Planned (Wait for Phase I approval)  
**Duration:** Week 3-6  
**Goal:** Implement reading functionality, quiz system, and basic badge minting

#### Phase II Features:

**1. Book Library System:**
- Add 10-20 free books (public domain classics)
- Book catalog stored in PostgreSQL database
- Book metadata: title, author, genre, page count, ISBN
- Simple EPUB reader with page tracking
- Reading progress persistence
- Book preview (first 2 chapters)

**2. Database Integration:**
```prisma
// Database Schema
model User {
  id            String   @id @default(cuid())
  walletAddress String   @unique
  username      String?
  createdAt     DateTime @default(now())
  
  completions   BookCompletion[]
  badges        BadgeOwnership[]
  reviews       Review[]
}

model Book {
  id          String   @id @default(cuid())
  title       String
  author      String
  isbn        String?  @unique
  genre       String[]
  pageCount   Int
  epubUrl     String
  coverUrl    String
  
  completions BookCompletion[]
  quizzes     Quiz[]
}

model BookCompletion {
  id          String   @id @default(cuid())
  userId      String
  bookId      String
  startedAt   DateTime
  completedAt DateTime?
  quizScore   Int?
  readingTime Int      // in minutes
  
  user User @relation(fields: [userId], references: [id])
  book Book @relation(fields: [bookId], references: [id])
}

model BadgeOwnership {
  id        String   @id @default(cuid())
  userId    String
  badgeType String
  mintedAt  DateTime @default(now())
  txHash    String?
  
  user User @relation(fields: [userId], references: [id])
}
```

**3. Reading Proof Mechanism:**

**Page Progress Tracking:**
- Start time recorded when user begins reading
- Page updates tracked (every 10 pages or 10 minutes)
- Finish time recorded on completion
- Minimum reading time required based on book length
  - Example: 300-page book requires at least 3 hours total reading time
  - Prevents instant "completion" fraud

**Quiz/Test System:**
- 5 questions per book (multiple choice)
- Questions cover: plot, characters, themes, key events
- Must score 60%+ to pass (3/5 correct)
- 3 attempts allowed (24-hour cooldown between failed attempts)
- Failed attempts still count toward "effort" metrics

**Optional Review Writing:**
- Minimum 100 words
- AI analysis for quality (sentiment + structure analysis)
- Quality reviews unlock additional badge opportunities
- Review rewards:
  - Basic review = +25 READ bonus
  - Quality review = +50 READ bonus + eligible for review badges

**4. Badge System (NFTs) - Phase II Subset:**

**A. Milestone Badges (5 types - Permanent, Never Reset):**
- "First Book Ever" - Complete your first book
- "5 Books Milestone" - Lifetime achievement
- "10 Books Milestone" - Lifetime achievement
- "20 Books Milestone" - Lifetime achievement
- "50 Books Milestone" - Lifetime achievement

**B. Speed Badges (2 types):**
- "Speed Reader" - Finish a book in under 7 days
- "Weekly Warrior" - 4 week reading streak (at least 1 book/week)

**Badge Technical Implementation:**
```rust
// Enhanced contract for Phase II
pub fn mint_badge(env: Env, user: Address, badge_type: Symbol, metadata: String) -> Result<u64, Error>
pub fn get_user_badges(env: Env, user: Address) -> Vec<Badge>
pub fn verify_badge_ownership(env: Env, user: Address, badge_id: u64) -> bool

pub struct Badge {
    pub id: u64,
    pub badge_type: Symbol,
    pub owner: Address,
    pub metadata: String,
    pub mint_date: u64,
}
```

**5. READ Token Introduction:**

**Earning READ Tokens (Phase II):**
```
Book Completion:
- Complete book + pass quiz = 100 READ
- Complete book + pass quiz + write review = 150 READ
- Complete book + pass quiz + quality review = 200 READ

Daily Activities:
- Read 30+ minutes = 10 READ (once per day)
- 7-day reading streak = 50 READ bonus
```

**READ Token Contract:**
```rust
pub fn mint_read_tokens(env: Env, user: Address, amount: i128) -> Result<(), Error>
pub fn transfer_read_tokens(env: Env, from: Address, to: Address, amount: i128) -> Result<(), Error>
pub fn get_token_balance(env: Env, user: Address) -> i128
```

**6. Backend API (Node.js/Next.js API Routes):**
```
/api/books/list - Get available books
/api/reading/start - Start reading session
/api/reading/progress - Update progress
/api/reading/complete - Submit completion + quiz
/api/badges/mint - Trigger badge minting
/api/tokens/balance - Get READ token balance
```

#### Phase II Technical Stack Additions:
- **Database:** PostgreSQL with Prisma ORM
- **File Storage:** S3/Cloudflare R2 for EPUB files
- **Caching:** Redis for session data
- **Queue:** BullMQ for async badge minting

#### Phase II Testing Requirements:
- [ ] Book library displays correctly
- [ ] Reading progress saves properly
- [ ] Quiz system validates answers
- [ ] Badge minting triggers on completion
- [ ] READ tokens credit to user account
- [ ] Review system accepts and stores reviews
- [ ] All database operations perform efficiently

---

### Phase III: Advanced Gamification & Social Features
**Status:** 📋 Future (After Phase II completion)  
**Duration:** Week 7-10  
**Goal:** Enhanced badge system, social features, and yearly goals

#### Phase III Features:

**1. Complete Badge System (15 total types):**

**A. Milestone Badges (5 - from Phase II):**
- Already implemented in Phase II

**B. Yearly Achievement Badges (Reset Every January 1st):**
- "Bronze Reader 2025" - Read 1-10 books this year
- "Silver Reader 2025" - Read 11-25 books this year
- "Gold Reader 2025" - Read 26-50 books this year
- "Diamond Reader 2025" - Read 51+ books this year
- Year-specific badges create collectible series

**C. Yearly Goal Badges (User Sets Personal Goals):**
- "Goal Crusher 2025" - Achieved personal yearly reading goal
- "Overachiever 2025" - Exceeded goal by 50%+
- "Consistent Reader 2025" - Read at least 1 book per month (12/12 months)
- "Quarter Champion Q1 2025" - Met quarterly sub-goals

**D. Genre & Author Badges (Cumulative - Never Reset):**
- "Sci-Fi Enthusiast" - Read 5 sci-fi books (lifetime)
- "Mystery Detective" - Read 10 mystery books (lifetime)
- "Classics Scholar" - Read 5 classic literature books (lifetime)
- "[Author Name] Fan" - Read 3+ books by same author (lifetime)

**E. Enhanced Review Quality Badges:**
- "Critical Thinker" - Write 5 analytical reviews (NFT reward)
- "Curious Reader" - Write 3 reviews with deeper questions (NFT reward)
- "Logical Reviewer" - Write 5 well-structured reviews (NFT reward)
- "Grounded Justification" - Write 3 evidence-based reviews (NFT reward)
- "Balanced Critic" - Write 5 reviews with pros/cons analysis (NFT reward)
- "Constructive Contributor" - Write 10 thoughtful reviews (NFT reward)
- "Review Master" - Write 50 reviews total

**2. Yearly Goal System:**

**Goal Setting (January or Account Creation):**
```
User sets personal goal:
- Minimum: 6 books/year
- Maximum: 100 books/year
- Can set quarterly sub-goals
- Can adjust goal once per year (with penalty)

Example Goals:
- "I want to read 24 books in 2025" (2 books/month)
- Quarterly: 6 books per quarter
- Monthly: 2 books per month
```

**Goal Tracking Dashboard:**
```
Progress Display:
- Books completed: 15/24
- Current pace: "On track" / "Behind" / "Ahead"
- Projected finish: "You'll reach 28 books at current pace"
- Next milestone: "3 more books to reach Q2 goal"

Reminders:
- Weekly: "You're 2 books behind schedule"
- Monthly: "Complete 1 more book to stay on track"
- Quarterly: "You've met 75% of Q1 goal!"
```

**Goal Achievement Rewards:**
```
100% Goal = "Goal Crusher 2025" badge + 500 READ
110-149% = "Overachiever 2025" badge + 750 READ
150%+ = "Reading Legend 2025" badge + 1,000 READ
<100% but >75% = "Solid Effort 2025" badge + 250 READ

Monthly Consistency Bonus:
- Met monthly targets 12/12 months = "Consistent Reader" badge + 500 READ
```

**Goal Challenges (Community):**
```
Join Public Challenges:
- "100 Books in 2025" challenge
- "52 Books in 52 Weeks" challenge
- Genre-specific: "20 Sci-Fi Books This Year"

Benefits:
- Compete with others
- Shared leaderboard
- Challenge-specific badges
- Community motivation
```

**Contract Extensions:**
```rust
pub fn set_yearly_goal(env: Env, user: Address, goal: u32, year: u32) -> Result<(), Error>
pub fn get_goal_progress(env: Env, user: Address, year: u32) -> GoalProgress
pub fn record_completion(env: Env, user: Address, book_id: String, quiz_score: u32) -> Result<(), Error>
pub fn get_reading_stats(env: Env, user: Address) -> ReadingStats
```

**3. Social Features:**

**Book Clubs:**
- Create private/public book clubs
- Club discussion forums
- Club-exclusive challenges
- Club vs club competitions
- "Book Club Rankings" leaderboard

**Friend System:**
- Add friends by wallet address
- View friends' reading progress
- Challenge friends to reading duels
- Gift books with READ tokens
- Share badges and achievements

**Community Events:**
- "Global Reading Day" - Everyone reads same book
- "Genre Week" - Mystery week, sci-fi week, etc.
- "Speed Reading Competition"
- Seasonal challenges (Summer Reading Challenge)

**4. Leaderboards:**
- "2025 Diamond Readers" - Top readers this year
- "All-Time Legends" - Lifetime book count
- "Friends Circle" - Compete with friends
- "Book Club Rankings" - Club vs club
- Reset Schedule: Yearly resets January 1st, Lifetime stats never reset

**5. Enhanced Token Economy:**

**Full READ Token Earning:**
```
Book Completion:
- Complete book + pass quiz = 100 READ
- Complete book + pass quiz + write review = 150 READ
- Complete book + pass quiz + quality review = 200 READ

Daily Activities:
- Read 30+ minutes = 10 READ (once per day)
- 7-day reading streak = 50 READ bonus
- 30-day reading streak = 200 READ bonus

Social & Goals:
- Refer a friend (when they complete first book) = 300 READ
- Achieve yearly goal = 500 READ
- Join a book club = 50 READ (one-time)
- Participate in challenge = 100 READ

Monthly Maximum Earnings (Free Tier):
- 12 books × 200 READ = 2,400 READ
- Daily reading (30 days × 10) = 300 READ
- Streaks & bonuses = ~500 READ
- Total: ~3,200 READ/month possible
```

**READ Token Usage:**
```
Books & Content:
- Access to premium books = 500 READ per book
- Monthly unlimited pass = 500 READ
- Yearly unlimited pass = 5,000 READ (save 1,000)

Badges & Collectibles:
- Special badge collections = 1,000 READ
- Limited edition badge = 1,000 READ
- Seasonal special badge = 750 READ
- Author collaboration badge = 1,500 READ

Social Features:
- Gifting book to friend = 500 READ
- Create private book club = 100 READ
- Host reading challenge = 200 READ
- Book recommendations = 100 READ

Profile & Customization:
- Custom profile theme = 250 READ
- Animated badge display = 500 READ
- Profile spotlight (1 week) = 300 READ
```

**6. Yearly Reading Limitation System:**

**Purpose:** Prevents gaming, creates fair competition, manages costs

**How It Works:**
```
Free Tier (Annual Limits):
- 12 free books per year (1 per month average)
- Unlimited re-reads of completed books
- Access to book previews (first 2 chapters)
- Can earn +3 bonus books through referrals

Premium Tier (Token-Based):
- Option A: Pay 500 READ tokens per additional book
- Option B: Premium Pass (5,000 READ tokens/year) = Unlimited books
- Option C: Monthly Pass (500 READ tokens/month) = Unlimited books that month
```

**Benefits:**
- ✅ Prevents users from gaming daily reading rewards
- ✅ Creates value for READ tokens
- ✅ Makes yearly goals meaningful
- ✅ Reduces server/bandwidth costs
- ✅ Users are more intentional about book selection

#### Phase III Database Extensions:
```prisma
model YearlyGoal {
  id        String   @id @default(cuid())
  userId    String
  year      Int
  goal      Int
  completed Int      @default(0)
  
  user User @relation(fields: [userId], references: [id])
}

model BookClub {
  id          String   @id @default(cuid())
  name        String
  description String?
  isPrivate   Boolean  @default(false)
  createdAt   DateTime @default(now())
  
  members     BookClubMember[]
  challenges  Challenge[]
}

model Challenge {
  id          String   @id @default(cuid())
  name        String
  description String
  startDate   DateTime
  endDate     DateTime
  goalCount   Int
  
  participants ChallengeParticipant[]
}
```

---

### Phase IV: Full Platform & Monetization
**Status:** 📋 Future (After Phase III completion)  
**Duration:** Week 11-14  
**Goal:** Complete ecosystem with advanced features and monetization

#### Phase IV Features:

**1. Advanced Challenges:**
- "5 Books in 30 Days"
- "Classics Marathon"
- "Around the World" (books from 10 countries)
- "Author Deep Dive" (5 books by one author)
- Genre-based challenges with special rewards

**2. Gamification Enhancement:**

**Level System (Yearly):**
- Bronze Reader (1-10 books)
- Silver Reader (11-25 books)
- Gold Reader (26-50 books)
- Diamond Reader (51+ books)
- Level-up animations and rewards
- Level-specific perks and access

**3. Monetization Features:**

**Freemium Model:**
```
Free Tier:
- 12 books/year
- Basic badges
- Standard features
- READ token earning

Premium Pass ($49.99/year or 5,000 READ/year):
- Unlimited books
- Exclusive badges
- Early access to new releases
- Ad-free experience
- Priority support
- Bonus: 1,000 READ tokens included
```

**Token Sales (Optional Fiat Purchase):**
```
READ Token Packs:
- 500 READ = $4.99
- 1,500 READ = $12.99
- 5,000 READ = $39.99
- 10,000 READ = $74.99 (best value)

Note: Users can earn tokens for free, this is just optional shortcut
```

**Revenue Streams:**
1. Commission from book sales (20-30%)
2. Premium membership subscriptions
3. Special/Limited edition badge sales
4. Sponsored badges for authors
5. Featured book placements (publishers pay)
6. Exclusive early releases on platform
7. Optional advertising (non-intrusive)

**4. Author Partnerships:**
- Author collaboration badges
- Exclusive author content
- Author Q&A events
- Signed digital editions
- Author-specific challenges

**5. NFT Marketplace (Optional):**
- Trade special edition badges
- Auction rare badges
- Badge gifting system
- Badge showcase galleries

**6. Mobile App Development:**
- iOS and Android apps
- Cross-platform sync
- Offline reading mode
- Push notifications for challenges
- Mobile-optimized reader

---

## 🛠 Technical Architecture (Complete)

### Frontend Architecture
```
src/
├── app/
│   ├── page.tsx                    # Landing page (Phase I)
│   ├── main/
│   │   └── page.tsx               # Reading dashboard (Phase I)
│   ├── library/
│   │   └── page.tsx               # Book library (Phase II)
│   ├── read/
│   │   └── [bookId]/
│   │       └── page.tsx           # E-book reader (Phase II)
│   ├── badges/
│   │   └── page.tsx               # Badge collection (Phase II)
│   ├── goals/
│   │   └── page.tsx               # Goal tracking (Phase III)
│   ├── leaderboard/
│   │   └── page.tsx               # Rankings (Phase III)
│   ├── profile/
│   │   └── page.tsx               # User profile (Phase III)
│   └── clubs/
│       └── page.tsx               # Book clubs (Phase III)
├── components/
│   ├── wallet/
│   │   ├── ConnectButton.tsx      # Phase I
│   │   └── WalletInfo.tsx         # Phase I
│   ├── books/
│   │   ├── BookCard.tsx           # Phase II
│   │   ├── BookReader.tsx         # Phase II
│   │   └── BookList.tsx           # Phase II
│   ├── badges/
│   │   ├── BadgeCard.tsx          # Phase II
│   │   └── BadgeGallery.tsx       # Phase II
│   ├── quiz/
│   │   ├── QuizQuestion.tsx       # Phase II
│   │   └── QuizResults.tsx        # Phase II
│   └── social/
│       ├── Leaderboard.tsx        # Phase III
│       └── BookClubCard.tsx       # Phase III
├── lib/
│   ├── wallet.ts                  # Freighter integration (Phase I)
│   ├── soroban.ts                 # Contract calls (Phase I)
│   ├── contract-config.ts         # Contract IDs (Phase I)
│   ├── db.ts                      # Database client (Phase II)
│   └── utils.ts                   # Helper functions
├── hooks/
│   ├── useWallet.ts               # Wallet hook (Phase I)
│   ├── useContract.ts             # Contract hook (Phase I)
│   └── useBooks.ts                # Books hook (Phase II)
└── types/
    ├── wallet.ts                  # Wallet types
    ├── contract.ts                # Contract types
    └── book.ts                    # Book types
```

### Smart Contract Architecture (All Phases)

**Phase I Contract:**
```rust
// contracts/reading_tracker/src/lib.rs
pub fn complete_book(env: Env, reader: Address, book_title: String) -> Result<(), Error>
pub fn get_total_books(env: Env, reader: Address) -> u32
pub fn get_last_book(env: Env, reader: Address) -> String
pub fn get_global_count(env: Env) -> u32
```

**Phase II Contract Extensions:**
```rust
// contracts/badges_contract/src/lib.rs
pub fn mint_badge(env: Env, user: Address, badge_type: Symbol, metadata: String) -> Result<u64, Error>
pub fn get_user_badges(env: Env, user: Address) -> Vec<Badge>
pub fn verify_badge_ownership(env: Env, user: Address, badge_id: u64) -> bool

// contracts/token_contract/src/lib.rs
pub fn mint_read_tokens(env: Env, user: Address, amount: i128) -> Result<(), Error>
pub fn transfer_read_tokens(env: Env, from: Address, to: Address, amount: i128) -> Result<(), Error>
pub fn get_token_balance(env: Env, user: Address) -> i128
```

**Phase III Contract Extensions:**
```rust
// contracts/reading_contract/src/lib.rs
pub fn set_yearly_goal(env: Env, user: Address, goal: u32, year: u32) -> Result<(), Error>
pub fn get_goal_progress(env: Env, user: Address, year: u32) -> GoalProgress
pub fn record_completion(env: Env, user: Address, book_id: String, quiz_score: u32) -> Result<(), Error>
pub fn get_reading_stats(env: Env, user: Address) -> ReadingStats

pub struct Badge {
    pub id: u64,
    pub badge_type: Symbol,
    pub owner: Address,
    pub metadata: String,
    pub mint_date: u64,
}

pub struct ReadingStats {
    pub total_books: u32,
    pub yearly_books: u32,
    pub current_streak: u32,
    pub total_read_earned: i128,
}

pub struct GoalProgress {
    pub goal: u32,
    pub completed: u32,
    pub percentage: u32,
}
```

### Backend API (Complete)
```
Phase I:
/api/auth/connect          # Wallet connection

Phase II:
/api/books/list           # Get available books
/api/reading/start        # Start reading session
/api/reading/progress     # Update progress
/api/reading/complete     # Submit completion + quiz
/api/badges/mint          # Trigger badge minting
/api/tokens/balance       # Get READ token balance
/api/reviews/submit       # Submit book review

Phase III:
/api/goals/set            # Set yearly goal
/api/goals/progress       # Get goal progress
/api/leaderboard          # Get rankings
/api/clubs/create         # Create book club
/api/clubs/join           # Join book club
/api/challenges/list      # List active challenges
/api/challenges/join      # Join challenge
/api/social/friends       # Manage friends

Phase IV:
/api/payments/subscribe   # Premium subscription
/api/marketplace/list     # NFT marketplace
/api/authors/partner      # Author partnerships
```

---

## 📖 Key Documents Reference

### Primary Documents:
- **project_roadmap.md** - Complete project vision and all phase features
- **pdr_english.md** - Phase I specific requirements and strict constraints
- **FreighterWalletDocs.md** - Wallet integration specifications
- **StellarDeploy.md** - Contract deployment instructions

### Implementation Priority:
1. **Phase I:** Follow `pdr_english.md` strictly - minimal viable product
2. **Phase II:** Reference `project_roadmap.md` sections on badges and tokens
3. **Phase III:** Reference `project_roadmap.md` sections on goals and social
4. **Phase IV:** Reference `project_roadmap.md` sections on monetization

---

## 🔍 Testing Strategy (All Phases)

### Phase I Tests:
- [ ] Contract deployment test
- [ ] Wallet connection test
- [ ] Contract function call test
- [ ] Frontend integration test
- [ ] End-to-end user flow test

### Phase II Tests:
- [ ] Book library displays correctly
- [ ] Reading progress saves properly
- [ ] Quiz system validates answers
- [ ] Badge minting triggers on completion
- [ ] READ tokens credit correctly
- [ ] Review system stores reviews
- [ ] Database operations perform efficiently

### Phase III Tests:
- [ ] Yearly goals set and track correctly
- [ ] Leaderboards update in real-time
- [ ] Book clubs create and function
- [ ] Challenges track progress
- [ ] Social features work properly
- [ ] Badge collections filter correctly

### Phase IV Tests:
- [ ] Premium subscriptions process
- [ ] Payment integration works
- [ ] NFT marketplace functions
- [ ] Mobile app syncs properly
- [ ] Performance under load
- [ ] Security audit passed

---

## 📊 Example User Journey (Complete Flow)

### Phase I Journey:
```
Day 1:
1. User visits app → Connects Freighter wallet
2. Enters book title "1984"
3. Clicks "Complete Book"
4. Counter shows: "You've read 1 book(s)"
```

### Phase II Journey:
```
Week 1:
5. User browses library of 20 books
6. Selects "To Kill a Mockingbird"
7. Reads book with progress tracking
8. Completes book → Takes quiz (scores 4/5 = 80%)
9. Writes review (175 words)
10. Backend triggers smart contract
11. Receives:
    - "First Book Ever" badge (NFT minted on Stellar)
    - 200 READ tokens (100 base + 50 review + 50 quality bonus)
12. Badge appears in collection page
13. Token balance updates: 200 READ

Week 2:
14. Completes 5th book
15. Contract automatically mints "5 Books Milestone" badge
16. Total READ earned: ~1,000 tokens
```

### Phase III Journey:
```
January 1, 2025:
17. User sets yearly goal: "I want to read 24 books in 2025"
18. Dashboard shows: 0/24 books, quarterly goal: 6 books per quarter

March 31, 2025:
19. Completes 6th book this year
20. Contract mints "Bronze Reader 2025" badge
21. Progress: 6/24 books (Q1 goal: 6/6 ✓)
22. Receives "Quarter Champion Q1 2025" badge

June 15, 2025:
23. User joins "52 Books in 52 Weeks" challenge
24. Creates book club with 5 friends
25. Earns 150 READ (100 challenge + 50 club creation)

December 31, 2025:
26. Final count: 28 books (exceeded goal of 24)
27. Contract mints year-end badges:
    - "Gold Reader 2025" badge (26-50 books)
    - "Goal Crusher 2025" badge (met goal)
    - "Overachiever 2025" badge (exceeded by 16%)
    - "Consistent Reader 2025" badge (read every month)
28. Total READ earned in 2025: ~5,600 tokens
29. All badges stored on Stellar blockchain, visible in wallet

January 1, 2026:
30. Yearly count resets to 0 (contract logic)
31. Keeps all 2025 badges in collection (permanent NFTs)
32. Sets new goal for 2026: "30 books"
33. New challenge begins!
```

### Phase IV Journey:
```
February 2026:
34. User subscribes to Premium Pass (5,000 READ tokens)
35. Unlocks unlimited book access
36. Receives exclusive "Premium Member 2026" badge
37. Participates in author Q&A event
38. Earns "Author Connection" badge

June 2026:
39. User's "Gold Reader 2025" badge becomes tradable
40. Lists badge on NFT marketplace for 2,000 READ
41. Another user purchases it
42. Original user gets "Badge Trader" achievement
43. Uses proceeds to buy limited edition "Summer Reading 2026" badge
```

---

## 🎯 Phase Transition Checklist

### Before Moving from Phase I to Phase II:
- [ ] **Code Review:** All Phase I code reviewed and approved
- [ ] **Testing:** All Phase I tests passing (100% coverage)
- [ ] **Documentation:** Contract ID documented, deployment steps recorded
- [ ] **Performance:** Response times meet targets (<2s page load, <5s contract calls)
- [ ] **Security:** Basic security review completed
- [ ] **User Testing:** At least 5 users successfully complete full flow
- [ ] **Deployment:** Successfully running on Stellar Testnet for 48+ hours
- [ ] **Approval:** Explicit approval received to proceed to Phase II

### Before Moving from Phase II to Phase III:
- [ ] **Database:** All tables created, migrations tested
- [ ] **Book Library:** 20+ books uploaded and accessible
- [ ] **Badge System:** All 7 Phase II badges mintable and verifiable
- [ ] **Token System:** READ tokens mint and transfer correctly
- [ ] **Quiz System:** Quiz creation, submission, and scoring working
- [ ] **Review System:** Reviews submit and quality analysis functions
- [ ] **Performance:** Database queries <100ms, badge minting <10s
- [ ] **User Testing:** 20+ users complete books and earn badges
- [ ] **Approval:** Explicit approval received to proceed to Phase III

### Before Moving from Phase III to Phase IV:
- [ ] **Goals System:** Yearly goals set, tracked, and awarded correctly
- [ ] **Social Features:** Book clubs, friends, challenges all functional
- [ ] **Leaderboards:** All leaderboard types display accurately
- [ ] **Badge Variety:** All 15+ badge types mintable
- [ ] **Token Economy:** Full earning and spending system operational
- [ ] **Reading Limits:** 12-book annual limit enforced properly
- [ ] **Performance:** System handles 100+ concurrent users
- [ ] **User Testing:** 50+ active users engaging with all features
- [ ] **Approval:** Explicit approval received to proceed to Phase IV

---

## 📝 Development Notes & Best Practices

### Phase I Development:
1. **Start Simple:** Resist the urge to add extra features
2. **Test Early:** Don't wait until everything is built to test
3. **Log Everything:** Use console.log liberally for debugging
4. **Document as You Go:** Save Contract ID immediately after deployment
5. **Ask Questions:** If unsure about scope, ask before implementing

### Phase II Development:
1. **Database First:** Set up and test database before building features
2. **Incremental Features:** Build one badge type at a time
3. **Test Each Badge:** Verify each badge mints correctly before moving on
4. **Token Testing:** Test token minting in isolation before integration
5. **User Feedback:** Get feedback on quiz difficulty and book selection

### Phase III Development:
1. **Goal Logic First:** Ensure goal tracking math is correct
2. **Reset Logic:** Test yearly reset logic thoroughly before launch
3. **Social Features:** Start with friend system before clubs
4. **Leaderboard Performance:** Optimize queries for large user bases
5. **Community Building:** Launch with seeded challenges and clubs

### Phase IV Development:
1. **Payment Security:** Extra careful with payment integration
2. **Legal Review:** Terms of service, privacy policy, refund policy
3. **Scalability:** Load test before public launch
4. **Marketing:** Prepare launch campaign
5. **Mobile Sync:** Ensure flawless sync between web and mobile

---

## 🚨 Common Pitfalls to Avoid

### Phase I Pitfalls:
- ❌ **Adding Database Too Early:** Phase I doesn't need a database
- ❌ **Complex UI:** Keep UI minimal and functional
- ❌ **Over-engineering Contract:** 3-4 simple functions only
- ❌ **Skipping Tests:** Test each component as you build
- ❌ **Mainnet Deploy:** Stay on Testnet for Phase I

### Phase II Pitfalls:
- ❌ **Uploading Too Many Books:** Start with 10-15 books, not 100
- ❌ **Complex Badge Logic:** Keep badge criteria simple initially
- ❌ **Ignoring Performance:** Test database queries early
- ❌ **No Quiz Variety:** Ensure questions test actual reading
- ❌ **Token Inflation:** Monitor token earning rates closely

### Phase III Pitfalls:
- ❌ **Complicated Goal Math:** Keep goal calculations simple
- ❌ **Leaderboard Cheating:** Implement anti-gaming measures
- ❌ **Social Spam:** Add rate limits to social features
- ❌ **Reset Bugs:** Test yearly reset logic multiple times
- ❌ **Feature Creep:** Stick to planned Phase III features

### Phase IV Pitfalls:
- ❌ **Premature Monetization:** Don't monetize before user base exists
- ❌ **Payment Issues:** Test payment flow exhaustively
- ❌ **Poor Mobile UX:** Mobile should be as good as web
- ❌ **Marketplace Scams:** Implement fraud detection
- ❌ **Scaling Issues:** Load test before public launch

---

## 🔧 Quick Reference Commands

### Phase I Commands:
```bash
# Frontend
npx create-next-app@latest readstellar --typescript --tailwind --app
npm install @stellar/stellar-sdk
npm run dev

# Contract
soroban contract init reading_tracker
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm <path> --source <key> --network testnet
soroban contract invoke --id <CONTRACT_ID> --source <key> --network testnet -- complete_book --reader <ADDRESS> --book_title "1984"
```

### Phase II Commands:
```bash
# Database
npm install prisma @prisma/client
npx prisma init
npx prisma migrate dev --name init
npx prisma studio

# Additional Dependencies
npm install epub.js      # EPUB reader
npm install bullmq       # Job queue
npm install redis        # Caching
```

### Phase III Commands:
```bash
# Testing
npm run test
npm run test:e2e
npm run test:integration

# Deployment
vercel deploy
# Contract updates require rebuild and redeploy
```

---

## 📚 Learning Resources

### Stellar/Soroban Resources:
- **Soroban Docs:** https://soroban.stellar.org/docs
- **Stellar SDK:** https://github.com/stellar/js-stellar-sdk
- **Soroban Examples:** https://github.com/stellar/soroban-examples
- **Stellar Quest:** https://quest.stellar.org

### Frontend Resources:
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev

### Database Resources:
- **Prisma Docs:** https://www.prisma.io/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs

---

## 🎯 Success Metrics by Phase

### Phase I Metrics:
- ✅ Contract deploys successfully (100% success rate)
- ✅ Wallet connects in <3 seconds
- ✅ Contract call completes in <5 seconds
- ✅ Zero critical bugs in testing
- ✅ All 5 test scenarios pass

### Phase II Metrics:
- ✅ 20+ books in library
- ✅ Badge minting success rate >95%
- ✅ Quiz completion rate >70%
- ✅ Token distribution accurate (100%)
- ✅ Page load time <3 seconds
- ✅ 50+ test users complete at least 1 book

### Phase III Metrics:
- ✅ Goal completion rate >60%
- ✅ 10+ active book clubs
- ✅ 100+ users set yearly goals
- ✅ Leaderboard updates in real-time (<1s delay)
- ✅ Social engagement rate >40%
- ✅ Token economy balanced (no inflation)

### Phase IV Metrics:
- ✅ Premium conversion rate >5%
- ✅ Payment success rate >98%
- ✅ Mobile app downloads 1,000+
- ✅ NFT marketplace trades 100+
- ✅ Revenue positive within 3 months
- ✅ User retention rate >50% (30 days)

---

## 🔐 Security Checklist (All Phases)

### Phase I Security:
- [ ] Wallet connection uses official Freighter API
- [ ] No private keys stored anywhere
- [ ] Contract functions have proper access controls
- [ ] XSS protection enabled (React default)
- [ ] Basic rate limiting on API routes

### Phase II Security:
- [ ] SQL injection prevention (Prisma ORM)
- [ ] Input validation on all forms
- [ ] File upload restrictions (EPUB only)
- [ ] Quiz answers encrypted in transit
- [ ] Badge metadata validated before minting

### Phase III Security:
- [ ] Goal manipulation prevented
- [ ] Leaderboard gaming detected and blocked
- [ ] Social spam filters active
- [ ] Token transfer authorization verified
- [ ] Book club privacy settings enforced

### Phase IV Security:
- [ ] Payment data PCI compliant
- [ ] NFT marketplace fraud detection
- [ ] API rate limiting (100 req/min)
- [ ] DDoS protection active
- [ ] Regular security audits scheduled
- [ ] Bug bounty program launched

---

## 📞 Support & Escalation

### Development Issues:
1. **Check Documentation:** Review relevant phase documentation
2. **Search GitHub Issues:** Look for similar problems
3. **Test in Isolation:** Isolate the problematic component
4. **Ask Community:** Stellar Discord, Stack Overflow
5. **Create Issue:** Document and create GitHub issue if needed

### Deployment Issues:
1. **Check Testnet Status:** https://status.stellar.org
2. **Verify Configuration:** Double-check network settings
3. **Review Logs:** Check Soroban RPC logs
4. **Test Locally:** Use soroban-cli local testing
5. **Seek Help:** Stellar Developer Discord

### Phase Gate Issues:
1. **Review Checklist:** Ensure all items completed
2. **Run Full Test Suite:** Verify all tests passing
3. **User Testing:** Get feedback from test users
4. **Performance Check:** Verify metrics met
5. **Request Approval:** Submit phase completion report

---

## 📊 Timeline Summary

| Phase | Duration | Key Deliverables | Status |
|-------|----------|------------------|--------|
| Phase I | 2.5 hours | Basic frontend + minimal contract | 🚧 Current |
| Phase II | 3-4 weeks | Books, badges, tokens, quiz | 📋 Planned |
| Phase III | 3-4 weeks | Goals, social, leaderboards | 📋 Future |
| Phase IV | 3-4 weeks | Monetization, mobile, marketplace | 📋 Future |

**Total Estimated Time:** 10-13 weeks from start to full platform launch

---

## 🎉 Phase I Completion Definition

**Phase I is considered COMPLETE when:**

1. ✅ User can connect Freighter wallet from landing page
2. ✅ User redirects to `/main` after successful connection
3. ✅ User can enter a book title
4. ✅ User can click "Complete Book"
5. ✅ Transaction signs via Freighter
6. ✅ Contract records completion on Stellar Testnet
7. ✅ Counter displays: "You've read X book(s)"
8. ✅ Last book title displays correctly
9. ✅ User can disconnect wallet
10. ✅ All operations work reliably without errors
11. ✅ Contract ID documented in `contract-config.ts`
12. ✅ Code committed to Git with proper documentation
13. ✅ All Phase I tests passing
14. ✅ Running on Stellar Testnet for 24+ hours without issues
15. ✅ **Explicit approval received to proceed to Phase II**

**DO NOT proceed to Phase II without completing ALL items above.**

---

## 🚀 Ready to Begin

**Current Phase:** Phase I  
**Current Task:** Frontend Setup  
**Next Step:** Run `npx create-next-app@latest readstellar --typescript --tailwind --app`

**Remember:**
- Keep it simple
- Test everything
- Document as you go
- Ask before expanding scope
- Have fun building! 🎉

---

**Memory Bank Version:** 2.0  
**Last Updated:** Phase I-IV Complete Documentation  
**Status:** Ready for Development - Phase I Focus

---

*This memory bank will be updated as each phase completes. Always refer to the current phase section for active development guidance.*