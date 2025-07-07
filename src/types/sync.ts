export type SyncStatus = 'synced' | 'error' | 'pending';
export type CrmProvider = 'hubspot' | 'pipedrive';

export interface SyncResult {
  success: boolean;
  error?: string;
  recordsProcessed: number;
  provider: CrmProvider;
}

export interface ConflictData {
  contactId: string;
  provider: CrmProvider;
  field: string;
  localValue: any;
  crmValue: any;
  timestamp: Date;
}
