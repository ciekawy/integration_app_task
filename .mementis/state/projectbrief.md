---
mb_meta:
  project: Integration.app Bi-Directional Contact Sync
  version: 1.0.0
  lastUpdated: '2025-07-07T15:45:00Z'
  authors:
    - Cline
---

# Project Brief: Bi-Directional Contact Sync Prototype

## 1. Core Mission

To build a functional, prototype-level bi-directional contact synchronization application within a 5-day timeline for a recruitment assessment. The project must demonstrate high competency in agentic coding, architectural design, and production awareness.

The application will sync contact data between the local application database and two external CRMs (HubSpot and Pipedrive), leveraging the Integration.app platform.

## 2. Key Objectives & Success Criteria

The primary goal is to deliver a working MVP that fulfills all explicit requirements from the project documentation and call transcripts.

### MVP Deliverables (5-Day Target)

1.  **Bi-Directional Sync:** Implement create, update, and delete synchronization for contacts between the app and the connected CRMs.
2.  **CRM Integration:** Connect to HubSpot and Pipedrive using Integration.app's universal template capabilities.
3.  **Pronouns Field Handling:** Address the mandatory edge case of syncing a custom "pronouns" field, which requires creating a custom field in the CRMs.
4.  **Real-Time & Polling Sync:**
    *   Utilize webhooks for real-time updates from HubSpot.
    *   Implement a polling mechanism (e.g., Vercel Cron) for Pipedrive, which serves as a fallback sync strategy.
5.  **Conflict Resolution:** Implement a simple "CRM wins" strategy for data conflicts, with logging for future analysis.
6.  **User Interface:** Provide clear UI elements for users to manage integrations, view sync status, and trigger manual syncs. A setup helper for the pronouns field is required.
7.  **Code Quality & Documentation:** Produce clean, well-structured, and maintainable code (TypeScript, React). Document all technical decisions, shortcuts, and trade-offs made for the prototype.

### Evaluation Criteria

*   **Technical Demonstration:** A live demo showcasing the bi-directional sync, real-time updates, error handling, and UI.
*   **Code Repository:** A clean, well-organized Git repository.
*   **Write-up:** A concise document explaining the architecture and implementation choices.

## 3. Scope Boundaries

*   **In-Scope (MVP):** All features listed under "MVP Deliverables." Focus on demonstrating core functionality and architectural soundness.
*   **Out-of-Scope (Future Enhancements):** Advanced features like field-level conflict resolution UI, enterprise-grade job queues (e.g., BullMQ), multi-secret HMAC rotation, and real-time monitoring dashboards are documented as future work but are not part of the initial 5-day implementation.
