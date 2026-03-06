import { Request, Response } from "express";
import { MenuItemService } from "../services/menuItemService";

const service = new MenuItemService();

export class MenuItemController {
  async getAll(req: Request, res: Response): Promise<void> {
    const items = await service.getAll();
    res.json(items);
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const item = await service.getById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    res.json(item);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message ?? "Invalid data" });
    }
  }
}
