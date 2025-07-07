---
mb_meta:
  project: Integration.app Bi-Directional Contact Sync
  version: 1.0.0
  lastUpdated: '2025-07-07T15:47:30Z'
  authors:
    - Cline
---

# Product Context

This document describes the product goals, user experience, and key features from a user-centric perspective.

## 1. Target User & Use Case

-   **User:** A developer or product manager at a SaaS company.
-   **Goal:** To quickly and reliably add bi-directional contact sync with multiple CRMs (starting with HubSpot and Pipedrive) to their own application.
-   **Core Problem:** Building and maintaining individual integrations is time-consuming and complex. The user needs a solution that abstracts away the provider-specific details and offers a unified integration experience.

## 2. User-Facing Features (MVP)

### 2.1. Integration Management

-   **Connect CRMs:** Users can connect their HubSpot and Pipedrive accounts to the application through a simple, OAuth-based UI provided by Integration.app.
-   **View Connections:** A list of active and inactive integrations will be displayed, showing their current status.

### 2.2. Synchronization Status & Control

-   **Overall Sync Status:** A dashboard or panel will show the global status of the sync, including the timestamp of the last successful sync and a count of any errors.
-   **Per-Contact Status:** In the contact list view, each contact will have a visual badge indicating its sync status (e.g., "Synced," "Local Only," "Error").
-   **Manual Sync Trigger:** A "Sync Now" button will allow users to manually trigger a full bi-directional sync on demand.

### 2.3. Pronouns Field Setup (Mandatory Feature)

-   **Automated Setup:** To handle the custom "pronouns" field, the application must provide a simple, one-click solution for the user.
-   **UI Prompt:** If the application detects that the custom field has not been created in the connected CRMs, it will display a persistent, non-intrusive banner.
-   **Setup Helper:** The banner will contain a "Setup Now" button that, when clicked, triggers a backend process to create the required custom field in both HubSpot and Pipedrive.
-   **Graceful Fallback:** If the setup is not completed or fails, the application will still sync other contact fields but will skip the pronouns field and display a warning.

## 3. Key User Journeys

### 3.1. Onboarding a New CRM

1.  The user navigates to the "Integrations" page.
2.  They click "Add Integration" and select either HubSpot or Pipedrive.
3.  They are redirected to the CRM's authorization screen via the Integration.app connection UI.
4.  After authorizing, they are returned to the application. The new connection appears in their list of integrations.
5.  If the pronouns field is not yet configured, the setup banner appears.

### 3.2. Creating a New Contact

1.  The user creates a new contact within the application.
2.  The contact initially appears with a "Syncing..." or "Local Only" status.
3.  Within a short period, the `ContactSyncService` pushes the new contact to both HubSpot and Pipedrive.
4.  The contact's status badge in the UI updates to "Synced."
5.  The user can verify that the contact now exists in both CRMs.

### 3.3. Receiving a CRM Update

1.  The user updates a contact's phone number directly in HubSpot.
2.  HubSpot sends a webhook to the application.
3.  The application processes the webhook, updates the contact's phone number in the local database.
4.  The change is reflected in the application's UI almost immediately.
5.  The change is then synced from the app to Pipedrive during the next polling cycle.

## 4. Success Metrics (From a User Perspective)

-   **Ease of Setup:** A user should be able to connect a new CRM in under 2 minutes.
-   **Sync Accuracy:** Data should be consistent across the application and all connected CRMs.
-   **Clarity:** The UI must provide clear, unambiguous feedback about the sync status of each contact and the overall health of the integrations.
-   **Reliability:** The sync should operate consistently in the background with minimal user intervention.
