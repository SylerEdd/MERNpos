import { TabRepository } from "../repositories/TabRepository";
import { CreateTabRequest } from "../dto/tab/CreateTabRequest";
import { TabResponse } from "../dto/tab/TabResponse";
import { ITab } from "../entities/Tab";
import { TableStatus } from "../enums/TableStatus";

const repo = new TabRepository();

// maps the tab to response
function toResponse(entity: ITab): TabResponse {
  return {
    id: entity.id,
    tableNumber: entity.tableNumber,
    tableStatus: entity.tableStatus,
    createdAt: entity.createdAt!.toISOString(),
  };
}

export class TabService {
  // returns all tables
  async getAll(): Promise<TabResponse[]> {
    const tabs = await repo.findAll();
    return tabs.map(toResponse);
  }

  //returns a table by id
  async getById(id: number): Promise<TabResponse | null> {
    const tab = await repo.findById(id);
    return tab ? toResponse(tab) : null;
  }

  // creates a table
  async create(request: CreateTabRequest): Promise<TabResponse> {
    if (!request.tableNumber) {
      throw new Error("Table number is required");
    }
    const created = await repo.create(request);
    return toResponse(created);
  }

  // updates a table
  async update(id: number, request: CreateTabRequest): Promise<TabResponse> {
    if (!request.tableNumber) {
      throw new Error("Table number is required");
    }
    const updated = await repo.update(id, request);
    if (!updated) {
      throw new Error("Tab not found");
    }
    return toResponse(updated);
  }
  // deletes a table
  async delete(id: number): Promise<void> {
    await repo.delete(id);
  }

  // update the table status
  async updateStatus(
    id: number,
    tableStatus: TableStatus,
  ): Promise<TabResponse> {
    if (!Object.values(TableStatus).includes(tableStatus)) {
      throw new Error("Invalid table status");
    }
    const updated = await repo.updateStatus(id, tableStatus);
    if (!updated) throw new Error("Tab not found");
    return toResponse(updated);
  }
}
