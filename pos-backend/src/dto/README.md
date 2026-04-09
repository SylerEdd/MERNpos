## dto (Data Transfer Objects)

DTOs are the shape of the data that enters and leaves the API.

for example, controller expects create requests in `req.body` for creating resources. And services return responses to the controller and the controller sends back as JSON file.

## Why use DTOs

- They make validation and documentation easier because the expected shapes are clear. and we can change the database schema withouth breaking the clients, as long as the DTOs stay compatible.
