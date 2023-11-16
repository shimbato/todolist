import React from 'react';
import {filterType} from "./App";
import {Button} from "./components/Button";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    changeFilter: (value: filterType) => void
    delete: (id: number) => void
    tasks: Array<TaskType>
    title: string
}

export function Todolist(props: PropsType) {


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el) =>
                <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}
                    <button onClick={() => props.delete(el.id)}>x</button></span></li>
            )}
        </ul>
        <div>
            <Button name={'All'} callback={() => props.changeFilter('all')}/>
            <Button name={'Active'} callback={() => props.changeFilter('active')}/>
            <Button name={'Active'} callback={() => props.changeFilter('completed')}/>

            {/*<Button/>*/}

            {/*<button onClick={() => props.changeFilter('all')}>All</button>*/}
            {/*<button onClick={() => props.changeFilter('active')}>Active</button>*/}
            {/*<button onClick={() => props.changeFilter('completed')}>Completed</button>*/}
        </div>
    </div>
}
