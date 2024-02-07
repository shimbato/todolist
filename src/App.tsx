import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type filterType = "all" | "active" | "completed";

export type todolistType = {
  id: string;
  title: string;
  filter: filterType;
};

export type taakObjectType = {
  [key: string]: TaskType[];
};

function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();

  let [todolist, setTodolist] = useState<Array<todolistType>>([
    { id: todolistID1, title: "What to learn", filter: "active" },
    { id: todolistID2, title: "What to buy", filter: "completed" },
  ]);

  const [tasksObj, setTasks] = useState<taakObjectType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "NextJS", isDone: false },
      { id: v1(), title: "Node", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "milk", isDone: false },
      { id: v1(), title: "water", isDone: true },
    ],
  });
  // const [filter, setFilter] = useState<filterType>("all");

  const removeTasks = (id: string, todolistId: string) => {
    let todolistTasks = tasksObj[todolistId];
    tasksObj[todolistId] = todolistTasks.filter((el) => el.id !== id);
    setTasks({ ...tasksObj });
  };

  const addTask = (newTask: string, todolistId: string) => {
    let task = { id: v1(), title: newTask, isDone: false };
    let tasks = tasksObj[todolistId];

    tasksObj[todolistId] = [task, ...tasks];
    setTasks({ ...tasksObj });
  };
  const changeFilter = (value: filterType, todolistId: string) => {
    let todolists = todolist.find((tl) => tl.id === todolistId);
    if (todolists) {
      todolists.filter = value;
      setTodolist([...todolist]);
    }
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ) => {
    // достаем нужный масив из todolistId
    let todolistTasks = tasksObj[todolistId];

    //находим нужную таску
    let task = todolistTasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    //засетаем в стейт копию обьекта, чтоб реакт среагировал
    setTasks({ ...tasksObj });
  };

  const deleteTodolist = (todolistId: string) => {
    let filteredDeleteTodolist = todolist.filter((t) => t.id !== todolistId);
    setTodolist(filteredDeleteTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  return (
    <div className="App">
      {todolist.map((t) => {
        let tasks = tasksObj[t.id];
        let filterAction = tasks;
        if (t.filter === "active") {
          filterAction = tasks.filter((el) => el.isDone);
        }
        if (t.filter === "completed") {
          filterAction = tasks.filter((el) => !el.isDone);
        }

        return (
          <Todolist
            key={t.id}
            id={t.id}
            title={t.title}
            tasks={filterAction}
            delete={removeTasks}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={t.filter}
            deleteTodolist={deleteTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
