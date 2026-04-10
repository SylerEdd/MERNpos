import { Request, Response } from "express";
import { TabService } from "../services/TabService";

const service = new TabService();

export class TabController {
  // request from the database and return all tables
  async getAll(req: Request, res: Response): Promise<void> {
    const tabs = await service.getAll();
    res.json(tabs);
  }

  // request from the dtabase and return a table with that ID
  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid tab id" });
      return;
    }
    const tab = await service.getById(id);
    if (!tab) {
      res.status(404).json({ error: "Tab not found" });
      return;
    }
    res.json(tab);
  }
  // create new table
  async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message ?? "Invalid data" });
    }
  }
  //update the table
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
      if (err.message === "Tab not found") {
        res.status(404).json({ message: err.message });
      } else {
        res.status(400).json({ message: err.message ?? "Invalid data" });
      }
    }
  }
  // delete table
  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "Invalid tab id" });
      return;
    }
    await service.delete(id);
    res.status(204).send();
  }
}
