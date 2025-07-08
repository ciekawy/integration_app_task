import { getIntegrationClient } from '@/lib/integration-app-client';

// This is the key for the custom field in Pipedrive.
// In a real application, this would not be hardcoded but stored after creation.
// For the prototype, we assume a fixed key after the first run.
const PRONOUNS_FIELD_KEY = 'pronouns'; // This will be the key we use in our templates.

/**
 * Checks if the custom 'pronouns' property exists in Pipedrive and creates it if it doesn't.
 * It will run for all active Pipedrive connections for the customer.
 */
export async function setupPipedrivePronounsField(customerId: string): Promise<{ success: boolean; message: string }> {
  const integrationApp = await getIntegrationClient({ customerId, customerName: null });

  try {
    const connections = await integrationApp.connections.find({ integrationKey: 'pipedrive' });

    if (connections.items.length === 0) {
      return { success: true, message: 'No active Pipedrive connections found to set up.' };
    }

    for (const connection of connections.items) {
      const connectionId = connection.id;

      // Step 1: Check if the 'PersonField' already exists.
      // We will list all person fields and check for one with our key.
      const fields = await integrationApp.connectionRequest(connectionId, '/v1/personFields', {
        method: 'GET',
      });
      
      const existingField = fields.data?.find((field: any) => field.key === PRONOUNS_FIELD_KEY);

      if (existingField) {
        console.log(`Pipedrive 'pronouns' field already exists for connection ${connectionId}.`);
      } else {
        // A 404 means the property doesn't exist, so create it
        console.log(`'pronouns' field not found for connection ${connectionId}. Creating it now.`);
        
        await integrationApp.connectionRequest(connectionId, '/v1/personFields', {
          method: 'POST',
          data: {
            name: 'Pronouns',
            field_type: 'varchar', // Varchar is a standard text field
          },
        });
        console.log(`Successfully created 'pronouns' field for connection ${connectionId}.`);
      }
    }

    return { success: true, message: "Successfully verified or created 'pronouns' field for all Pipedrive connections." };
  } catch (error: any) {
    console.error('Error setting up Pipedrive pronouns field:', error);
    return {
      success: false,
      message: `Failed to set up Pipedrive pronouns field: ${error.message}`,
    };
  }
}
