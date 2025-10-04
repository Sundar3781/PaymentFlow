# Payment Request & Approval Tracking System

## Overview

This is a comprehensive financial workflow management application for tracking payment requests, approvals, and purchase orders. The system handles dual workflows: traditional payment requests (wages, salaries, fuel, materials) and a complete purchase requisition-to-order cycle with multi-level approvals. Built as a modern SaaS dashboard with clean data presentation inspired by Linear, Stripe Dashboard, and Notion, the application emphasizes clarity and professional trust signals appropriate for financial operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR support
- Wouter for lightweight client-side routing
- React Query (TanStack Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode as default with light mode support via CSS custom properties
- Inter font family via Google Fonts CDN for consistent typography
- Custom color palette with semantic color variables for status indicators (success/green, warning/amber, destructive/red)

**Design Patterns**
- Component composition using Radix UI unstyled primitives
- Controlled and uncontrolled form patterns with React Hook Form
- Dialog-based CRUD operations for creating and approving requests
- Table-based data presentation with inline actions
- Status badge system for visual state indication (paid/unpaid/pending, approved/rejected)

**State Management Strategy**
- React Query for async server state with stale-while-revalidate patterns
- Local component state for UI interactions (dialogs, filters)
- No global state management library (Redux/Zustand) - relying on React Query cache
- Query invalidation for optimistic updates after mutations

### Backend Architecture

**Server Framework**
- Express.js with TypeScript in ESM module format
- HTTP-only REST API architecture (no WebSocket/realtime yet)
- Session-based authentication prepared (connect-pg-simple middleware)
- Middleware pipeline: JSON parsing, URL encoding, logging, error handling

**API Design**
- RESTful endpoints prefixed with `/api`
- Storage abstraction layer (`IStorage` interface) for database operations
- Currently using in-memory storage (`MemStorage`) as development placeholder
- CRUD operations: getUser, getUserByUsername, createUser (user management scaffold)

**Development vs Production**
- Vite middleware integration in development for HMR and SPA serving
- Static file serving in production from `dist/public`
- Request/response logging with duration tracking for API routes
- Separate build process: Vite for client, esbuild for server bundling

### Data Storage Solutions

**Database Strategy**
- PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with Zod validation via `drizzle-zod`
- Migration system using `drizzle-kit` with migrations output to `/migrations`

**Current Schema**
- Users table with UUID primary keys, username/password fields
- Schema defined in `shared/schema.ts` for isomorphic type sharing
- Insert schemas derived from Drizzle tables using `createInsertSchema`
- Type inference using `$inferSelect` for compile-time safety

**Future Schema Requirements**
- Payment requests: amount, description, requester, head, group, status, dates
- Purchase requests: item details, quantity, cost estimates, urgency levels
- Multi-level approvals: supervisor, manager, management approval states
- Quotations: vendor info, pricing, delivery terms, quotation numbers
- Purchase orders: PO numbers, delivery addresses, payment terms, status tracking
- Hierarchical categorization: heads (wages, fuel, materials) and groups (team-a, team-b)

### Authentication & Authorization

**Planned Authentication**
- Session-based auth using `express-session` with PostgreSQL store
- `connect-pg-simple` for persistent session storage
- User credential storage with hashed passwords (implementation pending)
- Cookie-based session management with `credentials: "include"` in fetch requests

**Authorization Patterns**
- Role-based access control planned: field-worker, supervisor, manager, management
- Approval hierarchies based on user roles
- Different permission levels for viewing vs. approving payment/purchase requests

### External Dependencies

**Third-Party UI Libraries**
- Radix UI suite: 20+ primitive components (dialogs, dropdowns, popovers, tabs, etc.)
- Lucide React for consistent iconography
- date-fns for date manipulation and formatting
- cmdk for command palette patterns
- embla-carousel-react for carousel components
- react-day-picker for date selection in filters
- vaul for drawer components

**Development Tools**
- TypeScript compiler for type checking (`tsc --noEmit`)
- Replit-specific plugins: runtime error overlay, cartographer, dev banner
- PostCSS with Tailwind and Autoprefixer

**Backend Services**
- Neon Database: Serverless PostgreSQL hosting
- Environment variable: `DATABASE_URL` for database connection string

**Build & Runtime**
- Node.js with ES modules
- tsx for TypeScript execution in development
- esbuild for production server bundling
- Path aliases: `@/` for client, `@shared/` for shared types, `@assets/` for static files

**Deployment Considerations**
- Production start script runs compiled output from `dist/index.js`
- Client assets built to `dist/public`
- Database migrations applied via `npm run db:push`
- Environment-specific behavior: Vite middleware only in development, Replit plugins only in non-production