import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    const users = await service.getAll();
    res.json(users);
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid user id" });
      return;
    }
    const user = await service.getById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  }

  async getByUsername(
    req: Request<{ username: string }>,
    res: Response,
  ): Promise<void> {
    const user = await service.getByUsername(req.params.username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message ?? "Invalid data" });
    }
  }

  async patch(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid user id" });
      return;
    }
    try {
      const updated = await service.patch(id, req.body);
      res.json(updated);
    } catch (err: any) {
      if (err.message === "User not found") {
        res.status(404).json({ message: err.message });
      } else {
        res.status(400).json({ message: err.message ?? "Invalid data" });
      }
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid user id" });
      return;
    }
    try {
      await service.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ message: "User not found" });
    }
  }
}
