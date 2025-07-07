---
mb_meta:
  project: Integration.app Bi-Directional Contact Sync
  version: 1.0.0
  lastUpdated: '2025-07-07T15:48:00Z'
  authors:
    - Cline
---

# Project Progress & Roadmap

This document tracks the epics, tasks, and overall progress of the bi-directional contact sync prototype.

## 1. High-Level Epics

The project is broken down into five main epics, corresponding to the 5-day implementation plan.

-   **Epic 1: Foundation & Scaffolding** - Setting up the database, types, and core project structure.
-   **Epic 2: Integration.app Configuration** - Defining the universal sync interface and provider templates.
-   **Epic 3: Core Sync Engine** - Implementing the main bi-directional synchronization logic.
-   **Epic 4: Webhooks & Background Jobs** - Building the infrastructure for real-time and scheduled syncs.
-   **Epic 5: UI & Final Polish** - Developing the user-facing components for status and control.

## 2. Task Breakdown & Status

### Epic 1: Foundation & Scaffolding (Day 1)

-   [x] **Mementis Setup:** Create initial state files (`projectbrief`, `techContext`, `systemPatterns`, `productContext`, `progress`).
-   [ ] **Database Schema:**
    -   [ ] Create `models/contact-link.ts` for CRM mapping.
    -   [ ] Create `models/sync-log.ts` for operation history.
    -   [ ] Create `models/conflict-log.ts` for tracking conflicts.
    -   [ ] Augment `models/contact.ts` with `syncedToCRMs` and `lastAppModified` fields.
-   [ ] **Types:** Create `types/sync.ts`, `types/crm.ts`, and `types/webhook.ts`.
-   [ ] **Conflict Resolver:** Implement basic "CRM wins" logic in `lib/sync/conflict-resolver.ts`.

### Epic 2: Integration.app Configuration (Day 2)

-   [ ] **Universal Interface:** Create `integration-app/interfaces/contacts-sync.yaml`.
-   [ ] **Provider Templates:**
    -   [ ] Create `integration-app/templates/hubspot-contacts.yaml`.
    -   [ ] Create `integration-app/templates/pipedrive-persons.yaml`.
-   [ ] **Pronouns Setup Script:**
    -   [ ] Create the backend logic for a one-time setup script in `lib/crm/*/setup-helper.ts`.
    -   [ ] Expose this logic via an API endpoint at `/api/integration/setup/pronouns/route.ts`.

### Epic 3: Core Sync Engine (Day 3)

-   [ ] **CRM Client Interface:** Define a common interface in `lib/crm/base/crm-client.interface.ts`.
-   [ ] **CRM Clients:**
    -   [ ] Implement `lib/crm/hubspot/client.ts`.
    -   [ ] Implement `lib/crm/pipedrive/client.ts`.
-   [ ] **Contact Sync Service:** Implement the main orchestrator in `lib/sync/contact-sync-service.ts`.

### Epic 4: Webhooks & Background Jobs (Day 4)

-   [ ] **Webhook Verifiers:**
    -   [ ] Implement HMAC verification for HubSpot in `lib/crm/hubspot/webhook-verifier.ts`.
    -   [ ] Implement placeholder HMAC verification for Pipedrive.
-   [ ] **Webhook Processor:** Create `lib/sync/webhook-processor.ts` to handle incoming webhook payloads.
-   [ ] **API Endpoints:**
    -   [ ] Create HubSpot webhook endpoint at `/api/integration/webhook/hubspot/route.ts`.
    -   [ ] Create Pipedrive webhook endpoint at `/api/integration/webhook/pipedrive/route.ts`.
-   [ ] **Cron Job:**
    -   [ ] Create the scheduled sync handler at `/api/cron/sync.ts`.
    -   [ ] Configure Vercel Cron in `vercel.json`.
-   [ ] **Rate Limiter:** Implement `lib/sync/rate-limiter.ts` using `p-queue`.

### Epic 5: UI & Final Polish (Day 5)

-   [ ] **React Hooks:**
    -   [ ] Create `hooks/use-sync-status.ts`.
    -   [ ] Create `hooks/use-manual-sync.ts`.
    -   [ ] Create `hooks/use-pronouns-setup.ts`.
-   [ ] **UI Components:**
    -   [ ] Create `components/sync/sync-status-badge.tsx`.
    -   [ ] Create `components/sync/sync-status-panel.tsx`.
    -   [ ] Create `components/sync/pronouns-setup-banner.tsx`.
    -   [ ] Create `components/sync/manual-sync-button.tsx`.
-   [ ] **Integrate Components:** Add the new components to the `contacts` and `integrations` pages.
-   [ ] **Documentation:** Write the final README, including setup instructions and a summary of technical decisions.
-   [ ] **Deployment:** Deploy the application to Vercel and perform final testing.

## 3. Current Status

**Status:** **Initiated**.
The project has been initialized, and the Mementis state files have been created. The next step is to begin the foundational scaffolding work outlined in Epic 1.
