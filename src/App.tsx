import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type filterType = "all" | "active" | "completed";

function App() {
  const tasks1 = [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "NextJS", isDone: false },
    { id: v1(), title: "Node", isDone: false },
  ];

  const [tasks, setTasks] = useState(tasks1);
  const [filter, setFilter] = useState<filterType>("all");

  const removeTasks = (id: string) => {
    const remove = tasks.filter((el) => el.id !== id);
    setTasks(remove);
  };

  let filterAction = tasks;
  if (filter === "active") {
    filterAction = tasks.filter((el) => el.isDone);
  }
  if (filter === "completed") {
    filterAction = tasks.filter((el) => !el.isDone);
  }

  const changeFilter = (value: filterType) => {
    setFilter(value);
  };

  const addTask = (newTask: string) => {
    let task = { id: v1(), title: newTask, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={filterAction}
        delete={removeTasks}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
