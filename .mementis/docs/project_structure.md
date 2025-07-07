# High-Level Project Structure - Integration.app Contact Sync

## Core Directory Structure

```
task/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── contacts/             # Contact CRUD operations
│   │   │   │   └── route.ts          # ✅ Already exists
│   │   │   ├── integration/          # 🆕 Integration endpoints
│   │   │   │   ├── webhook/          # 🆕 Webhook handlers
│   │   │   │   │   ├── hubspot/      # 🆕 HubSpot webhook endpoint
│   │   │   │   │   │   └── route.ts  # 🆕 POST handler for HubSpot events
│   │   │   │   │   └── pipedrive/    # 🆕 Pipedrive webhook endpoint
│   │   │   │   │       └── route.ts  # 🆕 POST handler for Pipedrive events
│   │   │   │   ├── sync/             # 🆕 Manual sync endpoints
│   │   │   │   │   ├── route.ts      # 🆕 GET /sync (trigger manual sync)
│   │   │   │   │   └── status/       # 🆕 GET /sync/status
│   │   │   │   │       └── route.ts  # 🆕 Sync status endpoint
│   │   │   │   └── setup/            # 🆕 Setup utilities
│   │   │   │       └── pronouns/     # 🆕 Pronouns field setup
│   │   │   │           └── route.ts  # 🆕 POST /setup/pronouns
│   │   │   ├── cron/                 # 🆕 Scheduled tasks
│   │   │   │   └── sync.ts           # 🆕 Vercel Cron handler
│   │   │   ├── integration-token/    # ✅ Already exists
│   │   │   │   └── route.ts          # ✅ Integration.app token generation
│   │   │   └── self/                 # ✅ Already exists
│   │   │       └── route.ts          # ✅ Customer info endpoint
│   │   ├── contacts/                 # ✅ Contact management UI (exists)
│   │   │   ├── components/           # ✅ Contact components
│   │   │   │   ├── contacts-table.tsx    # ✅ Enhanced with sync status
│   │   │   │   ├── contact-form.tsx      # ✅ Already exists
│   │   │   │   ├── sync-status-badge.tsx # 🆕 Individual contact sync status
│   │   │   │   └── pronouns-setup-banner.tsx # 🆕 Setup helper UI
│   │   │   ├── layout.tsx            # ✅ Already exists
│   │   │   └── page.tsx              # ✅ Enhanced with sync features
│   │   ├── integrations/             # ✅ Integration management UI (exists)
│   │   │   ├── components/           # ✅ Integration components
│   │   │   │   ├── integrations-list.tsx     # ✅ Enhanced with sync status
│   │   │   │   ├── sync-status-panel.tsx     # 🆕 Overall sync dashboard
│   │   │   │   └── manual-sync-button.tsx    # 🆕 Trigger manual sync
│   │   │   ├── layout.tsx            # ✅ Already exists
│   │   │   └── page.tsx              # ✅ Enhanced with sync controls
│   │   ├── layout.tsx                # ✅ Root layout (exists)
│   │   ├── page.tsx                  # ✅ Homepage (exists)
│   │   ├── auth-provider.tsx         # ✅ Auth context (exists)
│   │   ├── integration-provider.tsx  # ✅ Integration.app provider (exists)
│   │   └── globals.css               # ✅ Global styles (exists)
│   ├── lib/                          # Utility libraries
│   │   ├── sync/                     # 🆕 Core sync engine
│   │   │   ├── contact-sync-service.ts   # 🆕 Main sync orchestrator
│   │   │   ├── conflict-resolver.ts      # 🆕 Conflict resolution logic
│   │   │   ├── webhook-processor.ts      # 🆕 Webhook event processing
│   │   │   ├── rate-limiter.ts           # 🆕 CRM API rate limiting
│   │   │   └── sync-queue.ts             # 🆕 Background job queue (optional)
│   │   ├── crm/                      # 🆕 CRM-specific integrations
│   │   │   ├── hubspot/               # 🆕 HubSpot integration
│   │   │   │   ├── client.ts          # 🆕 HubSpot API client wrapper
│   │   │   │   ├── webhook-verifier.ts # 🆕 HMAC verification
│   │   │   │   ├── field-mapper.ts    # 🆕 Field mapping logic
│   │   │   │   └── setup-helper.ts    # 🆕 Custom field creation
│   │   │   ├── pipedrive/             # 🆕 Pipedrive integration
│   │   │   │   ├── client.ts          # 🆕 Pipedrive API client wrapper
│   │   │   │   ├── webhook-verifier.ts # 🆕 HMAC verification
│   │   │   │   ├── field-mapper.ts    # 🆕 Field mapping logic
│   │   │   │   └── setup-helper.ts    # 🆕 Custom field creation
│   │   │   └── base/                  # 🆕 Shared CRM utilities
│   │   │       ├── crm-client.interface.ts # 🆕 Common CRM interface
│   │   │       ├── field-mapper.base.ts    # 🆕 Base field mapping
│   │   │       └── webhook-verifier.base.ts # 🆕 Base HMAC logic
│   │   ├── integration-app-client.ts # ✅ Integration.app SDK wrapper (exists)
│   │   ├── integration-token.ts      # ✅ Token generation (exists)
│   │   ├── mongodb.ts                # ✅ Database connection (exists)
│   │   ├── server-auth.ts            # ✅ Server-side auth (exists)
│   │   ├── auth.ts                   # ✅ Client-side auth (exists)
│   │   ├── fetch-utils.ts            # ✅ Authenticated fetching (exists)
│   │   └── utils.ts                  # ✅ General utilities (exists)
│   ├── models/                       # Database models
│   │   ├── contact.ts                # ✅ Contact model (exists)
│   │   ├── contact-link.ts           # 🆕 CRM mapping model
│   │   ├── sync-log.ts               # 🆕 Sync operation history
│   │   └── conflict-log.ts           # 🆕 Conflict tracking
│   ├── hooks/                        # React hooks
│   │   ├── use-contacts.ts           # ✅ Contact management (exists)
│   │   ├── use-sync-status.ts        # 🆕 Sync status tracking
│   │   ├── use-manual-sync.ts        # 🆕 Manual sync trigger
│   │   └── use-pronouns-setup.ts     # 🆕 Pronouns setup status
│   ├── types/                        # TypeScript definitions
│   │   ├── contact.ts                # ✅ Contact types (exists)
│   │   ├── sync.ts                   # 🆕 Sync-related types
│   │   ├── crm.ts                    # 🆕 CRM provider types
│   │   └── webhook.ts                # 🆕 Webhook payload types
│   └── components/                   # Shared UI components
│       ├── ui/                       # ✅ shadcn/ui components (exist)
│       ├── header.tsx                # ✅ Navigation header (exists)
│       ├── auth-test.tsx             # ✅ Auth testing component (exists)
│       └── sync/                     # 🆕 Sync-specific components
│           ├── sync-status-indicator.tsx # 🆕 Status indicator
│           ├── error-display.tsx         # 🆕 Error message display
│           └── conflict-badge.tsx        # 🆕 Conflict notification
├── docs/                             # 🆕 Documentation
│   ├── architecture.md              # 🆕 System architecture
│   ├── setup-guide.md               # 🆕 CRM setup instructions
│   ├── api-reference.md             # 🆕 API endpoints documentation
│   ├── troubleshooting.md           # 🆕 Common issues & solutions
│   └── decisions.md                 # 🆕 Technical decision log
├── scripts/                         # 🆕 Utility scripts
│   ├── setup-crm-fields.js          # 🆕 One-time CRM field setup
│   ├── test-webhook.js              # 🆕 Webhook testing utility
│   └── migrate-db.js                # 🆕 Database migration script
├── integration-app/                 # 🆕 Integration.app configurations
│   ├── interfaces/                  # 🆕 Universal interface definitions
│   │   └── contacts-sync.yaml       # 🆕 ContactsSync interface
│   └── templates/                   # 🆕 Provider-specific templates
│       ├── hubspot-contacts.yaml    # 🆕 HubSpot contact template
│       └── pipedrive-persons.yaml   # 🆕 Pipedrive person template
├── .env                             # ✅ Environment variables (exists)
├── .env.example                     # 🆕 Environment template
├── vercel.json                      # 🆕 Vercel cron configuration
├── package.json                     # ✅ Dependencies (exists)
└── README.md                        # ✅ Enhanced with sync documentation
```

## Key Module Responsibilities

### 🔄 **Core Sync Engine** (`src/lib/sync/`)

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| `contact-sync-service.ts` | Main orchestrator | `syncContacts()`, `performBidirectionalSync()` |
| `conflict-resolver.ts` | Handle data conflicts | `detectConflicts()`, `resolveCrmWins()` |
| `webhook-processor.ts` | Process webhook events | `processContactWebhook()`, `validatePayload()` |
| `rate-limiter.ts` | API rate limiting | `makeRateLimitedRequest()`, `getQueue()` |

### 🔗 **CRM Integrations** (`src/lib/crm/`)

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| `hubspot/client.ts` | HubSpot API wrapper | `listContacts()`, `upsertContact()`, `deleteContact()` |
| `pipedrive/client.ts` | Pipedrive API wrapper | `listPersons()`, `upsertPerson()`, `deletePerson()` |
| `*/field-mapper.ts` | Field transformations | `mapToInternal()`, `mapToExternal()` |
| `*/webhook-verifier.ts` | HMAC verification | `verifySignature()`, `validateTimestamp()` |

### 📊 **Database Models** (`src/models/`)

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `contact.ts` | ✅ App contacts | `id`, `email`, `name`, `pronouns`, `syncMetadata` |
| `contact-link.ts` | 🆕 CRM mappings | `contactId`, `provider`, `externalId`, `syncStatus` |
| `sync-log.ts` | 🆕 Operation history | `operation`, `status`, `timestamp`, `errorDetails` |
| `conflict-log.ts` | 🆕 Conflict tracking | `contactId`, `field`, `localValue`, `crmValue` |

### 🎨 **UI Components** (`src/app/` & `src/components/`)

| Component | Purpose | Location |
|-----------|---------|----------|
| `sync-status-badge.tsx` | Individual contact status | `src/app/contacts/components/` |
| `sync-status-panel.tsx` | Overall integration status | `src/app/integrations/components/` |
| `pronouns-setup-banner.tsx` | Setup helper UI | `src/app/contacts/components/` |
| `manual-sync-button.tsx` | Trigger sync manually | `src/app/integrations/components/` |

### 🔌 **API Routes** (`src/app/api/`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/integration/webhook/hubspot` | POST | Receive HubSpot contact events |
| `/api/integration/webhook/pipedrive` | POST | Receive Pipedrive person events |
| `/api/integration/sync` | GET | Trigger manual sync |
| `/api/integration/sync/status` | GET | Get sync status |
| `/api/integration/setup/pronouns` | POST | Setup pronouns fields |
| `/api/cron/sync` | GET | Scheduled sync (Vercel Cron) |

### 📱 **React Hooks** (`src/hooks/`)

| Hook | Purpose | Key Functions |
|------|---------|---------------|
| `use-sync-status.ts` | Track sync state | `syncStats`, `lastSync`, `errorCount` |
| `use-manual-sync.ts` | Manual sync trigger | `triggerSync()`, `isRunning` |
| `use-pronouns-setup.ts` | Setup status | `isConfigured`, `runSetup()` |

## Implementation Priority Order

### 🔥 **Day 1 - Foundation**
1. `src/models/contact-link.ts` - Database schema
2. `src/types/sync.ts` - TypeScript definitions
3. `src/lib/sync/conflict-resolver.ts` - Basic "CRM wins" logic

### 🔥 **Day 2 - Integration.app Setup**
1. `integration-app/interfaces/contacts-sync.yaml` - Universal interface
2. `integration-app/templates/hubspot-contacts.yaml` - HubSpot template
3. `integration-app/templates/pipedrive-persons.yaml` - Pipedrive template
4. `scripts/setup-crm-fields.js` - Pronouns field setup

### 🔥 **Day 3 - Core Sync Engine**
1. `src/lib/sync/contact-sync-service.ts` - Main sync orchestrator
2. `src/lib/crm/base/crm-client.interface.ts` - Common interface
3. `src/lib/crm/hubspot/client.ts` - HubSpot integration
4. `src/lib/crm/pipedrive/client.ts` - Pipedrive integration

### 🔥 **Day 4 - Webhooks & Background Jobs**
1. `src/lib/crm/*/webhook-verifier.ts` - HMAC verification
2. `src/app/api/integration/webhook/*/route.ts` - Webhook endpoints
3. `src/lib/sync/webhook-processor.ts` - Event processing
4. `src/app/api/cron/sync.ts` - Scheduled polling

### 🔥 **Day 5 - UI & Polish**
1. `src/app/contacts/components/sync-status-badge.tsx` - Contact status
2. `src/app/integrations/components/sync-status-panel.tsx` - Integration dashboard
3. `src/app/contacts/components/pronouns-setup-banner.tsx` - Setup helper
4. `src/hooks/use-sync-status.ts` - Status management

## Configuration Files

### 🔧 **Environment Variables** (`.env.example`)
```bash
# Integration.app
INTEGRATION_APP_WORKSPACE_KEY=your_workspace_key
INTEGRATION_APP_WORKSPACE_SECRET=your_workspace_secret

# CRM Credentials
HUBSPOT_CLIENT_ID=your_hubspot_client_id
HUBSPOT_CLIENT_SECRET=your_hubspot_client_secret
HUBSPOT_WEBHOOK_SECRET=your_hubspot_webhook_secret

PIPEDRIVE_CLIENT_ID=your_pipedrive_client_id
PIPEDRIVE_CLIENT_SECRET=your_pipedrive_client_secret
PIPEDRIVE_WEBHOOK_SECRET=your_pipedrive_webhook_secret

# Database
MONGODB_URI=mongodb+srv://...

# Sync Configuration
DEFAULT_SYNC_INTERVAL=600000
MAX_RETRY_ATTEMPTS=3
CONFLICT_RESOLUTION_STRATEGY=crm_wins
```

### 🕒 **Vercel Cron** (`vercel.json`)
```json
{
  "crons": [
    {
      "path": "/api/cron/sync",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

### 📦 **Additional Dependencies** (`package.json`)
```json
{
  "dependencies": {
    "p-queue": "^8.0.1",
    "date-fns": "^3.0.0"
  }
}
```

## Module Interaction Flow

```
1. User creates contact in UI
   └── src/app/contacts/page.tsx
       └── src/hooks/use-contacts.ts
           └── src/app/api/contacts/route.ts
               └── src/lib/sync/contact-sync-service.ts
                   └── src/lib/crm/*/client.ts

2. CRM webhook received
   └── src/app/api/integration/webhook/*/route.ts
       └── src/lib/crm/*/webhook-verifier.ts
           └── src/lib/sync/webhook-processor.ts
               └── src/lib/sync/contact-sync-service.ts

3. Manual sync triggered
   └── src/app/integrations/components/manual-sync-button.tsx
       └── src/hooks/use-manual-sync.ts
           └── src/app/api/integration/sync/route.ts
               └── src/lib/sync/contact-sync-service.ts

4. Scheduled sync (Pipedrive)
   └── Vercel Cron
       └── src/app/api/cron/sync.ts
           └── src/lib/sync/contact-sync-service.ts
```

## Key Implementation Notes

### 📋 **Existing vs New Code**
- **✅ Keep existing**: Contact CRUD, Integration.app setup, Auth system
- **🆕 Add new**: Sync engine, webhook handlers, CRM clients, UI enhancements

### 🎯 **Critical Success Paths**
1. **Pronouns handling** - Required per call notes
2. **Real-time sync** - HubSpot webhooks mandatory
3. **Error handling** - Graceful degradation and retry
4. **Sync status UI** - Visible feedback for users

### 🔄 **Fallback Strategies**
- **Large datasets**: Add Redis queue if Vercel Cron times out
- **Webhook failures**: Polling fallback for both providers
- **Rate limits**: Exponential backoff with p-queue
- **Field mapping**: Skip pronouns with warning if setup fails

This structure provides a **complete, working bi-directional sync** while maintaining clean separation of concerns and future scalability.