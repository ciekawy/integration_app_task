# Integration.app SDK - API Request Execution

**Source:** [IntegrationAppClient Class Reference](https://console.integration.app/ref/sdk/classes/IntegrationAppClient.html)
**Discovered:** 2025-07-07T19:54:00Z

## Key Insight: The `connectionRequest` Method

The primary way to make arbitrary API calls to an external service (like HubSpot or Pipedrive) through an established connection is by using the `connectionRequest` method on the `IntegrationAppClient`.

Previous assumptions about using `.action().run()` or `.action().apply()` to execute YAML-defined actions from the client-side were incorrect. The YAML action definitions are used by the Integration.app backend, not directly invoked from the client SDK.

## Correct Execution Pattern

1.  **Get the `IntegrationAppClient`**:
    ```typescript
    const integrationApp = await getIntegrationClient({ customerId, customerName: null });
    ```

2.  **Get the `connectionId`**: You must first know the ID of the specific connection you want to use. This can be retrieved by listing the user's connections.
    ```typescript
    const connections = await integrationApp.connections.find({ provider: 'hubspot' });
    const connectionId = connections.items[0].id; // Example: using the first one
    ```

3.  **Execute the Request**: Use the `connectionRequest` method with the `connectionId`, the API `uri`, and an optional `data` payload.
    ```typescript
    await integrationApp.connectionRequest(connectionId, '/crm/v3/properties/contacts/pronouns', {
      method: 'GET' 
    });
    ```

## Example Implementation

```typescript
// Correct way to make a raw API request through a connection:
const connections = await integrationApp.connections.find({ provider: 'hubspot' });
if (connections.items.length > 0) {
  const connectionId = connections.items[0].id;

  await integrationApp.connectionRequest(
    connectionId, 
    '/crm/v3/properties/contacts', 
    {
      method: 'POST',
      data: {
        name: 'pronouns',
        label: 'Pronouns',
        type: 'string',
        // ... etc
      }
    }
  );
}
```

## Implications

-   This is a fundamental shift in our implementation approach for the `setup-helper` and `CrmClient` classes.
-   Instead of trying to run a named action, we will be making direct, provider-specific API calls using `connectionRequest`.
-   This makes our cached API documentation for HubSpot and Pipedrive even more critical, as we need the exact paths and request bodies.
