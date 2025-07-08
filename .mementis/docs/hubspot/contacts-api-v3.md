# HubSpot Contacts API v3 (Cached Documentation)

**Source:** https://developers.hubspot.com/docs/reference/api/crm/objects/contacts
**Fetched:** 2025-07-07T18:12:00Z

## Key Endpoints & Methods

### Basic CRUD

*   **`GET /crm/v3/objects/contacts`**: Retrieve all contacts.
    *   **Params:** `limit`, `archived`.
*   **`GET /crm/v3/objects/contacts/{contactId}`**: Retrieve a single contact by its ID.
    *   **Params:** `properties`, `archived`.
*   **`POST /crm/v3/objects/contacts`**: Create a single contact.
    *   **Body:** `{ "properties": { "firstname": "...", "lastname": "...", "email": "..." } }`
*   **`PATCH /crm/v3/objects/contacts/{contactId}`**: Update a contact by ID.
    *   **Body:** `{ "properties": { "firstname": "...", "lastname": "..." } }`
*   **`DELETE /crm/vv3/objects/contacts/{contactId}`**: Archive a contact by ID.

### Batch Operations

*   **`POST /crm/v3/objects/contacts/batch/create`**: Create a batch of contacts.
*   **`POST /crm/v3/objects/contacts/batch/read`**: Retrieve a batch of contacts by ID.
*   **`POST /crm/v3/objects/contacts/batch/update`**: Update a batch of contacts.
*   **`POST /crm/v3/objects/contacts/batch/archive`**: Archive a batch of contacts.
*   **`POST /crm/v3/objects/contacts/batch/upsert`**: Create or update a batch of contacts. This is a key operation for sync.
    *   **Body:** `{ "inputs": [ { "idProperty": "email", "properties": { ... } } ] }`
    *   Can use a custom `idProperty` for deduplication (e.g., `email`).

### Search

*   **`POST /crm/v3/objects/contacts/search`**: Search for contacts using filters, sorting, and associations.
    *   This is the preferred method for filtering by `lastmodifieddate`.
    *   **Body:** `{ "filterGroups": [ { "filters": [ { "propertyName": "lastmodifieddate", "operator": "GTE", "value": "..." } ] } ] }`

## Authentication & Scopes

*   **Auth:** OAuth 2.0 or Private Apps (API Key).
*   **Scopes:**
    *   `crm.objects.contacts.read` for reading contacts.
    *   `crm.objects.contacts.write` for creating, updating, and deleting contacts.

## Key Properties for Sync

*   `firstname`
*   `lastname`
*   `email`
*   `phone`
*   `jobtitle`
*   `lastmodifieddate` (Crucial for polling changes)
*   `createdate`
*   `hs_object_id` (The contact's unique ID)
*   `pronouns` (Our custom property, will need to be created if it doesn't exist)

## Implications for Our `hubspot-contacts.yaml`

1.  **List Action:** The `listContacts` action in our template uses `GET /crm/v3/objects/contacts`, but the documentation suggests `POST /crm/v3/objects/contacts/search` is better for filtering by `lastmodifieddate`. **This needs correction.**
2.  **Upsert Action:** The `upsertContact` action should use the batch upsert endpoint: `POST /crm/v3/objects/contacts/batch/upsert`. The current template is close but needs to be verified.
3.  **Field Mappings:** The property names (`firstname`, `lastname`, `email`, etc.) seem correct based on the documentation.
4.  **Custom Fields:** The documentation doesn't specify how to create custom fields via the API. We will need to look this up separately when we implement the "Pronouns Setup Script" in Epic 2.

This cached document provides the ground truth we need to validate and correct our HubSpot template.
