# Pipedrive PersonFields API v1 - Summary

**Source:** https://developers.pipedrive.com/docs/api/v1/PersonFields
**Fetched:** 2025-07-07T20:02:00Z

This document contains a focused summary of the Pipedrive API v1 for managing **PersonFields** (custom fields for contacts). This is necessary because the v2 API does not yet support custom field management.

## 1. Key Endpoints

### `GET /v1/personFields`
-   **Description:** Returns data about all person fields.
-   **Usage:** Used to check if our custom "pronouns" field already exists by iterating through the results and checking the `key`.

### `POST /v1/personFields`
-   **Description:** Adds a new person field.
-   **Usage:** Used to create the "pronouns" custom field if it does not exist.
-   **Key Body Parameters:**
    -   `name` (string, required): The human-readable name of the field (e.g., "Pronouns").
    -   `field_type` (string, required): The type of the field. For a simple text field, `varchar` is the correct value.

## 2. Valid `field_type` values for text:
-   `varchar`: Text (up to 255 characters)
-   `text`: Long text (up to 65k characters)

## 3. Implications for our `setup-helper.ts`
- The current implementation in `src/lib/crm/pipedrive/setup-helper.ts` is **correct**.
- It correctly uses the `GET` endpoint to check for the field's existence.
- It correctly uses the `POST` endpoint with the payload `{ name: 'Pronouns', field_type: 'varchar' }` to create the field.
