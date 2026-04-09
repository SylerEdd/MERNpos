## services

Services are business logic layer, It uses reposiotry to interact with the Database

---

They make rules such as:

- Cannot open a second order on the same tab if there is already open order.
- Can only add/remove items on orders with status `OPEN`.
- When items are added or removed recalculate the total amount.
