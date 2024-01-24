"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const todos_1 = require("../controllers/todos");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get('/', todos_1.getTodos);
exports.todosRouter.post('/', todos_1.createTodo);
exports.todosRouter.delete('/:id', todos_1.deleteTodo);
exports.todosRouter.patch('/:id', todos_1.updateTodo);
//# sourceMappingURL=todosRouter.js.map