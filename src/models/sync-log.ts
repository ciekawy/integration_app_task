import { Model, models, model, Schema, Document } from 'mongoose';

export type SyncOperation = 'sync-from-crm' | 'sync-to-crm' | 'manual-sync';
export type SyncStatus = 'success' | 'failed' | 'partial';

export interface ISyncLog extends Document {
  operation: SyncOperation;
  provider: string;
  status: SyncStatus;
  timestamp: Date;
  errorDetails?: string;
  recordsProcessed: number;
  customerId: string;
}

const SyncLogSchema = new Schema<ISyncLog>({
  operation: {
    type: String,
    enum: ['sync-from-crm', 'sync-to-crm', 'manual-sync'],
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'partial'],
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  errorDetails: {
    type: String,
  },
  recordsProcessed: {
    type: Number,
    required: true,
    default: 0,
  },
  customerId: {
    type: String,
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  collection: 'sync_logs',
});

SyncLogSchema.index({ customerId: 1, timestamp: -1 });
SyncLogSchema.index({ provider: 1, timestamp: -1 });

const SyncLog: Model<ISyncLog> = models.SyncLog || model('SyncLog', SyncLogSchema);

export default SyncLog;
