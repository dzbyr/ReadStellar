# Stellar-Based Book Reading Application - Project Plan (v2)

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
### Stellar Integration (Revised)

#### 1. NFT Badge System (Simplified)
```
Asset Structure:
- Main badge asset: "READBADGE" (single trustline for all badges)
- Badge differentiation via metadata in memo field
- Each badge mint includes:
  * Badge ID (unique)
  * Badge type/category
  * Year (if applicable)
  * Achievement date
  * Book reference (if applicable)

Technical Implementation:
- Asset Code: "READBADGE" (under 12 chars ✓)
- Issuer Account: Platform master account
- Distribution: Automated distribution account
- Metadata: Book information, completion date stored in IPFS
- IPFS hash in transaction memo
- Amount: 0.0000001 READBADGE per badge (effectively indivisible)
```

#### 2. READ Token
```
Asset Code: "READ"
Issuer: Platform token account
Platform native token
Initial Supply: 100,000,000 READ
Distribution:
- 40% User rewards pool
- 30% Development & operations
- 20% Marketing & partnerships
- 10% Team (2-year vesting)
```

#### 3. Smart Features

**Automatic Badge Distribution (Not Claimable):**
- When user earns badge, platform automatically sends
- Platform pays transaction fees
- Better UX, no friction
- User only needs ONE trustline to READBADGE asset

**Multi-sig Security:**
- Multi-signature system for platform administrators
- 2-of-3 multisig for issuer accounts
- Prevents single point of failure
- Secure badge minting

**Transaction Memo Standards:**
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

### Yearly Goal System (New Feature)

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

#### Frontend:
- Mobile application (React Native) for iOS + Android
- Web application (React + TypeScript)
- **Key Screens:**
  * Book library view & discovery
  * E-book reader (reading screen) with progress tracker
  * Badge collection page (filterable by type/year)
  * Yearly goal dashboard with charts
  * Leaderboard (ranking table: yearly, all-time, friends)
  * User profile with stats & achievements
  * Book club & social features

#### Backend:
- **API:** Node.js + Express or Python + FastAPI
- **Book database**
- **User reading data**
- **Quiz/Test system**
- **Stellar API integration (Horizon API)**
- **Database:** PostgreSQL
  * Users table
  * Books table
  * Reading_progress table
  * Badges_earned table
  * Reviews table
  * Goals table (yearly goals tracking)
- **File Storage:** S3 or similar for book files
- **Metadata Storage:** IPFS for badge metadata
- **Queue System:** Bull/BullMQ for async badge minting

#### Blockchain Layer:
- **Network:** Stellar Testnet
- **Stellar account management**
- **Badge minting & distribution system**
- **Token transfer operations**
- **Transaction history**
- **Accounts:**
  * Master issuer (multi-sig)
  * Distribution account (auto-sends badges)
  * User accounts (one per user)
- **Integration:** Stellar SDK + Horizon API

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

## Technical Requirements

#### Stellar SDK Usage:
- JavaScript: stellar-sdk
- Python: stellar-sdk (for backend)
- REST API: Horizon API
```javascript
// Frontend (JavaScript)
import StellarSdk from 'stellar-sdk';

// Backend (Python)
from stellar_sdk import Server, Keypair, TransactionBuilder, Network

// API Interaction
Horizon API: https://horizon.stellar.org (mainnet)
```

#### Minimum Development Steps:

**Phase 1: Stellar Foundation (Week 1-2)**
1. Start with Stellar Test Network
2. Create test accounts
3. Define and test READBADGE asset
4. Create and test READ token
5. Test token economy
6. Implement basic wallet creation for users
7. Test badge minting & distribution

**Phase 2: Core Backend (Week 3-4)**
1. Set up database schema
2. Build user authentication
3. Implement book management system
4. Create reading progress tracker (page/chapter tracking)
5. Build quiz/test system
6. Version control

**Phase 3: Blockchain Integration (Week 5-6)**
1. Wallet generation for new users
2. Trustline creation automation
3. Badge minting pipeline
4. Asset issuer account setup
5. Distribution account setup
6. Automatic badge sending
7. READ token distribution system
8. Transaction history tracking

**Phase 4: Frontend MVP (Week 7-9)**
1. User registration & login
2. Book library & EPUB reader
3. Progress tracking UI
4. Quiz interface
5. Badge collection display
6. Basic profile & stats

**Phase 5: Gamification (Week 10-11)**
1. Yearly goal setting system
2. Leaderboards implementation
3. Challenge system
4. Badge variety expansion
5. Social features

**Phase 6: Testing & Launch (Week 12)**
1. End-to-end testing
2. Security audit
3. Beta user testing
4. Mainnet deployment
5. Launch

### Wallet Integration Options:
- Freighter Wallet connection
- Albedo Wallet support
- Or your own custodial wallet

## Simplified MVP (Minimum Viable Product)

**For the start:**

**Books:**
- Add 10-20 free books (public domain classics)
- Simple EPUB reader
- Basic progress tracking

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
- Speed Reader (Bookworm)
- Weekly Warrior

**Core Features:**
- User registration with Stellar wallet
- Read books with progress tracking
- Simple quiz system (3-5 questions)
- Optional review writing
- Badge earning & collection
- Badge collection page
- Basic leaderboard (yearly & all-time)
- Yearly goal setting
- READ token earning
- Simple profile with stats

**Yearly Limitation:**
- Free: 12 books/year
- Premium: Unlock via READ tokens

## Example Usage Flow

**New User - First Year:**
```
January 2025:
1. User registers → Stellar wallet is created automatically
2. Sets yearly goal: "I want to read 24 books in 2025"
3. Trustline to READBADGE created (one-time, automatic)
4. Selects first book: "1984" by George Orwell
5. Starts reading → Progress tracked

January 15, 2025:
6. Finishes "1984" (finishes the book) → Solves the quiz (takes quiz) → Scores 4/5 (80%)
7. Writes a review (150 words, thoughtful)
8. If successful, receives:
   - "First Book Ever" badge (Badge NFT is automatically sent)
   - 200 READ tokens (100 base + 50 review + 50 quality bonus)
   - Earns READ tokens → Views in their collection
   - Progress: 1/24 books toward yearly goal

March 31, 2025:
9. Completes 6th book this year
10. Receives "Bronze Reader 2025" badge
11. Progress: 6/24 books (Q1 goal: 6/6 ✓)
12. Receives "Quarter Champion Q1 2025" badge

July 2025:
13. Completes 15th book
14. Hits 12-book free limit
15. Options:
    - Wait until next year
    - Spend 500 READ for 1 more book
    - Spend 5,000 READ for unlimited (has earned ~3,000 READ so far)
16. Decides to earn 2,000 more READ through reviews & referrals
17. Unlocks unlimited pass

December 31, 2025:
18. Final count: 28 books (exceeded goal of 24)
19. Receives:
    - "Gold Reader 2025" badge (26-50 books)
    - "Goal Crusher 2025" badge (met goal)
    - "Overachiever 2025" badge (exceeded by 16%)
    - "Consistent Reader 2025" badge (read every month)
20. Total READ earned: ~5,600
21. Accesses new books with tokens
22. Can use tokens for 2026 premium pass or save for special badges

January 1, 2026:
23. Yearly count resets to 0
24. Keeps all 2025 badges in collection
25. Sets new goal for 2026: "30 books"
26. New challenge begins!
```


## Application Architecture

#### **Frontend:**
- Mobile application (React Native) or Web (React)
- Book library view
- Reading screen (e-book reader)
- Badge collection page
- Leaderboard (ranking table)
- User profile and statistics

#### **Backend:**
- Book database
- User reading data
- Quiz/Test system
- Stellar API integration (Horizon API)

#### **Blockchain Layer:**
- Stellar account management
- Badge minting system
- Token transfer operations
- Transaction history

## Feature Suggestions

#### **Gamification:**

1. **Level System (yearly)**
   - Bronze Reader (1-10 books)
   - Silver Reader (11-25 books)
   - Gold Reader (26-50 books)
   - Diamond Reader (51+ books)

2. **Challenges**
   - "5 Books in 30 Days"
   - "Classics Marathon"
   - Genre-based challenges

3. **Social Features**
   - Compete with friends
   - Create book clubs
   - Badge showcase
   - Share reading statistics

###### **Monetization:**
1. Commission from book sales
2. Premium membership (with monthly READ tokens)
3. Special/Limited edition badge sales
4. Sponsored badges for authors
5. Advertising (optional)

### Technical Requirements

#### **Stellar SDK Usage:**
- JavaScript: stellar-sdk
- Python: stellar-sdk (for backend)
- REST API: Horizon API

#### **Minimum Development Steps:**

1. **Start with Stellar Test Network**
   - Create test accounts
   - Define badge asset
   - Test token economy

2. **Badge Minting System**
   - Asset issuer account
   - Distribution account
   - Automatic badge sending

3. **Wallet Integration**
   - Freighter Wallet connection
   - Albedo Wallet support
   - Or your own custodial wallet

4. **Reading Tracking System**
   - Page/chapter tracking
   - Version control
   - Quiz system

## Simplified MVP (Minimum Viable Product)

**For the start:**

1. Add 10-20 free books
2. 5 basic badge types:
   - First Book
   - 5 Books
   - 10 Books
   - 20 Books
   - 50 Books
   - 100 Books
   - 200 Books
   - Speed Reader
   - Bookworm

3. Simple quiz system (3-5 questions)
4. READ token earning
5. Badge collection page
6. Simple leaderboard

## Example Usage Flow

1. User registers → Stellar wallet is created
2. Selects a book → Starts reading
3. Finishes the book → Solves the quiz
4. If successful → Badge NFT is automatically sent
5. Earns READ tokens → Views in their collection
6. Accesses new books with tokens
