import React, { useState } from "react";
import { filterType } from "./App";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  changeFilter: (value: filterType) => void;
  delete: (id: string) => void;
  tasks: Array<TaskType>;
  addTask: (newTask: string) => void;
  title: string;
};

export function Todolist(props: PropsType) {
  const [inputValue, setInputValue] = useState("");

  const addTasksHandler = () => {
    props.addTask(inputValue);
    setInputValue("");
  };

  const allFilterHandler = () => {
    props.changeFilter("all");
  };
  const activeFilterHandler = () => {
    props.changeFilter("active");
  };
  const completedFilterHandler = () => {
    props.changeFilter("completed");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <Input
          type={"text"}
          inputValue={inputValue}
          setInputValue={setInputValue}
          callback={addTasksHandler}
        />
        <Button name={"+"} callback={addTasksHandler} />
      </div>
      <ul>
        {props.tasks.map((el) => {
          const deleteTasks = () => {
            props.delete(el.id);
          };
          return (
            <li key={el.id}>
              <Input
                type={"checkbox"}
                task={el.isDone}
                title={el.title}
                setInputValue={() => {}}
              />
              <Button name={"x"} callback={deleteTasks} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button name={"All"} callback={allFilterHandler} />
        <Button name={"Active"} callback={activeFilterHandler} />
        <Button name={"Completed"} callback={completedFilterHandler} />
      </div>
    </div>
  );
}
