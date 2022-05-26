import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import './App.css';
import {FilterType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filteredTasks: (value: FilterType) => void
    addTask: (title: string) => void
}

function TodoList(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            return props.addTask(newTaskTitle), setNewTaskTitle('')
        }}
        const addTask = () => {
            return props.addTask(newTaskTitle), setNewTaskTitle('')
        }
        const onAllClickHandler = () => {props.filteredTasks('all')}
        const onActiveClickHandler = () => {props.filteredTasks('all')}
        const onCompletedClickHandler = () => {props.filteredTasks('all')}



        return (
            <div>
                <h3 className="forHeader">{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>

                    {
                        props.tasks.map(t => {

                            const onRemaneHandler = () => {
                                props.removeTask(t.id)
                            }

                            return <li key={t.id}><input type="checkbox" checked={t.isDone}/>{t.title}
                            <button onClick={onRemaneHandler}>del
                            </button>
                        </li>})
                    }
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>all
                    </button>
                    <button onClick={onActiveClickHandler}>active
                    </button>
                    <button onClick={onCompletedClickHandler}>completed
                    </button>
                </div>
            </div>

        )
    }

export default TodoList
