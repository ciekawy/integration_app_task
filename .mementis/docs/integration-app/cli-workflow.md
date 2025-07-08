# Integration.app CLI (`membrane-cli`) Workflow

**Source:** User-provided instructions
**Discovered:** 2025-07-07T20:43:00Z

This document outlines the official, supported CLI workflow for managing Integration.app workspace configurations. This replaces the need for manual copy-pasting of YAML templates into the UI.

## 1. CLI Setup

1.  **Install CLI:**
    ```bash
    npm i -g @integration-app/membrane-cli
    ```
2.  **Initialize Config:** Run this once in the project root to generate `membrane.config.yml`.
    ```bash
    membrane init
    ```
    You will need to add your workspace key and secret to this file.

## 2. Core Workflow

The primary command is `membrane push`. This command recursively scans the current directory, finds all `.yaml` configuration files, and uploads them to the configured workspace.

-   **Full Push:**
    ```bash
    membrane push
    ```
-   **Push Specific Path:**
    ```bash
    membrane push --path integration-app/templates/hubspot-contacts.yaml
    ```
-   **Dry Run (Preview Changes):**
    ```bash
    membrane push --dry-run
    ```

## 3. How This Impacts Our Project

-   **Template Verification:** The manual verification step is now replaced with this CLI workflow. We can `push` our templates and then verify their functionality in the Integration.app console's "Run" tool.
-   **Idempotency:** The `push` command is idempotent, meaning we can re-run it safely. It will only update actions that have changed in our local YAML files, which is perfect for iterative development.
-   **Configuration as Code:** This allows us to treat our entire Integration.app configuration as code, which is a best practice. The `integration-app/` directory becomes the single source of truth.
-   **Security:** The `membrane.config.yml` file contains secrets and **must not** be committed to version control without redacting the credentials.
