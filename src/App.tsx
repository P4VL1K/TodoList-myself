import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'Task 1', isDone: false},
        {id: v1(), title: 'Task 2', isDone: false},
        {id: v1(), title: 'Task 3', isDone: true},
        {id: v1(), title: 'Task 4', isDone: true},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: string) => {
        setTasks(tasks.filter( t => t.id !== id))
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasksArr = [newTask, ...tasks]
        setTasks(newTasksArr)
    }

    const filteredTasks = (value: FilterType) => {
        setFilter(value)
    }

    let filteredTasksButton = tasks
    if (filter === 'completed') {
        filteredTasksButton = tasks.filter( t => t.isDone === true)
    }
    if (filter === 'active') {
        filteredTasksButton = tasks.filter( t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList title={'SODA'} tasks={filteredTasksButton} removeTask={removeTask} filteredTasks={filteredTasks} addTask={addTask}/>
        </div>
    )
}

export default App;
