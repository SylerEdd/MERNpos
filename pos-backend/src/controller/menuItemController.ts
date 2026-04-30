import { Request, Response } from "express";
import { MenuItemService } from "../services/menuItemService";

const service = new MenuItemService();

export class MenuItemController {
  //GET /api/menu-item
  async getAll(req: Request, res: Response): Promise<void> {
    const items = await service.getAll();
    res.json(items);
  }

  //GET /api/menu-item/:id
  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const idNum = Number(req.params.id);
    if (Number.isNaN(idNum)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }
    const item = await service.getById(idNum);
    if (!item) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    res.json(item);
  }
  // POST /api/menu-item
  async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message ?? "Invalid data" });
    }
  }
    //update menu item
    async update(req: Request<{ id: string }>, res: Response): Promise<void> {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: "Invalid tab id" });
        return;
      }
      try {
        const updated = await service.update(id, req.body);
        res.json(updated);
      } catch (err: any) {
        if (err.message === "Menu item not found") {
          res.status(404).json({ message: err.message });
        } else {
          res.status(400).json({ message: err.message ?? "Invalid data" });
        }
      }
    }
    // delete menu item
    async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        res.status(400).json({ error: "Invalid menu item id" });
        return;
      }
      await service.delete(id);
      res.status(204).send();
    }
}
