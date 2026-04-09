## reposiotries

Repositories are the data access layer, where each repository class wraps a mongoose model and exposes clear methods.

- `findAll`, `findById`, `create`, `update`, `delete`

## Why we have repositories?

- Keeps all direct DB queries in one place.
- Services don't need to know about Mongoose API details
- Easier to change how data is stored without touching controller or services.
