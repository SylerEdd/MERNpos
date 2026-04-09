## controller

Controllers are the http layer which translate between HTTP requests and service calls.

Responsibilities:

- Read data from `req.params`, `req.query`, and `req.body`.
- Call the appropriate service method
- Handle success and error responses

Controllers dont talk to mongoose directly. They call services and which calls repositories.

for example:

- `UserController` - handles `/api/users` endpoints.
- `RoleController` - handles `/api/roles`.
