"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRouter = void 0;
const express_1 = require("express");
const RoleController_1 = require("../controller/RoleController");
exports.roleRouter = (0, express_1.Router)();
const controller = new RoleController_1.RoleController();
//.bind(controller) is necessary to ensure 'this' refers to the controller instance in the methods
exports.roleRouter.get("/", controller.getAll.bind(controller));
exports.roleRouter.get("/:id", controller.getById.bind(controller));
exports.roleRouter.post("/", controller.create.bind(controller));
exports.roleRouter.put("/:id", controller.update.bind(controller));
exports.roleRouter.delete("/:id", controller.delete.bind(controller));
exports.roleRouter.get("/name/:name", controller.getByName.bind(controller));
