import { Model, models, model, Schema, Document } from 'mongoose';

export interface IConflictLog extends Document {
  contactId: Schema.Types.ObjectId;
  provider: string;
  field: string;
  localValue: any;
  crmValue: any;
  resolutionStrategy: string;
  loggedAt: Date;
  customerId: string;
}

const ConflictLogSchema = new Schema<IConflictLog>({
  contactId: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  localValue: {
    type: Schema.Types.Mixed,
  },
  crmValue: {
    type: Schema.Types.Mixed,
  },
  resolutionStrategy: {
    type: String,
    required: true,
    default: 'crm_wins',
  },
  loggedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  customerId: {
    type: String,
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  collection: 'conflict_logs',
});

ConflictLogSchema.index({ customerId: 1, loggedAt: -1 });
ConflictLogSchema.index({ contactId: 1, provider: 1 });

const ConflictLog: Model<IConflictLog> = models.ConflictLog || model('ConflictLog', ConflictLogSchema);

export default ConflictLog;
