import { getIntegrationClient } from '@/lib/integration-app-client';

/**
 * Checks if the custom 'pronouns' property exists in HubSpot for a given customer and creates it if it doesn't.
 * This is a one-time setup operation required for the bi-directional sync.
 * It will run for all active HubSpot connections for the customer.
 */
export async function setupHubSpotPronounsField(customerId: string): Promise<{ success: boolean; message: string }> {
  const integrationApp = await getIntegrationClient({ customerId, customerName: null });

  try {
    // Get all active HubSpot connections for the customer
    const connections = await integrationApp.connections.find({ integrationKey: 'hubspot' });

    if (connections.items.length === 0) {
      return { success: true, message: 'No active HubSpot connections found to set up.' };
    }

    // Loop through each connection to ensure the field is set up
    for (const connection of connections.items) {
      const connectionId = connection.id;

      try {
        // Step 1: Check if the property already exists for this connection
        await integrationApp.connectionRequest(connectionId, '/crm/v3/properties/contacts/pronouns', {
          method: 'GET',
        });
        console.log(`HubSpot 'pronouns' field already exists for connection ${connectionId}.`);
        
      } catch (error: any) {
        if (error.status !== 404) {
          throw new Error(`Failed to check for 'pronouns' field on connection ${connectionId}: ${error.message}`);
        }
        
        // A 404 means the property doesn't exist, so create it
        console.log(`'pronouns' field not found for connection ${connectionId}. Creating it now.`);
        
        await integrationApp.connectionRequest(connectionId, '/crm/v3/properties/contacts', {
          method: 'POST',
          data: {
            name: 'pronouns',
            label: 'Pronouns',
            type: 'string',
            fieldType: 'text',
            groupName: 'contactinformation',
            description: 'Preferred pronouns for the contact, synced from our application.',
          },
        });
        console.log(`Successfully created 'pronouns' field for connection ${connectionId}.`);
      }
    }

    return { success: true, message: "Successfully verified or created 'pronouns' field for all HubSpot connections." };
  } catch (error: any) {
    console.error('Error setting up HubSpot pronouns field:', error);
    return {
      success: false,
      message: `Failed to set up HubSpot pronouns field: ${error.message}`,
    };
  }
}
