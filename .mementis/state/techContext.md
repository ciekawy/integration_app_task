---
mb_meta:
  project: Integration.app Bi-Directional Contact Sync
  version: 1.0.0
  lastUpdated: '2025-07-07T15:46:00Z'
  authors:
    - Cline
---

# Technical Context

This document outlines the technology stack, architecture, and key technical decisions for the bi-directional contact sync prototype.

## 1. Core Technology Stack

-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **UI:** React, shadcn/ui, Tailwind CSS
-   **State Management:** SWR for data fetching, React context for global state.
-   **Database:** MongoDB
-   **Deployment:** Vercel

## 2. Key Platforms & Services

-   **Integration.app:** The core platform for building the universal sync logic. The React SDK, JavaScript SDK, and drop-in UI components will be utilized.
-   **HubSpot:** One of the target CRMs. Integration will be via their v3 REST API, with a focus on webhooks for real-time updates.
-   **Pipedrive:** The second target CRM. Integration will be via their v2 REST API, with polling as the primary change detection mechanism.
-   **Vercel:** Used for hosting and for its Cron Jobs feature, which will drive the polling mechanism for Pipedrive.

## 3. Architectural Patterns & Decisions

### 3.1. Sync Engine

-   **Universal Logic:** A central `ContactSyncService` will orchestrate the synchronization, using universal actions defined in an Integration.app `ContactsSync` interface.
-   **Conflict Resolution:** The MVP will implement a simple "CRM wins" strategy. Conflicts will be detected by comparing `lastModified` timestamps and logged, but the CRM's version of the data will always overwrite the application's data.
-   **Rate Limiting:** A lightweight `p-queue` wrapper will be used to manage API call frequency to both HubSpot and Pipedrive, preventing rate-limiting errors during the demo.

### 3.2. Change Data Capture

-   **HubSpot (Real-Time):** A webhook endpoint (`/api/integration/webhook/hubspot`) will be created to receive real-time contact create/update/delete events. HMAC-SHA256 will be used for signature verification.
-   **Pipedrive (Polling):** A Vercel Cron job (`/api/cron/sync`) will run at a set interval (e.g., every 10 minutes) to poll for changes from Pipedrive using a `lastModified` filter.

### 3.3. Database Schema

-   **`Contact` Model:** The existing contact model will be augmented with fields to track sync status (`syncedToCRMs`, `lastAppModified`).
-   **`ContactLink` Model:** A new model will be introduced to create a mapping table between the application's internal contact ID and the corresponding external IDs in each CRM (`contactId`, `provider`, `externalId`, `customerId`, `syncStatus`).
-   **Logging Models:** `SyncLog` and `ConflictLog` models will be created to record sync operations and data conflicts, respectively.

### 3.4. Pronouns Field Handling (Mandatory Edge Case)

-   A one-time setup script (`/api/integration/setup/pronouns`) will be provided to programmatically create a custom "pronouns" field in both HubSpot and Pipedrive via their APIs.
-   The UI will display a banner prompting the user to run this setup if the field is not detected. The sync will gracefully handle the absence of the field by not syncing pronoun data until it is configured.

## 4. MVP Constraints & Scalability Considerations

-   **Data Volume:** The MVP architecture is designed for a low volume of contacts (e.g., <500).
-   **Background Jobs:** For the prototype, webhook processing and polling will be handled by Vercel's serverless functions.
-   **Future Scaling:** The documentation explicitly notes that for larger data volumes (>500 contacts), a more robust background job system using Redis and BullMQ would be required. This is a documented "Future Enhancement."
-   **Security:** HMAC webhook verification will use a single secret per CRM. Secret rotation and replay attack prevention are designated as future enhancements.
