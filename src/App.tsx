import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'coca cola', isDone: false},
        {id: v1(), title: 'mirinda', isDone: false},
        {id: v1(), title: 'sprite', isDone: true},
        {id: v1(), title: 'pepsi', isDone: true},
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

    const changeStatus = (taskID: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <TodoList
                title={'SODA'}
                tasks={filteredTasksButton}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    )
}

export default App;
