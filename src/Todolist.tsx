import React, {ChangeEvent, useState, KeyboardEvent, MouseEventHandler} from "react";
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
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterType
}

function TodoList(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            return props.addTask(newTaskTitle), setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError("Title is required");
        }
    }
    const onAllClickHandler = () => {
        props.filteredTasks('all')
    }
    const onActiveClickHandler = () => {
        props.filteredTasks('active')
    }
    const onCompletedClickHandler = () => {
        props.filteredTasks('completed')
    }


    return (
        <div>
            <h3 className="forHeader">{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>

                {
                    props.tasks.map(t => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        const onRemaneHandler = () => {
                            props.removeTask(t.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemaneHandler}>del
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>all</button>
                <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>completed</button>
            </div>
        </div>

    )
}

export default TodoList
