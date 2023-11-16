import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterType = 'all' | 'active' | 'completed'

function App() {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "NextJS", isDone: false},
        {id: 6, title: "Node", isDone: false}

    ]

    const [tasks, setTasks] = useState(tasks1);
    const [filter, setFilter] = useState<filterType>('all')

    const removeTasks = (id: number) => {
        const remove = tasks.filter((el) => el.id !== id)
        setTasks(remove)
    }

    let filterAction = tasks
    if (filter === 'active') {
        filterAction = tasks.filter((el) => el.isDone)
    }
    if (filter === 'completed') {
        filterAction = tasks.filter((el) => !el.isDone)
    }

    const changeFilter = (value: filterType) => {
        setFilter(value)
        console.log(value)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={filterAction} delete={removeTasks} changeFilter={changeFilter}/>

        </div>
    );
}

export default App;
