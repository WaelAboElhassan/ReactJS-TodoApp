import * as api from "../api/index";

export const readTodos = async () => {
  try {
    const { data } = await api.readTodos();
    if (data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (todo) => {
  try {
    const { data } = await api.createTodo(todo);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (todo_id, todo) => {
  try {
    const { data } = await api.updateTodo(todo_id, todo);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeTodo = async (id) => {
  try {
    const { data } = await api.removeTodo(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
