Below is a **navigation map** of every documentation section that can help with a bi-directional contact-sync prototype that uses Integration .app’s React / Node (JS) SDK, Membrane APIs, and drop-in UI.
I’m *only* listing page titles/paths—you can click into them later for details.

---

## 1. Overview & Quick-start Basics ([docs.integration.app][1], [docs.integration.app][2])

* **Overview**
* **Getting Started / Quick Start**

  * Front-end

    * *JavaScript SDK*
    * *React*

      * Hooks
      * UI Components
      * Data Input, Combobox, Portal Boundary
    * *Vue.js* (if you prefer)
    * **CSP Rules** (for embedded UI)
  * Back-end

    * *Using REST API*
  * **Self-Hosting**

    * Google Cloud Platform
    * AWS
    * Helm
    * System Webhooks

---

## 2. Membrane Core Concepts ([docs.integration.app][1], [docs.integration.app][2])

* **Membrane Overview**
* **Authentication**
* **External Apps**

  * Connectors
  * Connections
* **Interfaces**

  * Flows
  * Scenarios
  * Actions
  * Data Sources
  * Field Mappings
  * Data Links
  * Connecting Your App API
  * Internal Events & Data Schemas
  * API Operations
  * Data Collections / Data Records / Custom Fields
  * API Proxy
  * Files & Running Custom Code
* **Customers** (and all *Instance* pages)
* **Monitoring & Troubleshooting**

  * Logs (API Requests, External Event Pulls, External Events, External Webhooks, Flow Runs, Internal Events)
  * Webhook Notifications
* **Security & Privacy**
* **References**

  * Execution Context
  * Formulas
  * Data Schemas
  * Limits
  * Universal Data Models

---

## 3. Integration UI (drop-in & custom) ([docs.integration.app][1], [docs.integration.app][2])

* **Integration UI** (core page)
* **Integrations Catalog**

  * Custom List of Integrations
* **Connection UI**

  * Custom Connection UI
  * Connection UI *Without* the SDK
* **Integration UI** (single-integration view)

  * Custom Integration UI
* **Flows UI**

  * Custom Flow UI
  * Configure Flow Instance Parameters
  * Enable / Disable Flow Instances
* **Data Sources UI**

  * Custom Data Source UI
* **Field Mappings UI**

  * Custom Field Mapping UI
  * Field Mapping UI Using Components

---

## 4. Connector Builder (if you ever need a custom connector) ([docs.integration.app][1], [docs.integration.app][2])

* **Connector Builder**
* **Authentication**

  * Methods (Get Credentials, Make API Client, Refresh Credentials, Test)
  * Types (Client Credentials, Integration App Token, OAuth1, OAuth2, Auth Proxy)
* **API Specification**
* **Events**

  * Global Webhook
  * Webhook
* **Data Collections** (Events, Operations, List)
* **Operations**
* **Global Webhooks**
* **Methods**

  * JavaScript → API Client
  * Mapping
  * REST API Mapping

---

## 5. Use-Case Guides (ready-made recipes) ([docs.integration.app][1], [docs.integration.app][2])

* **Use Cases Overview**
* **Data Import**

  * Continuous Data Import
  * Import User-selected Data Collections
* **Pushing Data to External Apps**
* **Bi-directional Data Sync** ← *the most relevant guide*
* **AI-related** (Import Documents, Tools from External Apps, AI Agent, MCP)

---

### How to proceed

1. **Triage**: Start with *Overview → Quick Start*, then scan *React* and *JavaScript SDK* pages to wire the front-end.
2. **Model your data**: Read the *Membrane → Interfaces* subtree (Actions, Field Mappings, Data Links) plus *Bi-directional Data Sync* guide.
3. **UI polish**: Use the *Integration UI* section for drop-ins; fall back to hooks + UI Components when you need custom flows or mapping widgets.
4. **Operational concerns**: Keep the *Monitoring & Troubleshooting* and *Logs* pages handy for testing webhooks and sync jobs.

This index should spare you repeated hunting—open only what you need as you implement each layer.

[1]: https://docs.integration.app/docs/integration-ui-1 "Integration UI"
[2]: https://docs.integration.app/docs/react-1 "React"
