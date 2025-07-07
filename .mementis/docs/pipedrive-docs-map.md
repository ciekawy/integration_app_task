Below is a **navigation map + quick-risk assessment** for the Pipedrive developer docs that matter when you build a two-way **contact (Person) sync**.
I’m **not copying any doc content**—just giving you the page titles/paths so you can jump straight to them.

---

## 1. Foundations & “How the API works”

| Why you’ll open it                                            | Doc section / page                                                         |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| General concepts, auth flows, terminology                     | **Getting Started** → *About the Pipedrive API* ([pipedrive.readme.io][1]) |
| OAuth vs. token, scopes                                       | **Authentication** (OAuth 2.0 overview, scopes)                            |
| REST basics (headers, HTTPS, JSON)                            | **Requests** ([pipedrive.readme.io][2])                                    |
| **Rate limits** (token-based system rolling out Mar–May 2025) | **Rate Limiting** ([pipedrive.readme.io][3])                               |
| Pagination flavors (offset & cursor)                          | **Pagination** ([pipedrive.readme.io][4])                                  |
| HTTP codes, date formats                                      | **Responses**, **HTTP status codes**                                       |

---

## 2. CRM Object APIs — *Persons* (your “contacts”)

| Need                                | Doc section / page                                                      |
| ----------------------------------- | ----------------------------------------------------------------------- |
| CRUD + list + cursor-paginated list | **Persons API – v2** (under *API Reference*) ([pipedrive.readme.io][5]) |
| Search by email / term              | **Persons → search** (v2) ([developers.pipedrive.com][6])               |
| Batch endpoints / followers         | Persons followers (v2) ([developers.pipedrive.com][7])                  |
| Custom contact fields               | **PersonFields** (still only v1) ([developers.pipedrive.com][8])        |

---

## 3. Change Detection

| Need                                              | Doc section / page                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| Real-time “person created/updated/deleted” events | **Guide for Webhooks v2** + **List of Webhooks v2** ([pipedrive.readme.io][9]) |
| Legacy webhook docs (if you fall back)            | **Guide for Webhooks (v1)** ([pipedrive.readme.io][10])                        |
| Migration pointers                                | **Webhooks v2 migration guide** ([pipedrive.readme.io][11])                    |

---

## 4. Versioning & Migration Guides

| Doc                                                                                          | Why it matters                                      |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **API v2 overview** ([pipedrive.readme.io][5])                                               | Lists which APIs are already v2 (Persons included). |
| **API v2 migration guide** ([pipedrive.readme.io][12])                                       | Diff tables & tips if you ever down-shift to v1.    |
| **Changelog – “API v2 endpoints now stable”** (Mar 13 2025) ([developers.pipedrive.com][13]) | Confirms v2 left beta, lower token costs.           |

---

## 5. Performance & Large-data helpers

| What                        | Doc section / page                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| High-volume exports         | “Introducing cursor-paginated Persons endpoints” (July 28 2023) ([developers.pipedrive.com][14]) |
| API usage optimisation tips | **Guide for Optimizing API Usage**                                                               |

---

### Brief v1 vs v2 Recommendation

| Criterion                            | v2                                                                                                | v1                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |c
| **Availability of Person endpoints** | ✅ (`/api/v2/persons`, cursor list, search, CRUD)                                                  | ✅                                                       |
| **Performance / pagination**         | Faster, cursor first.                                                                             | Offset-based, slower for big datasets.                  |
| **Rate-limit token cost**            | Lower per call.                                                                                   | Higher.                                                 |
| **Stability status**                 | Marked *stable* as of Mar 13 2025.                                                                | Legacy; deprecations start when v2 counterpart appears. |
| **Missing pieces**                   | A few peripheral endpoints (e.g., some filters, person-field metadata) still v1-only—you can mix. | Full surface but older patterns.                        |

**Verdict:** use **v2 for the core contact sync** (list/search/create/update/delete persons) and fall back to the remaining v1 endpoints only when you truly need them (e.g., fetching custom-field metadata). v2 is now GA-level stable, gives you cursor pagination and cheaper token costs, and aligns with the new token-based rate-limit scheme. Just watch:

* **Rate-limit timing:** token-based quotas hit legacy accounts March – May 2025; bake in back-off logic early. ([pipedrive.readme.io][3])
* **Webhook cap:** 40 webhooks per user—plan one consolidated webhook for all person events. ([pipedrive.readme.io][15])

That’s everything you need bookmarked—open each page only when the implementation milestone calls for it.

[1]: https://pipedrive.readme.io/docs/core-api-concepts-about-pipedrive-api "About the Pipedrive API - Getting started"
[2]: https://pipedrive.readme.io/docs/core-api-concepts-requests "Requests - Getting started"
[3]: https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting "Rate limiting"
[4]: https://pipedrive.readme.io/docs/core-api-concepts-pagination "Pagination - Getting started"
[5]: https://pipedrive.readme.io/docs/pipedrive-api-v2 "Pipedrive API v2 overview"
[6]: https://developers.pipedrive.com/docs/api/v1/Persons "GET /api/v2/persons/:id/followers - Pipedrive Developers Corner"
[7]: https://developers.pipedrive.com/changelog/post/releasing-new-api-v-2-endpoints-for-followers "Releasing new API v2 endpoints for followers"
[8]: https://developers.pipedrive.com/docs/api/v1/PersonFields "PersonFields - Pipedrive API Reference and Documentation"
[9]: https://pipedrive.readme.io/docs/guide-for-webhooks-v2 "Guide for Webhooks v2"
[10]: https://pipedrive.readme.io/docs/guide-for-webhooks "Guide for Webhooks - Getting started"
[11]: https://pipedrive.readme.io/docs/webhooks-v2-migration-guide "Webhooks v2 migration guide - Getting started"
[12]: https://pipedrive.readme.io/docs/pipedrive-api-v2-migration-guide "Pipedrive API v2 migration guide - Getting started"
[13]: https://developers.pipedrive.com/changelog/post/apiv2-endpoints-now-stable-improved-performance-lower-token-costs "API v2 endpoints now stable: improved performance & lower token ..."
[14]: https://developers.pipedrive.com/changelog/post/introducing-2-new-cursor-paginated-codegetcode-endpoints-for-persons-and-organizations-api "Introducing 2 new cursor-paginated GET endpoints for Persons and ..."
[15]: https://pipedrive.readme.io/docs/guide-for-webhooks-v2 "Guide for Webhooks v2 - Getting started"
