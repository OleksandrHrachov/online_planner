import {
  TodoModel,
  deleteTodoById,
  getAllTodos,
  getTodoById,
} from "../db/todo";
import express from "express";
import events from "events";

const emmiter = new events.EventEmitter();
emmiter.setMaxListeners(20);

export const getTodos = async (req: express.Request, res: express.Response) => {
  try {
    const todosResult = await getAllTodos();

    return res.status(200).json(todosResult).end();
  } catch (error) {
    console.log("todos controller error getTodos =>", error);

    return res.sendStatus(500);
  }
};

export const createTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { checked, createdAt, date, description, time, title, updatedAt } =
      req.body;

    const newTodo = new TodoModel({
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
  } catch (error) {
    console.log("todos controller error createTodo =>", error);

    return res.sendStatus(500);
  }
};

export const updateTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { checked, createdAt, date, description, time, title, updatedAt } =
      req.body;

    const todo = await getTodoById(id);

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
  } catch (error) {
    console.log("todos controller error updateTodo =>", error);

    return res.sendStatus(500);
  }
};

export const deleteTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedTodo = await deleteTodoById(id);

    emmiter.emit("updateCalendarState", {
      type: "deleteTodo",
      todo: id,
    });

    return res.status(200).json(id).end();
  } catch (error) {
    console.log("todos controller error deleteTodo =>", error);

    return res.sendStatus(500);
  }
};

export const autoRefresh = (req: express.Request, res: express.Response) => {
  try {
    res.writeHead(200, {
      "Connection": "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });

    emmiter.on("updateCalendarState", (message) => {
      res.write(`data: ${JSON.stringify(message)} \n\n`);
    });
  } catch (error) {
    console.log("todos controller error autoRefresh =>", error)
  }
};
