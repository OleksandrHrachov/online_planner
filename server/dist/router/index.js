"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const express_1 = __importDefault(require("express"));
const todosRouter_1 = require("./todosRouter");
exports.routers = express_1.default.Router();
exports.routers.use('/todos', todosRouter_1.todosRouter);
//# sourceMappingURL=index.js.map