## routes

Routes define the URL structure of the API and connect them to controllers and middleware

Each routes file:

- Creates an express `Router`.
- Wires HTTP verbs and paths to controller methods.
- Applies middleware like authentication and RBAC
