# Pipedrive Persons API v2 - Summary

**Source:** `.mementis/docs/pipedrive/pipedrive_openapi-v2.yaml`
**Extracted:** 2025-07-07T19:11:00Z

This document contains a focused summary of the Pipedrive API v2, specifically for the **Persons** object, to aid in the creation of our Integration.app template.

## 1. Object Definition

-   **Persons**: These are your contacts, the customers you are doing deals with. Each person can belong to an organization.

## 2. Key Endpoints for Person Sync

### `GET /persons`
-   **Operation ID:** `getPersons`
-   **Description:** Returns data about all persons.
-   **Key Parameters for Sync:**
    -   `updated_since`: (string, RFC3339) The most important filter for polling changes.
    -   `limit`: (integer, max 500) For pagination.
    -   `cursor`: (string) For cursor-based pagination, which is more performant.
    -   `sort_by`: Can sort by `id`, `update_time`, `add_time`.

### `POST /persons`
-   **Operation ID:** `addPerson`
-   **Description:** Adds a new person.
-   **Key Body Fields:**
    -   `name` (string, required)
    -   `owner_id` (integer)
    -   `org_id` (integer)
    -   `email` (array of objects: `{ "value": "...", "primary": true/false, "label": "..." }`)
    -   `phone` (array of objects: `{ "value": "...", "primary": true/false, "label": "..." }`)

### `GET /persons/{id}`
-   **Operation ID:** `getPerson`
-   **Description:** Returns details of a specific person.

### `PATCH /persons/{id}`
-   **Operation ID:** `updatePerson`
-   **Description:** Updates the properties of a person.
-   **Key Body Fields:** Same as `POST /persons`.

### `DELETE /persons/{id}`
-   **Operation ID:** `deletePerson`
-   **Description:** Marks a person as deleted.

### `GET /persons/search`
-   **Operation ID:** `searchPersons`
-   **Description:** Searches persons by `term` and `fields`. Useful for finding a person by email before an upsert.
-   **Key Parameters:**
    -   `term` (string, required)
    -   `fields` (string, comma-separated, e.g., `email,name`)
    -   `exact_match` (boolean)

## 3. Custom Fields ("Pronouns")

-   **CRITICAL NOTE:** The v2 OpenAPI spec **does not** include endpoints for managing `PersonFields` (custom fields).
-   As per the `pipedrive-docs-map.md`, creating and managing custom fields like "pronouns" requires using the **v1 API endpoint for `PersonFields`**.
-   This means our "Pronouns Setup Script" will need to make a separate, authenticated call to the v1 API.

## 4. Implications for `pipedrive-persons.yaml` Template

1.  **List Action:** The `listContacts` action will use the `GET /persons` endpoint, filtering with `updated_since` and using `cursor` pagination.
2.  **Upsert Logic:** Pipedrive does not have a native batch `upsert` endpoint for persons like HubSpot does. Our "upsert" will be a two-step process in the `ContactSyncService`:
    a. First, use `GET /persons/search` with the person's email to see if they exist.
    b. If they exist, use `PATCH /persons/{id}` to update.
    c. If they do not exist, use `POST /persons` to create.
3.  **Field Mappings:**
    -   `name` is a single field in Pipedrive, unlike HubSpot's `firstname` and `lastname`.
    -   `email` and `phone` are arrays of objects. We will need to map our simple string fields to this structure, likely taking the first entry.
    -   The `pronouns` field will map to the `key` of the custom field we create using the v1 API.

This summary provides the necessary details to build the Pipedrive template accurately.
