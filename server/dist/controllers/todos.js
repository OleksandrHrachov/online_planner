"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRefresh = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = require("../db/todo");
const events_1 = __importDefault(require("events"));
const emmiter = new events_1.default.EventEmitter();
emmiter.setMaxListeners(20);
const getTodos = async (req, res) => {
    try {
        const todosResult = await (0, todo_1.getAllTodos)();
        return res.status(200).json(todosResult).end();
    }
    catch (error) {
        console.log("todos controller error getTodos =>", error);
        return res.sendStatus(500);
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const { checked, createdAt, date, description, time, title, updatedAt } = req.body;
        const newTodo = new todo_1.TodoModel({
            checked,
            createdAt,
            date,
            description,
            time,
            title,
            updatedAt,
        });
        const savedTodo = await newTodo.save();
        emmiter.emit("updateCalendarState", {
            type: "createTodo",
            todo: savedTodo,
        });
        return res.status(200).json(savedTodo).end();
    }
    catch (error) {
        console.log("todos controller error createTodo =>", error);
        return res.sendStatus(500);
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { checked, createdAt, date, description, time, title, updatedAt } = req.body;
        const todo = await (0, todo_1.getTodoById)(id);
        if (!todo) {
            return res.sendStatus(400);
        }
        todo.checked = checked;
        todo.createdAt = createdAt;
        todo.date = date;
        todo.description = description;
        todo.time = time;
        todo.title = title;
        todo.updatedAt = updatedAt;
        const updatedTodo = await todo.save();
        emmiter.emit("updateCalendarState", {
            type: "updateTodo",
            todo: updatedTodo,
        });
        return res.status(200).json(updatedTodo).end();
    }
    catch (error) {
        console.log("todos controller error updateTodo =>", error);
        return res.sendStatus(500);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await (0, todo_1.deleteTodoById)(id);
        emmiter.emit("updateCalendarState", {
            type: "deleteTodo",
            todo: id,
        });
        return res.status(200).json(id).end();
    }
    catch (error) {
        console.log("todos controller error deleteTodo =>", error);
        return res.sendStatus(500);
    }
};
exports.deleteTodo = deleteTodo;
const autoRefresh = (req, res) => {
    try {
        res.writeHead(200, {
            "Connection": "keep-alive",
            'Content-Encoding': 'none',
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
        });
        emmiter.on("updateCalendarState", (message) => {
            res.write(`data: ${JSON.stringify(message)} \n\n`);
        });
    }
    catch (error) {
        console.log("todos controller error autoRefresh =>", error);
    }
};
exports.autoRefresh = autoRefresh;
//# sourceMappingURL=todos.js.map