import { Model, models, Schema, Document } from 'mongoose';

export type SyncStatus = 'synced' | 'error' | 'pending';
export type CrmProvider = 'hubspot' | 'pipedrive';

export interface IContactLink extends Document {
  contactId: Schema.Types.ObjectId;
  provider: CrmProvider;
  externalId: string;
  customerId: string;
  lastSyncedAt: Date;
  syncStatus: SyncStatus;
  lastError?: string;
  crmLastModified?: Date;
}

const ContactLinkSchema = new Schema<IContactLink>({
  contactId: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  provider: {
    type: String,
    enum: ['hubspot', 'pipedrive'],
    required: true,
  },
  externalId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
    index: true,
  },
  lastSyncedAt: {
    type: Date,
    required: true,
  },
  syncStatus: {
    type: String,
    enum: ['synced', 'error', 'pending'],
    required: true,
  },
  lastError: {
    type: String,
  },
  crmLastModified: {
    type: Date,
  },
}, {
  timestamps: true,
  collection: 'contact_links',
});

ContactLinkSchema.index({ customerId: 1, provider: 1, externalId: 1 }, { unique: true });
ContactLinkSchema.index({ customerId: 1, provider: 1, contactId: 1 }, { unique: true });

const ContactLink: Model<IContactLink> = models.ContactLink || Model('ContactLink', ContactLinkSchema);

export default ContactLink;