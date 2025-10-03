# Design Guidelines: Payment Request & Approval Tracking System

## Design Approach
**Selected Approach:** Design System with Modern SaaS Dashboard Aesthetics
**Reference Inspiration:** Linear (for clean data presentation), Stripe Dashboard (for financial interface patterns), Notion (for status management)
**Rationale:** This is a utility-focused, information-dense application requiring clarity, efficiency, and professional trust signals appropriate for financial workflows.

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default):**
- Background: 222 15% 11% (Deep charcoal)
- Surface: 222 15% 15% (Card background)
- Border: 222 10% 25% (Subtle borders)
- Primary: 142 76% 45% (Green for approvals/paid)
- Danger: 0 84% 60% (Red for rejections/unpaid)
- Warning: 38 92% 50% (Amber for pending)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 0 0% 88%
- Same accent colors with adjusted saturation

### B. Typography
- **Font Family:** Inter (via Google Fonts CDN) for all text
- **Headings:** font-semibold, leading-tight
  - H1: text-3xl (Dashboard titles)
  - H2: text-2xl (Section headers)
  - H3: text-lg (Card headers)
- **Body:** text-sm, leading-relaxed
- **Data/Numbers:** font-mono text-sm (for amounts)
- **Labels:** text-xs font-medium uppercase tracking-wide text-secondary

### C. Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6
- Section gaps: gap-6
- Card spacing: p-4 or p-6
- Form inputs: p-3
- Icon sizes: h-5 w-5 (icons), h-6 w-6 (larger actions)

**Grid System:**
- Dashboard: Two-column responsive (sidebar + main)
- Sidebar: w-64 fixed on desktop, drawer on mobile
- Main content: max-w-7xl mx-auto px-6
- Cards grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

### D. Component Library

**Navigation:**
- Vertical sidebar with icon + label navigation items
- Sections: Dashboard, Requests, Approvals, Reports, Settings
- Active state: Subtle background tint + border accent
- Icons from Heroicons (outline style)

**Status Badges:**
- Pill-shaped with dot indicator (h-2 w-2 rounded-full)
- Paid: Green background with darker green text
- Unpaid: Red background with darker red text
- Pending: Amber background with darker amber text
- Approved/Rejected: Similar color coding

**Data Tables:**
- Striped rows with hover states
- Sticky headers on scroll
- Row actions: Icon buttons aligned right
- Sortable columns with arrow indicators
- Pagination controls at bottom
- Responsive: Stack to cards on mobile

**Cards:**
- Rounded corners (rounded-lg)
- Border (border border-border)
- Shadow on hover (hover:shadow-md transition)
- Header with title + action button
- Stat cards for dashboard metrics (large number + trend indicator)

**Forms:**
- Floating labels or top-aligned labels
- Input fields: Consistent height (h-10), rounded (rounded-md), bordered
- Dark mode: bg-surface with lighter border
- Dropdown selects with chevron indicators
- Multi-select with tag display
- Date pickers for date range selection
- Validation: Inline error messages in red below inputs

**Buttons:**
- Primary: Green filled for main actions (Submit, Approve)
- Secondary: Border outline for cancel/secondary actions
- Danger: Red filled for reject/delete
- Icon buttons: Square with icon, subtle hover background
- Loading states: Spinner icon replacement

**Modal/Dialogs:**
- Centered overlay with backdrop blur
- Max width constraint (max-w-2xl)
- Close button top-right
- Actions footer with button group

**Charts/Graphs:**
- Simple bar/pie charts for report visualizations
- Use primary/danger/warning colors for data categories
- Tooltips on hover showing exact values
- Chart.js or similar lightweight library

### E. Key Screens Layout

**Dashboard:**
- Top: Summary stat cards (4 metrics: Total Requests, Pending Approvals, Total Paid, Total Unpaid)
- Middle: Recent requests table (5-10 rows)
- Bottom: Quick actions + upcoming pending items

**Payment Requests List:**
- Filter bar: Status dropdown, date range, head/group selectors, search input
- Table view with columns: ID, Description, Amount, Status, Requester, Date, Actions
- Create new request: Primary button top-right

**Create/Edit Request Form:**
- Single column form layout
- Fields: Amount (large, prominent), Description (textarea), Category/Head dropdown, Group dropdown, Attachments upload area
- Submit button prominent at bottom

**Approval View:**
- Request details card (left/top on mobile)
- Approval actions panel (right/bottom on mobile)
- Comment/notes textarea
- Approve/Reject buttons side-by-side
- History timeline showing previous actions

**Reports Page:**
- Filter panel: Date range, Group by (Head/Group), Export button
- Summary cards showing totals
- Data table with grouping/subtotals
- Export to CSV functionality

### Images
No hero images needed. This is a utility application focused on data and workflows. All visual elements are UI components, icons, and data visualizations.

### Animations
**Minimal, purposeful only:**
- Smooth transitions on hover states (transition-colors duration-150)
- Modal/drawer entrance (slide/fade)
- Loading spinners for async actions
- Toast notifications for success/error feedback (slide in from top-right)

### Additional Polish
- Empty states with helpful illustrations and CTAs
- Loading skeletons for tables during data fetch
- Confirmation dialogs for destructive actions
- Toast notifications positioned top-right
- Breadcrumb navigation for nested views
- Search with debounced input (300ms)