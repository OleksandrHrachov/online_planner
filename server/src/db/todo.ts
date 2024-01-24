import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {type: 'string', required: true},
  description: {type: 'string'},
  date: {type: 'string', required: true},
  time: {type: 'string'},
  createdAt: {type: 'string'},
  updatedAt: {type: 'string'},
  checked: {type: 'boolean', required: true},
});

export const TodoModel = mongoose.model('todo', TodoSchema);

export const getAllTodos = () => TodoModel.find();
export const getTodoById = (id: string) => TodoModel.findById(id);
export const deleteTodoById = (id: string) => TodoModel.findOneAndDelete({_id: id});
