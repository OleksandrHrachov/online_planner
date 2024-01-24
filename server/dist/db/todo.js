"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.getTodoById = exports.getAllTodos = exports.TodoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'string', required: true },
    time: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    checked: { type: 'boolean', required: true },
});
exports.TodoModel = mongoose_1.default.model('todo', TodoSchema);
const getAllTodos = () => exports.TodoModel.find();
exports.getAllTodos = getAllTodos;
const getTodoById = (id) => exports.TodoModel.findById(id);
exports.getTodoById = getTodoById;
const deleteTodoById = (id) => exports.TodoModel.findOneAndDelete({ _id: id });
exports.deleteTodoById = deleteTodoById;
//# sourceMappingURL=todo.js.map