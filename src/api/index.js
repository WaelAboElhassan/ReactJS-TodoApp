import axios from "axios";

const url = "https://todo-app-201021.herokuapp.com/api/v1/todos";

export const readTodos = () => axios.get(url);

export const createTodo = (newTodo) =>
  axios.post(`${url}/create-todo`, newTodo);

export const updateTodo = (todo) => axios.put(`${url}/edit-todo`, todo);

export const removeTodo = (todo_id) => {
  axios.delete(`${url}/remove-todo`, { data: { todo_id } });
};
