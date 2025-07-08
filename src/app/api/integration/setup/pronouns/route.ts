import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/server-auth';
import { setupHubSpotPronounsField } from '@/lib/crm/hubspot/setup-helper';
import { setupPipedrivePronounsField } from '@/lib/crm/pipedrive/setup-helper';

export async function POST(request: NextRequest) {
  const auth = getAuthFromRequest(request);

  if (!auth.customerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const customerId = auth.customerId;
  const results = [];

  try {
    const hubspotResult = await setupHubSpotPronounsField(customerId);
    results.push({ provider: 'hubspot', ...hubspotResult });
  } catch (error: any) {
    results.push({ provider: 'hubspot', success: false, message: error.message });
  }

  try {
    const pipedriveResult = await setupPipedrivePronounsField(customerId);
    results.push({ provider: 'pipedrive', ...pipedriveResult });
  } catch (error: any) {
    results.push({ provider: 'pipedrive', success: false, message: error.message });
  }

  const allSuccessful = results.every(r => r.success);

  return NextResponse.json(
    {
      message: allSuccessful ? 'Pronouns setup completed for all providers.' : 'Pronouns setup encountered errors.',
      results,
    },
    { status: allSuccessful ? 200 : 500 }
  );
}
