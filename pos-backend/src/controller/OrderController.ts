import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

const service = new OrderService();

export class OrderController {
  //GET /api/orders
  async getAll(req: Request, res: Response): Promise<void> {
    const orders = await service.getAll();
    res.json(orders);
  }

  // GET /api/orders/Lid
  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid order id" });
      return;
    }

    const order = await service.getById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  }

  // GET /api/orders/:id/items
  async getItems(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid order id" });
      return;
    }

    try {
      const items = await service.getItems(id);
      res.json(items);
    } catch (error: any) {
      if (error.message === "Order not found") {
        res.status(404).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: error.message ?? "Internal server error" });
      }
    }
  }

  // POST /api/orders
  async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ error: error.message ?? "Invalid data" });
    }
  }

  // PUT /api/orders/:id
  async update(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid order id" });
      return;
    }

    try {
      const updated = await service.update(id, req.body);
      res.json(updated);
    } catch (error: any) {
      if (error.message === "Order not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message ?? "Invalid data" });
      }
    }
  }

  // POST /api/orders/:id/items
  async addItem(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid order id" });
      return;
    }

    try {
      const updated = await service.addItem(id, req.body);
      res.json(updated);
    } catch (error: any) {
      if (
        error.message === "Order not found" ||
        error.message === "Menu item not found"
      ) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message ?? "Invalid data" });
      }
    }
  }
  // DELETE /api/order/:id/items
  async removeItem(
    req: Request<{ id: string; itemId: string }>,
    res: Response,
  ): Promise<void> {
    const id = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    if (!Number.isFinite(id) || !Number.isFinite(itemId)) {
      res.status(400).json({ message: "Invalid order id or item id" });
      return;
    }

    try {
      const updated = await service.removeItem(id, itemId);
      res.json(updated);
    } catch (error: any) {
      if (
        error.message === "Order not found" ||
        error.message === "Order item not found"
      ) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message ?? "Invalid data" });
      }
    }
  }

  // PUT /api/orders/:id/items/:itemId
  async updateItem(
    req: Request<{ id: string; itemId: string }>,
    res: Response,
  ): Promise<void> {
    const id = Number(req.params.id);
    const itemId = Number(req.params.itemId);

    if (!Number.isFinite(id) || !Number.isFinite(itemId)) {
      res.status(400).json({ message: "Invalid order id or item id" });
      return;
    }

    try {
      const updated = await service.updateItem(id, itemId, req.body);
      res.json(updated);
    } catch (error: any) {
      if (
        error.message === "Order not found" ||
        error.message === "Order item not found" ||
        error.message === "Menu item not found"
      ) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message ?? "Invalid data" });
      }
    }
  }

  // DELETE /api/orders/:id
  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid order id" });
      return;
    }
    await service.delete(id);
    res.status(204).send();
  }

  // PUT /api/orders/:id
  async updateStatus(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid order id" });
      return;
    }
    try {
      const updated = await service.updateStatus(id, req.body.status);
      res.json(updated);
    } catch (error: any) {
      if (error.message === "Order not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message ?? "Invalid data" });
      }
    }
  }
}
