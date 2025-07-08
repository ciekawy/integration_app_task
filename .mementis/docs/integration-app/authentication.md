# Integration.app Connector Authentication

**Source:** https://console.integration.app/docs/connector-builder/authentication
**Cached:** 2025-07-08T09:14:00Z

## Authentication Spec Structure

Authentication is part of the connector definition and is specified in the `auth` field.

```yaml
auth:
  # The type of authentication
  type: client-credentials  # or oauth2, oauth1, proxy, integration-app-token

  # User interface configuration
  ui:
    # Schema defining what inputs to request from users
    schema:
      type: object
      properties:
        apiKey:
          type: string
          title: "API Key"

    # Help URL with more information
    helpUri: "https://docs.example.com/api-authentication"

  # Method implementations
  makeApiClient:
    implementationType: mapping
  refreshCredentials:
    implementationType: javascript
  test:
    implementationType: javascript

  # Different authentication options/variants
  options:
    option1:
      type: client-credentials
      title: "Option 1"
    option2:
      type: oauth2
      title: "Option 2"
```

## Authentication Types

-   **Client Credentials**: For simple API keys, basic auth, etc.
-   **OAuth2**: Standard third-party authorization.
-   **OAuth1**: Older, signature-based protocol.
-   **Proxy**: Delegates authentication to another connector.
-   **Integration App Token**: Uses integration.app's built-in JWT system for internal or aware services.

## Key Insight for Our Project

The error "Integration doesn't have authentication configured" arises because our individual actions are not associated with an app or interface that defines an `auth` block.

The solution is to create a parent `http-endpoint` interface that defines the `auth` method (in our case, `integration-app-token`) and then links to the individual actions. The `membrane push` command needs to find this interface file in the correct directory to deploy it.

The search results did not reveal a definitive directory structure. The npmjs page for the CLI mentions a `membrane/` directory, which we are already using for the split action files. It's possible that interfaces should live at the root of this directory or in a subdirectory like `membrane/interfaces`.

Given the CLI's recursive nature, placing the `contacts-api.yaml` file in `integration-app/interfaces/` *should* have worked, but it clearly didn't. This suggests a specific structure is expected.

The most logical next step is to try placing the interface file directly in the `membrane/` directory, as this is the primary directory the CLI manages.
