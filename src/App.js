import React, { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import {
  readTodos,
  createTodo,
  updateTodo,
  removeTodo,
} from "./functions/index";
function App() {
  const [todos, setTodos] = useState();
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readTodos();
      setTodos(data);
    };
    fetchData();
  }, [currentId, todos]);

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };

  useEffect(() => {
    const clearFeild = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearFeild);
    return () => window.removeEventListener("keydown", clearFeild);
  }, []);

  useEffect(() => {
    let currentTodo = currentId
      ? todos.find((todo) => todo._id === currentId)
      : { title: "", content: "" };
    setTodo(currentTodo);
  }, [currentId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!currentId) {
      const result = await createTodo(todo);

      setTodos([...todos, result]);
      clear();
    } else {
      await updateTodo({
        todo_id: currentId,
        ...todo,
      });

      clear();
    }
  };

  const deleteTodo = async (id) => {
    await removeTodo(id);
    clear();
  };

  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                value={todo.title}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input
                id="Description"
                type="text"
                className="validate"
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                value={todo.content}
              />
              <label htmlFor="Description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="btn waves-effect waves-light ">Submit</button>
          </div>
        </form>

        <ul className="list">
          {!todos ? (
            <Preloader />
          ) : todos.length > 0 ? (
            todos.map((i) => (
              <li
                key={i._id}
                className="collection-item"
                onClick={() => setCurrentId(i._id)}
              >
                <div className="row">
                  <p>{i.title}</p>
                  <a
                    href="#!"
                    className="secondary-content "
                    onClick={() => deleteTodo(i._id)}
                  >
                    <i className="material-icons">delete</i>
                  </a>
                  <article className="center-align">{i.content}</article>
                </div>
              </li>
            ))
          ) : (
            <p> nothing left </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
