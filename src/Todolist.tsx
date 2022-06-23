import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import './App.css';
import {FilterType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filteredTasks: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) =>void
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
            return props.addTask(newTaskTitle, props.id),
                setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(),props.id)
            setNewTaskTitle('')
        } else {
            setError("Title is required");
        }
    }
    const onAllClickHandler = () => {
        props.filteredTasks('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.filteredTasks('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.filteredTasks('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3 className="forHeader">{props.title} <button onClick={removeTodolist}>x</button></h3>
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
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onRemaneHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemaneHandler}>del
                            </button>
                        </div>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>all
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>completed
                </button>
            </div>
        </div>

    )
}

export default TodoList
