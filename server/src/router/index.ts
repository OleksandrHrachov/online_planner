import express from 'express';
import { todosRouter } from './todosRouter';

export const routers = express.Router();
routers.use('/todos', todosRouter);
