# Stellar-Based Book Reading Application - Project Plan (v3)

## 📚 Project Concept: "ReadChain" or "BookBadge"

### Core Features

#### 1. Badge System (as NFTs)

**Badge Categories:**

**A. Milestone Badges (Permanent - Never Reset)**
- "First Book Ever" - Complete your first book
- "10 Books Milestone" - Lifetime achievement
- "50 Books Milestone" - Lifetime achievement
- "100 Books Milestone" - Lifetime achievement
- "Centurion Reader" (200 books) - Lifetime achievement

**B. Yearly Achievement Badges (Reset Every January 1st)**
- "Bronze Reader 2025" - Read 1-10 books this year
- "Silver Reader 2025" - Read 11-25 books this year
- "Gold Reader 2025" - Read 26-50 books this year
- "Diamond Reader 2025" - Read 51+ books this year
- Year-specific badges create collectible series

**C. Yearly Goal Badges (User Sets Personal Goals)**
- "Goal Crusher 2025" - Achieved personal yearly reading goal
- "Overachiever 2025" - Exceeded goal by 50%+
- "Consistent Reader 2025" - Read at least 1 book per month (12/12 months)
- "Quarter Champion Q1 2025" - Met quarterly sub-goals

**D. Genre & Author Badges (Cumulative - Never Reset)**
- "Sci-Fi Enthusiast" - Read 5 sci-fi books (lifetime)
- "Mystery Detective" - Read 10 mystery books (lifetime)
- "Classics Scholar" - Read 5 classic literature books (lifetime)
- "[Author Name] Fan" - Read 3+ books by same author (lifetime)

**E. Speed & Streak Badges (Time-based)**
- "Speed Reader" - Finish a book in under 7 days
- "Marathon Reader" - Read 5 books in 30 days
- "Weekly Warrior" - 4 week reading streak (at least 1 book/week)
- "Monthly Habit" - 3 month reading streak
- "1 Book Per Week" - Consistent weekly reading pace

**F. Review Quality Badges (Cumulative)**
- "Critical Thinker" - Write 5 analytical reviews with sharp insights (NFT reward)
- "Curious Reader" - Write 3 reviews exploring deeper questions or unexpected insights (NFT reward)
- "Logical Reviewer" - Write 5 well-structured argumentative reviews (NFT reward)
- "Grounded Justification" - Write 3 evidence-based reviews with thorough justification (NFT reward)
- "Balanced Critic" - Write 5 reviews with both positive and negative analysis (NFT reward)
- "Constructive Contributor" - Write 10 thoughtful reviews demonstrating effective questioning and reasoning skills (NFT reward)
- "Review Master" - Write 50 reviews total

#### 2. Reading Proof Mechanism

**Page Progress Tracking:**
- Start time recorded
- Page updates tracking (every 10 pages or 10 minutes)
- Finish time recorded
- Minimum reading time required (based on book length)
  * Example: 300-page book requires at least 3 hours total reading time
  * Prevents instant "completion" fraud

**Quiz/Test System:**
- Short questions after finishing a book
- 5 questions per book (multiple choice)
- Questions cover: plot, characters, themes, key events
- Must score 60%+ to pass (3/5 correct)
- 3 attempts allowed (24-hour cooldown between attempts)
- Failed attempts still count toward "effort" metrics

**Optional Review Writing (Enhanced Rewards):**
- Optional but badge rewarded
- Minimum 100 words
- AI analysis for quality (using sentiment + structure analysis)
- Quality reviews unlock additional badge opportunities
- Review rewards:
  * Basic review = +25 READ bonus
  * Quality review = +50 READ bonus + eligible for review badges

#### 3. Token Economy

**READ Token:** Platform token earned through reading

**Earning READ Tokens:**
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
- Purchasing special badge collections = 1,000 READ
- Limited edition badge = 1,000 READ
- Seasonal special badge = 750 READ
- Author collaboration badge = 1,500 READ

Social Features:
- Gifting book to friend = 500 READ
- Create private book club = 100 READ
- Host reading challenge = 200 READ
- Spending for book recommendations = 100 READ

Profile & Customization:
- Custom profile theme = 250 READ
- Animated badge display = 500 READ
- Profile spotlight (1 week) = 300 READ
```

#### 4. Yearly Reading Limitation System

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
- Option B: Premium Pass (5000 READ tokens/year) = Unlimited books
- Option C: Monthly Pass (500 READ tokens/month) = Unlimited books that month
```

**Benefits:**
- ✅ Prevents users from gaming daily reading rewards
- ✅ Creates value for READ tokens
- ✅ Makes yearly goals meaningful
- ✅ Reduces server/bandwidth costs for MVP
- ✅ Users are more intentional about book selection

### Stellar Integration with Soroban Smart Contracts

#### 1. Smart Contract Architecture (Rust + Soroban SDK)

**Core Contract Functions:**
```rust
// Badge Management
pub fn mint_badge(env: Env, user: Address, badge_type: Symbol, metadata: String) -> Result<u64, Error>
pub fn get_user_badges(env: Env, user: Address) -> Vec<Badge>
pub fn verify_badge_ownership(env: Env, user: Address, badge_id: u64) -> bool

// Token Operations
pub fn mint_read_tokens(env: Env, user: Address, amount: i128) -> Result<(), Error>
pub fn transfer_read_tokens(env: Env, from: Address, to: Address, amount: i128) -> Result<(), Error>
pub fn get_token_balance(env: Env, user: Address) -> i128

// Reading Progress
pub fn record_completion(env: Env, user: Address, book_id: String, quiz_score: u32) -> Result<(), Error>
pub fn get_reading_stats(env: Env, user: Address) -> ReadingStats

// Goal Tracking
pub fn set_yearly_goal(env: Env, user: Address, goal: u32, year: u32) -> Result<(), Error>
pub fn get_goal_progress(env: Env, user: Address, year: u32) -> GoalProgress
```

**Contract Data Structures:**
```rust
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

#### 2. Asset Structure
```
READ Token:
- Asset Code: "READ"
- Type: Soroban Token (SAC - Stellar Asset Contract)
- Issuer: Platform contract account
- Initial Supply: 100,000,000 READ

READBADGE NFTs:
- Managed via Soroban contract
- Each badge is a unique entry in contract storage
- Metadata stored on-chain or IPFS hash reference
- Badge ID: Sequential counter
```

#### 3. Transaction Memo Standards
```json
{
  "type": "badge_mint",
  "badge_id": "MILESTONE_FIRST_BOOK",
  "user_id": "user_12345",
  "book_id": "book_789",
  "date": "2025-03-15",
  "metadata_ipfs": "QmX..."
}
```

### Yearly Goal System

#### How It Works:

**1. Goal Setting (January or Account Creation):**
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

**2. Goal Tracking Dashboard:**
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

**3. Goal Achievement Rewards:**
```
100% Goal = "Goal Crusher 2025" badge + 500 READ
110-149% = "Overachiever 2025" badge + 750 READ
150%+ = "Reading Legend 2025" badge + 1,000 READ
<100% but >75% = "Solid Effort 2025" badge + 250 READ

Monthly Consistency Bonus:
- Met monthly targets 12/12 months = "Consistent Reader" badge + 500 READ
```

**4. Goal Challenges (Community):**
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

## Application Architecture

### Tech Stack

#### **Frontend:**
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State Management:** React Context API / Zustand
- **Wallet Integration:** Freighter API (connect/sign only)
- **Key Pages:**
  * `/` - Home/Landing page
  * `/library` - Book library view & discovery
  * `/read/[bookId]` - E-book reader with progress tracker
  * `/badges` - Badge collection page (filterable by type/year)
  * `/goals` - Yearly goal dashboard with charts
  * `/leaderboard` - Ranking table (yearly, all-time, friends)
  * `/profile` - User profile with stats & achievements
  * `/clubs` - Book club & social features

#### **Smart Contract:**
- **Language:** Rust
- **SDK:** Soroban SDK
- **Functions:** Badge minting, token operations, reading verification
- **Network:** Stellar Testnet
- **Contract Types:**
  * `badges_contract` - Badge NFT management
  * `token_contract` - READ token operations
  * `reading_contract` - Progress tracking & verification

#### **Backend API:**
- **Runtime:** Node.js / Bun
- **Framework:** Next.js API Routes or separate Express/Fastify server
- **Database:** PostgreSQL with Prisma ORM
- **Tables:**
  * `users` - User accounts & wallet addresses
  * `books` - Book catalog & metadata
  * `reading_progress` - Active reading sessions
  * `completions` - Finished books & quiz results
  * `badges_earned` - Badge acquisition history
  * `reviews` - User reviews & ratings
  * `goals` - Yearly goal tracking
  * `book_clubs` - Community groups
- **File Storage:** S3 / Cloudflare R2 for book files (EPUB)
- **Caching:** Redis for session & frequently accessed data
- **Queue System:** BullMQ for async operations (badge minting, email notifications)

#### **Blockchain Layer:**
- **Network:** Stellar Testnet (transition to Mainnet later)
- **RPC:** Soroban RPC endpoint
- **SDK:** stellar-sdk (JavaScript) for frontend
- **Contract Deployment:** soroban-cli
- **Accounts:**
  * Contract deployer account
  * Platform admin account
  * User custodial accounts (optional) or user-owned wallets

#### **Development Tools:**
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Testing:** Jest, React Testing Library, Playwright
- **Linting:** ESLint, Prettier
- **Contract Testing:** Rust cargo test

## Feature Suggestions

#### Gamification:

**1. Level System (Yearly)**
   - Bronze Reader (1-10 books)
   - Silver Reader (11-25 books)
   - Gold Reader (26-50 books)
   - Diamond Reader (51+ books)

**2. Challenges**
   - "5 Books in 30 Days"
   - "Classics Marathon"
   - Genre-based challenges
   - "Around the World" (books from 10 countries)
   - "Author Deep Dive" (5 books by one author)

**3. Social Features**
   - Compete with friends
   - Create book clubs (private/public)
   - Badge showcase (display)
   - Share reading statistics
   - Gift books with READ tokens
   - Challenge friends to reading duels
   - Recommend books
   - Book club discussion forums
   - Club-exclusive challenges

**4. Community Events:**
   - "Global Reading Day" (everyone reads same book)
   - "Genre Week" (mystery week, sci-fi week, etc.)
   - "Speed Reading Competition"
   - Seasonal challenges (Summer Reading Challenge)

**5. Leaderboards:**
   - "2025 Diamond Readers" (top readers this year)
   - "All-Time Legends" (lifetime book count)
   - "Friends Circle" (compete with friends)
   - "Book Club Rankings" (club vs club)
   - Reset Schedule: Yearly resets January 1st, Lifetime stats never reset

#### Monetization:

1. Commission from book sales (20-30%)
2. Premium membership (with monthly READ tokens)
3. Special/Limited edition badge sales
4. Sponsored badges for authors
5. Advertising (optional)
6. Featured book placements (publishers pay to feature)
7. Exclusive early releases on platform

**Freemium Model:**
```
Free Tier:
- 12 books/year
- Basic badges
- Standard features
- READ token earning

Premium Pass (5,000 READ/year or $49.99/year):
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

## Technical Requirements & Development Phases

### Phase 1: Soroban Smart Contract Development (Week 1-2)

**Setup:**
1. Install Rust and Soroban CLI
2. Initialize contract project: `soroban contract init`
3. Set up Stellar Testnet configuration

**Contract Development:**
```bash
# Project structure
/contracts
  /badges
    - lib.rs (main badge contract)
    - test.rs (unit tests)
  /token
    - lib.rs (READ token contract)
    - test.rs
  /reading
    - lib.rs (reading verification contract)
    - test.rs
```

**Deploy to Testnet:**
```bash
soroban contract build
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/badges.wasm \
  --source ADMIN_SECRET_KEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

**Contract Testing:**
- Write Rust unit tests
- Test all contract functions
- Verify state changes
- Test error handling

### Phase 2: Frontend Foundation (Week 3-4)

**Next.js Setup:**
```bash
npx create-next-app@latest readchain --typescript --tailwind --app
cd readchain
npm install @stellar/stellar-sdk @creit.tech/stellar-wallets-kit
```

**Freighter Wallet Integration:**
```typescript
// lib/wallet.ts
import { isConnected, getPublicKey, signTransaction } from "@stellar/freighter-api";

export async function connectWallet() {
  if (await isConnected()) {
    const publicKey = await getPublicKey();
    return publicKey;
  }
  throw new Error("Freighter not installed");
}

export async function signTx(xdr: string) {
  const signedTx = await signTransaction(xdr, {
    network: "TESTNET",
    networkPassphrase: "Test SDF Network ; September 2015"
  });
  return signedTx;
}
```

**Contract Interaction Layer:**
```typescript
// lib/soroban.ts
import * as SorobanClient from "@stellar/stellar-sdk/lib/soroban";

export async function callContract(
  contractId: string,
  method: string,
  args: any[]
) {
  const contract = new SorobanClient.Contract(contractId);
  const operation = contract.call(method, ...args);
  
  // Build and submit transaction
  // Return result
}
```

### Phase 3: Backend API & Database (Week 5-6)

**Database Schema (Prisma):**
```prisma
// prisma/schema.prisma
model User {
  id            String   @id @default(cuid())
  walletAddress String   @unique
  username      String?
  email         String?  @unique
  createdAt     DateTime @default(now())
  
  completions   BookCompletion[]
  badges        BadgeOwnership[]
  goals         YearlyGoal[]
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

**API Routes:**
```
/api/auth/connect - Wallet connection
/api/books/list - Get available books
/api/reading/start - Start reading session
/api/reading/progress - Update progress
/api/reading/complete - Submit completion + quiz
/api/badges/mint - Trigger badge minting
/api/goals/set - Set yearly goal
/api/leaderboard - Get rankings
```

### Phase 4: Integration & Testing (Week 7-8)

**Integration Flow:**
1. User connects Freighter wallet → Frontend calls `/api/auth/connect`
2. User starts reading → Progress tracked in database
3. User completes book + quiz → Backend verifies
4. Backend calls smart contract → Badge minted on-chain
5. Frontend updates UI → Shows new badge

**End-to-End Test:**
```typescript
// e2e/reading-flow.spec.ts
test("complete book and earn badge", async ({ page }) => {
  await page.goto("/");
  await page.click("button:has-text('Connect Wallet')");
  // ... simulate Freighter connection
  
  await page.goto("/library");
  await page.click("text=1984");
  await page.click("text=Start Reading");
  
  // Simulate reading progress
  await page.click("text=Mark as Complete");
  
  // Take quiz
  await page.click("text=Answer A");
  // ...
  
  await expect(page.locator("text=First Book Ever")).toBeVisible();
});
```

### Phase 5: MVP Polish & Launch (Week 9-10)

**Features to Complete:**
- [ ] Responsive design (mobile-first)
- [ ] Loading states & error handling
- [ ] Book reader with page tracking
- [ ] Quiz interface
- [ ] Badge gallery with filters
- [ ] Leaderboard with yearly reset
- [ ] Goal setting dashboard
- [ ] Profile page with stats

**Security Checklist:**
- [ ] Input validation on all API routes
- [ ] Rate limiting (10 req/min per IP)
- [ ] Wallet signature verification
- [ ] Contract authorization checks
- [ ] SQL injection prevention (via Prisma)
- [ ] XSS protection (React automatic escaping)

## 🧪 Test Scenarios

### Critical Tests:

#### ✅ Contract Deployment
```bash
# Test: Can the contract be deployed?
soroban contract deploy --wasm badges.wasm --source ADMIN_KEY --network testnet
# Expected: Contract ID returned
```

#### ✅ Wallet Connection
```typescript
// Test: Does wallet connection work?
test("connect Freighter wallet", async () => {
  const publicKey = await connectWallet();
  expect(publicKey).toMatch(/^G[A-Z0-9]{55}$/);
});
```

#### ✅ Contract Function Calls
```typescript
// Test: Can contract functions be called?
test("mint badge via contract", async () => {
  const result = await callContract(
    BADGES_CONTRACT_ID,
    "mint_badge",
    [userAddress, "FIRST_BOOK", "ipfs://Qm..."]
  );
  expect(result).toBeDefined();
});
```

#### ✅ Frontend-Contract Integration
```typescript
// Test: Does the result return to the frontend?
test("badge appears in user collection", async () => {
  await mintBadge(userAddress, "FIRST_BOOK");
  const badges = await getUserBadges(userAddress);
  expect(badges).toContainEqual(
    expect.objectContaining({ badgeType: "FIRST_BOOK" })
  );
});
```

#### ✅ Full Frontend Flow
```typescript
// Test: Does the frontend work properly?
test("complete reading flow", async ({ page }) => {
  await page.goto("/library");
  await page.click("text=Start Reading");
  await page.fill("input[name='currentPage']", "300");
  await page.click("text=Complete Book");
  await page.click("text=Submit Quiz");
  
  await expect(page.locator(".badge-card")).toBeVisible();
  await expect(page.locator("text=+100 READ")).toBeVisible();
});
```

### Performance Tests:
- [ ] Page load time < 2s
- [ ] Contract call response < 5s
- [ ] Database queries < 100ms
- [ ] Book reader renders 500+ pages smoothly

### Browser Compatibility:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android)

## Simplified MVP (Minimum Viable Product)

**For the start:**

**Books:**
- Add 10-20 free books (public domain classics)
- Simple EPUB reader with page tracking
- Basic progress persistence

**Badge Types (15 total):**

*Milestone (5):*
- First Book
- 5 Books
- 10 Books
- 20 Books
- 50 Books

*Yearly Level (3):*
- Bronze Reader 2025
- Silver Reader 2025
- Gold Reader 2025

*Yearly Goal (2):*
- Goal Crusher 2025
- Overachiever 2025

*Review Quality (3):*
- Critical Thinker
- Balanced Critic
- Review Master (10 reviews)

*Speed/Streak (2):*
- Speed Reader (finish in < 7 days)
- Weekly Warrior (4-week streak)

**Core Features:**
- User registration with Freighter wallet
- Read books with progress tracking
- Simple quiz system (5 questions per book)
- Optional review writing
- Badge earning & minting via Soroban
- Badge collection page with filters
- Basic leaderboard (yearly & all-time)
- Yearly goal setting
- READ token earning & balance display
- Simple profile with stats

**Yearly Limitation:**
- Free: 12 books/year
- Premium: Unlock via READ tokens (500/book or 5,000/year unlimited)

## Example Usage Flow

**New User - First Year:**

```
January 2025:
1. User visits app → Connects Freighter wallet
2. Account created → Wallet address stored in database
3. Sets yearly goal: "I want to read 24 books in 2025"
4. Selects first book: "1984" by George Orwell
5. Clicks "Start Reading" → Progress tracking begins

January 15, 2025:
6. Marks book complete → Takes 5-question quiz → Scores 4/5 (80%)
7. Writes a review (150 words, thoughtful)
8. Backend calls smart contract → `mint_badge()` function
9. Receives:
   - "First Book Ever" badge (NFT minted on Stellar Testnet)
   - 200 READ tokens (100 base + 50 review + 50 quality bonus)
10. Badge appears in collection page
11. Progress: 1/24 books toward yearly goal

March 31, 2025:
12. Completes 6th book this year
13. Contract automatically mints "Bronze Reader 2025" badge
14. Progress: 6/24 books (Q1 goal: 6/6 ✓)
15. Receives "Quarter Champion Q1 2025" badge

July 2025:
16. Completes 15th book
17. Hits 12-book free limit
18. Options:
    - Wait until next year
    - Spend 500 READ for 1 more book
    - Spend 5,000 READ for unlimited (has earned ~3,000 READ so far)
19. Decides to earn 2,000 more READ through reviews & referrals
20. Unlocks unlimited pass by calling contract function

December 31, 2025:
21. Final count: 28 books (exceeded goal of 24)
22. Contract mints year-end badges:
    - "Gold Reader 2025" badge (26-50 books)
    - "Goal Crusher 2025" badge (met goal)
    - "Overachiever 2025" badge (exceeded by 16%)
    - "Consistent Reader 2025" badge (read every month)
23. Total READ earned: ~5,600 tokens
24. Can use tokens for 2026 premium pass or special badges
25. All badges stored on Stellar blockchain, visible in wallet

January 1, 2026:
26. Yearly count resets to 0 (contract logic)
27. Keeps all 2025 badges in collection (permanent NFTs)
28. Sets new goal for 2026: "30 books"
29. New challenge begins!
```

## Development Commands

```bash
# Contract commands
soroban contract build
soroban contract test
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/[contract].wasm

# Frontend commands
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run test         # Run Jest tests
npm run test:e2e     # Run Playwright tests

# Database commands
npx prisma migrate dev    # Apply migrations
npx prisma studio         # Open database GUI
npx prisma generate       # Generate Prisma Client

# Deployment
vercel deploy        # Deploy frontend to Vercel
# Contract deployment handled via soroban CLI
```

## Resources

- **Soroban Docs:** https://soroban.stellar.org/docs
- **Stellar SDK:** https://github.com/stellar/js-stellar-sdk
- **Freighter Wallet:** https://www.freighter.app/
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Summary

This updated roadmap reflects the modern tech stack with **Next.js + TypeScript + Tailwind** for frontend, **Rust + Soroban** for smart contracts, and **Freighter API** for wallet connectivity. The architecture is designed for Stellar Testnet with clear testing scenarios to validate contract deployment, wallet integration, and end-to-end functionality.
