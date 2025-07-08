# Membrane CLI Documentation

**Source:** https://www.npmjs.com/package/@integration-app/membrane-cli
**Cached:** 2025-07-08T09:19:00Z

## Installation

`npm install -g @integration-app/membrane-cli`

## Quick Start

-   `membrane init`: Initialize your membrane config.
-   `membrane pull`: Pull data from a workspace.
-   `membrane push`: Push data to a workspace.

## Configuration

The CLI uses a configuration file at `membrane.config.yml`.

## Connectors

-   Public connectors are pulled and pushed as `.yml` files.
-   Custom connectors have an additional `.zip` file with source code.
-   The `src` directory can be used for editing connector source code, and the CLI will handle zipping/unzipping.

## Version Control

`membrane.config.yml` contains secrets and should be excluded from version control.

## Key Insight & Directory Structure

The `membrane push` command relies on a strict, convention-based directory structure to discover and deploy workspace elements. It does **not** perform a simple recursive search for all `.yaml` files.

The CLI only recognizes a specific set of top-level folders within the `membrane/` directory. For our purposes, the most relevant are:

-   `membrane/integrations/`: This is where individual, reusable actions or integrations are placed. The CLI will load YAML files from subdirectories here.
-   `membrane/actions/`: A dedicated directory for workspace-level actions.
-   `membrane/flows/`: For flow definitions.
-   `membrane/scenarios/`: For scenario definitions.

There is **no** built-in support for a `membrane/interfaces/` directory.

### The Correct Approach for Our Use Case

Our `contacts-api.yaml` file defines a `type: http-endpoint`. In the context of Integration.app, this is considered a type of **Flow**. It's a flow of control that starts with an HTTP request and is routed to an action.

Therefore, to solve the deployment issue, the `contacts-api.yaml` file must be placed in the `membrane/flows/` directory. The CLI will then recognize it as a Flow, deploy it correctly, and the authentication error will be resolved.
