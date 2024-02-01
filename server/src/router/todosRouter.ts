import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo, autoRefresh } from '../controllers/todos';

export const todosRouter = express.Router();
todosRouter.get('/', getTodos);
todosRouter.post('/', createTodo);
todosRouter.delete('/:id', deleteTodo);
todosRouter.patch('/:id', updateTodo);
todosRouter.get('/connection', autoRefresh);