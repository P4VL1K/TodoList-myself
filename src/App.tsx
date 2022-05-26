import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'coca cola', isDone: false},
        {id: 2, title: 'fanta', isDone: false},
        {id: 3, title: 'sprite', isDone: true},
        {id: 4, title: 'schweppes', isDone: true},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter( t => t.id !== id))
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
            <TodoList title={'SODA'} tasks={filteredTasksButton} removeTask={removeTask} filteredTasks={filteredTasks}/>
        </div>
    )
}

export default App;
