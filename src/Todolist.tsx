import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { filterType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  changeFilter: (value: filterType, todolistId: string) => void;
  delete: (id: string, todolistId: string) => void;
  tasks: Array<TaskType>;
  addTask: (newTask: string, todolistId: string) => void;
  title: string;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ) => void;
  filter: filterType;
  deleteTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const [inputValue, setInputValue] = useState("");

  const [error, setError] = useState<string | null>(null);
  const addTasksHandler = () => {
    if (inputValue.trim() !== "") {
      props.addTask(inputValue.trim(), props.id);
      setInputValue("");
    } else {
      setError("title is required!");
    }
  };

  const allFilterHandler = () => {
    props.changeFilter("all", props.id);
  };
  const activeFilterHandler = () => {
    props.changeFilter("active", props.id);
  };
  const completedFilterHandler = () => {
    props.changeFilter("completed", props.id);
  };

  const deleteTodolist = () => {
    props.deleteTodolist(props.id);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <button onClick={deleteTodolist}>X</button>
      <div>
        <Input
          type={"text"}
          inputValue={inputValue}
          setInputValue={setInputValue}
          callback={addTasksHandler}
          setError={setError}
          className={error ? "error" : ""}
        />
        <Button name={"+"} callback={addTasksHandler} />
      </div>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {props.tasks.map((el) => {
          const deleteTasks = () => {
            props.delete(el.id, props.id);
            console.log("delete", props.delete(el.id, props.id));
          };
          const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const isChecked = event.currentTarget.checked;
            props.changeTaskStatus(el.id, isChecked, props.id);
          };

          return (
            <li key={el.id} className={el.isDone ? "is-done" : ""}>
              <input
                type={"checkbox"}
                checked={el.isDone}
                onChange={onChangeHandler}
              />
              <span>{el.title}</span>
              <Button name={"x"} callback={deleteTasks} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          className={props.filter === "all" ? "active-filter" : ""}
          name={"All"}
          callback={allFilterHandler}
        />
        <Button
          className={props.filter === "active" ? "active-filter" : ""}
          name={"Active"}
          callback={activeFilterHandler}
        />
        <Button
          className={props.filter === "completed" ? "active-filter" : ""}
          name={"Completed"}
          callback={completedFilterHandler}
        />
      </div>
    </div>
  );
}
