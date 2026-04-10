import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

const service = new RoleService();

export class RoleController {
  // request from the database and return all roles
  async getAll(req: Request, res: Response): Promise<void> {
    const roles = await service.getAll();
    res.json(roles);
  }

  // request from the database and return one role with that ID
  async getById(req: Request<{ id: number }>, res: Response): Promise<void> {
    const role = await service.getById(req.params.id);
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.json(role);
  }

  // request from the database and return one role with that name
  async getByName(
    req: Request<{ name: string }>,
    res: Response,
  ): Promise<void> {
    const role = await service.getByName(req.params.name);
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.json(role);
  }

  // create new role
  async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message ?? "Invalid data" });
    }
  }

  // update the role
  async update(req: Request<{ id: number }>, res: Response): Promise<void> {
    try {
      const updated = await service.update(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      if (err.message === "Role not found") {
        res.status(404).json({ message: err.message });
      } else {
        res.status(400).json({ message: err.message ?? "Invalid data" });
      }
    }
  }

  // delete role
  async delete(req: Request<{ id: number }>, res: Response): Promise<void> {
    try {
      await service.delete(req.params.id);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ message: "Role not found" });
    }
  }
}
