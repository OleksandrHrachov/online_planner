"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = require("../db/todo");
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
        return res.status(200).json(id).end();
    }
    catch (error) {
        console.log("todos controller error deleteTodo =>", error);
        return res.sendStatus(500);
    }
};
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todos.js.map