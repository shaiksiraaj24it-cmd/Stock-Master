# StockMaster - Learning & Virtual Stock Trading Platform

StockMaster is an interactive educational and virtual stock trading platform designed to bridge the gap between stock market theory and practical investment experience. The application combines structured interactive learning modules with a real-time virtual trading simulator and portfolio tracking engine.

---

## 1. Architecture Overview & Tech Stack

### System Architecture
StockMaster follows a modern full-stack web application architecture:

```
+-------------------------------------------------------------+
|                      Client (Browser)                       |
|  React 19 + Vite SPA (Components, Services, State, CSS)     |
+------------------------------+------------------------------+
                               |
                        HTTP / REST API
                               |
+------------------------------v------------------------------+
|                   Server (Node.js / Express)                |
|  - Middleware: Auth (JWT), Rate Limiter, Helmet, CORS       |
|  - Services: Auth, Trading, Market Engine, Learning, etc.   |
|  - Caching Engine: In-memory TTLCache                       |
+------------------------------+------------------------------+
                               |
                        better-sqlite3
                               |
+------------------------------v------------------------------+
|                     Database (SQLite3)                      |
|  Users, Stocks, Holdings, Transactions, Watchlist, Lessons  |
+-------------------------------------------------------------+
```

### Technology Stack
- **Frontend**: React 19, Vite, CSS Modules / Pure CSS, Lucide React Icons
- **Backend**: Node.js, Express 5, `better-sqlite3`, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `zod`
- **Testing**: Node.js Built-in Test Runner (`node --test`)

---

## 2. Software Requirements Specification (SRS)

### 2.1 Purpose & Scope
The system provides a risk-free platform for novice and intermediate investors to learn stock market fundamentals, evaluate financial metrics, practice virtual trading with a starting cash balance, monitor portfolios, and complete interactive assessments.

### 2.2 User Roles & Permissions
1. **Guest User**:
   - Access landing page, overview features, and explore public market summaries and stock listings.
2. **Registered User**:
   - Complete interactive lessons and quizzes, track learning progress.
   - Execute virtual Buy and Sell trades with a starting paper balance ($100,000 USD).
   - Manage personal watchlist and receive market alert notifications.
   - View portfolio performance, transaction history, and reset virtual account.
3. **Admin User**:
   - Authenticate with elevated admin credentials.
   - Access Admin Dashboard to create, update, and remove learning courses, modules, and lessons.

### 2.3 Functional Requirements

#### FR-1: User Authentication & Profile
- **FR-1.1**: System shall support user registration with name, email, and password.
- **FR-1.2**: Passwords shall be securely hashed using bcrypt prior to storage.
- **FR-1.3**: Authenticated sessions shall be maintained via JWT tokens.
- **FR-1.4**: Users shall be able to fetch their profile details, current cash balance, and portfolio value.

#### FR-2: Stock Market Exploration & Analysis
- **FR-2.1**: System shall maintain a list of stock assets with ticker, name, sector, price, change percentage, market cap, P/E ratio, and description.
- **FR-2.2**: Users shall be able to search stocks by ticker symbol or name and filter by market sector.
- **FR-2.3**: System shall record and display historical price ticks for technical analysis charts.
- **FR-2.4**: System shall provide fundamental metrics and financial ratios for stock detail views.

#### FR-3: Virtual Trading Engine & Portfolio Management
- **FR-3.1**: System shall allow users to execute **BUY** trades using current market prices if sufficient cash balance is available.
- **FR-3.2**: System shall allow users to execute **SELL** trades for owned stock quantities up to their current holding balance.
- **FR-3.3**: System shall calculate weighted average cost basis upon successive purchases and compute realized Profit & Loss (P&L) upon selling.
- **FR-3.4**: System shall reject invalid trades (insufficient funds, insufficient shares, negative quantities, invalid tickers).
- **FR-3.5**: System shall record all trades in a persistent transaction history with filtering and pagination.
- **FR-3.6**: Users shall be able to reset their portfolio back to the initial starting balance ($100,000) and clear holdings.

#### FR-4: Market Price Engine & Notifications
- **FR-4.1**: System background engine shall periodically generate price movements (ticks) for active stocks.
- **FR-4.2**: System shall invalidate cached market overviews when prices update.
- **FR-4.3**: System shall generate price movement alert notifications for users watching specific stocks when thresholds are met.
- **FR-4.4**: Users shall be able to view notifications, monitor unread counts, and mark notifications as read.

#### FR-5: Watchlist Management
- **FR-5.1**: Users shall be able to toggle (add/remove) stocks on their personal watchlist.
- **FR-5.2**: System shall list watched stocks with real-time price and performance indicators.

#### FR-6: Interactive Learning & Assessment
- **FR-6.1**: System shall serve organized learning modules, topics, and structured lessons (text and video content).
- **FR-6.2**: System shall record user lesson completion progress.
- **FR-6.3**: System shall present interactive quizzes, evaluate submitted user answers, score results, and store attempt summaries.

#### FR-7: Admin Management
- **FR-7.1**: Admin users shall be able to authenticate into the admin interface.
- **FR-7.2**: Admins shall be able to perform CRUD operations on educational courses, modules, and lessons.

### 2.4 Non-Functional Requirements
- **NFR-1 (Performance)**: Server responses for market overview shall leverage in-memory caching to achieve sub-50ms response times.
- **NFR-2 (Security)**: All protected API endpoints must enforce JWT verification via HTTP headers. Input parameters must be strictly validated with Zod schemas.
- **NFR-3 (Data Integrity & Concurrency)**: Virtual trading transactions must ensure atomic execution to prevent balance race conditions during concurrent orders.
- **NFR-4 (Usability)**: Responsive UI optimized for desktop and mobile viewports with immediate UI state reflection.

### 2.5 Data Model & Database Schema

The database schema (`server/src/db/schema.sql`) consists of the following primary entities:

- `users` (`id`, `name`, `email`, `password_hash`, `cash_balance`, `is_admin`, `created_at`)
- `stocks` (`id`, `symbol`, `name`, `sector`, `price`, `change_percent`, `market_cap`, `pe_ratio`, `description`, `created_at`, `updated_at`)
- `stock_history` (`id`, `stock_id`, `price`, `timestamp`)
- `portfolio_holdings` (`id`, `user_id`, `stock_id`, `quantity`, `avg_buy_price`, `updated_at`)
- `transactions` (`id`, `user_id`, `stock_id`, `type`, `quantity`, `price`, `total_amount`, `created_at`)
- `watchlists` (`id`, `user_id`, `stock_id`, `created_at`)
- `notifications` (`id`, `user_id`, `title`, `message`, `is_read`, `created_at`)
- `lesson_progress` (`id`, `user_id`, `lesson_id`, `completed_at`)
- `quiz_attempts` (`id`, `user_id`, `quiz_id`, `score`, `total_questions`, `created_at`)
- `courses` (`id`, `title`, `description`, `level`, `order_index`, `created_at`)
- `modules` (`id`, `course_id`, `title`, `description`, `order_index`, `created_at`)
- `lessons` (`id`, `module_id`, `title`, `content`, `video_url`, `duration`, `order_index`, `created_at`)

---

## 3. Application Workflows

### 3.1 User Onboarding & Authentication Workflow
```
[ Unauthenticated User ]
          │
          ├─► Views Public Landing Page & Market Explorer
          │
          ├─► Registers New Account (Name, Email, Password)
          │            │
          │            ▼
          │     Backend Hash Password & Create User
          │            │
          │            ▼
          │     Issue JWT Session Token
          │
          └─► Login Existing Account
                       │
                       ▼
         Store Token in LocalStorage / State
                       │
                       ▼
          [ Authenticated Dashboard ]
```

### 3.2 Learning & Assessment Workflow
```
[ Authenticated Student ]
          │
          ├─► Browse Courses & Modules (Learn Page)
          │
          ├─► Select & Read / Watch Lesson
          │            │
          │            ▼
          │     Click "Mark as Completed"
          │            │
          │            ▼
          │     API Stores Progress in `lesson_progress`
          │            │
          │            ▼
          │     Update Global Progress Bar
          │
          └─► Start Quiz
                       │
                       ▼
                Submit Answers
                       │
                       ▼
          API Evaluates Score & Saves Attempt
                       │
                       ▼
          View Score & Explanations Breakdown
```

### 3.3 Market Exploration & Watchlist Workflow
```
[ User ] ──► Opens Stock Market Explorer
               │
               ├─► Search by Keyword / Filter by Sector
               ├─► Select Stock Ticker ──► View Interactive Price Chart & Financial Ratios
               │
               └─► Click Watchlist Star Button
                       │
                       ▼
               API Toggles Entry in `watchlists`
                       │
                       ▼
               View Watched Items on Watchlist Screen
```

### 3.4 Virtual Stock Trading & Portfolio Workflow
```
[ Trader ] ──► Opens Trade Simulator for Asset (e.g., AAPL)
                 │
                 ├─► Select Order Type: BUY or SELL
                 ├─► Input Share Quantity
                 │
                 ▼
     [ Click Execute Order ]
                 │
                 ▼
     API Validates Trade Request:
       - Check user cash balance (for BUY)
       - Check user share holding (for SELL)
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
  [ Invalid ]         [ Valid ]
       │                   │
  Return Error        Execute Atomic Transaction:
  (400 Bad Request)     - Update Cash Balance
                        - Update Portfolio Holdings (Avg Cost Basis)
                        - Insert Transaction Record
                           │
                           ▼
                      Return Success & Updated Portfolio
```

### 3.5 Automated Market Engine & Alert Workflow
```
[ Server Background Engine / Manual Tick ]
                 │
                 ▼
     Generate Price Fluctuations for Stocks
                 │
                 ├─► Record Price Snapshot in `stock_history`
                 ├─► Invalidate In-Memory Market Cache
                 │
                 ▼
     Check Active Watchlists for Significant Movement
                 │
                 ▼
     Insert Alert Notifications into `notifications`
                 │
                 ▼
     User Receives Unread Bell Indicator & Toast Alert
```

### 3.6 Admin Content Management Workflow
```
[ Admin User ] ──► Login with Admin Credentials
                      │
                      ▼
               Access Admin Portal
                      │
                      ├─► Create New Course / Module / Lesson
                      ├─► Edit Existing Content
                      └─► Delete Obsolete Modules
                      │
                      ▼
               Changes Persisted & Live for Students
```

---

## 4. Setup, Running & Testing Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm run server:install
   ```
   *(or `npm --prefix server install`)*

### Database Setup
The SQLite database file is managed automatically by `better-sqlite3`. To initialize migrations or seed sample market and lesson data:

```bash
# Seed initial database records
npm --prefix server run db:seed

# Reset database (clears and re-seeds)
npm --prefix server run db:reset
```

### Running the Application

1. **Start Backend Server**:
   ```bash
   npm run server:dev
   ```
   The backend API will run on `http://localhost:5000`.

2. **Start Frontend Client**:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`.

### Running Tests

Execute full server suite tests:
```bash
npm test --prefix server
```
