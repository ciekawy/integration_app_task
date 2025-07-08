# Integration.app SDK & API - Documentation Map

This document provides the official links to the Integration.app documentation, including the critical SDK API reference.

## 1. High-Level Documentation

-   **Overview & Quick-start:** [https://docs.integration.app](https://docs.integration.app)
-   **Authentication:** [https://docs.integration.app/docs/authentication](https://docs.integration.app/docs/authentication)
-   **Action Configuration (YAML):** [https://docs.integration.app/docs/actions](https://docs.integration.app/docs/actions)

## 2. SDK API Reference (v1.14.0) - CRITICAL

This is the source of truth for all client-side SDK methods.

-   **Full SDK Module Index (Primary Reference):**
    -   **URL:** [https://console.integration.app/ref/sdk/index.html](https://console.integration.app/ref/sdk/index.html)

-   **Key Classes:**
    -   **`IntegrationAppClient` (High-Level):**
        -   **URL:** [https://console.integration.app/ref/sdk/classes/IntegrationAppClient.html](https://console.integration.app/ref/sdk/classes/IntegrationAppClient.html)
    -   **`IntegrationAppApiClient` (Low-Level):**
        -   **URL:** [https://console.integration.app/ref/sdk/classes/_integration-app_sdk.IntegrationAppApiClient.html](https://console.integration.app/ref/sdk/classes/_integration-app_sdk.IntegrationAppApiClient.html)

-   **Key Interfaces:**
    -   **`IntegrationAppClientOptions`:**
        -   **URL:** [https://console.integration.app/ref/sdk/interfaces/_integration-app_sdk.IntegrationAppClientOptions.html](https://console.integration.app/ref/sdk/interfaces/_integration-app_sdk.IntegrationAppClientOptions.html)

---
**Workflow:** When implementing client-side logic that uses `@integration-app/sdk`, refer to the **Full SDK Module Index** to find the correct methods and types (e.g., `client.action('key').apply(...)`). For YAML configurations, refer to the high-level documentation.
