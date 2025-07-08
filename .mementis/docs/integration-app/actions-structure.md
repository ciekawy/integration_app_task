# Integration.app Actions Structure (Cached Documentation)

**Source:** https://docs.integration.app/docs/actions  
**Fetched:** 2025-07-07T18:07:00Z

## Key Points

### Action Structure
Actions represent single requests/queries to external applications. Each action has:

- **`name`** – human-readable name for UI
- **`key`** – unique identifier for SDK/API reference
- **`inputSchema`** – Data Schema for payload validation
- **`type`** – Action Type (see below)
- **`config`** – implementation details (depends on type)
- **`outputSchema`** - expected output (usually auto-generated)

### Action Types for Data Collections
- `list-data-records` - List records in a data collection
- `find-data-record-by-id` - Find record by ID
- `search-data-record` - Search by query string
- `match-data-record` - Find record with matching fields
- `create-data-record` - Create new record
- `update-data-record` - Update existing record
- `find-or-create-data-record` - Match + create with optional Data Links
- `delete-data-record` - Delete by ID

### Example Action (Create Task)
```yaml
name: Create Task
key: create-task
inputSchema:
  type: object
  properties:
    title:
      type: string
    description:
      type: string
type: create-data-record
config:
  dataSource:
    collectionKey: issues
  fieldMapping:
    defaultValue:
      summary:
        $var: $.input.title
      description:
        $var: $.input.description
```

### External API Actions
- `connector-operation` - Use API Operations from current connector
- `api-request-to-external-app` - Raw API requests with auto-auth

### Internal API Actions
- `api-request-to-your-app` - Requests to your Internal API

### Custom Code Actions
- `run-javascript` - Execute arbitrary JavaScript/TypeScript

## Implications for Our Contact Sync

**CRITICAL:** Our current YAML templates are WRONG. We need to:
1. Define individual actions (listContacts, createContact, etc.)
2. Use proper action types (`list-data-records`, `create-data-record`, etc.)
3. Configure `dataSource` and `fieldMapping` correctly
4. Test each action individually

**Next Steps:**
- Restructure contact sync actions using correct format
- Verify against Integration.app workspace
- Test individual actions before building sync engine
