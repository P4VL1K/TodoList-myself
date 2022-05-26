import React from "react";
import './App.css';
import {FilterType} from "./App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filteredTasks: (value: FilterType) => void
}

function TodoList(props: TodolistPropsType) {
    return (
        <div>
            <h3 className="forHeader">{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                {
                    props.tasks.map( t =>  <li><input type="checkbox" checked={t.isDone}/>{t.title} <button onClick={ () => {props.removeTask(t.id)}}>del</button></li>)
                }
            </ul>
            <div>
                <button onClick={()=>{props.filteredTasks('all')}}>all</button>
                <button onClick={()=>{props.filteredTasks('active')}}>active</button>
                <button onClick={()=>{props.filteredTasks('completed')}}>completed</button>
            </div>

        </div>

    )
}

export default TodoList
