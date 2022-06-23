import React, {useState} from 'react';
import './App.css';
import TodoList from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists,setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'coca cola', isDone: false},
            {id: v1(), title: 'mirinda', isDone: false},
            {id: v1(), title: 'sprite', isDone: true},
            {id: v1(), title: 'pepsi', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'orange', isDone: false},
            {id: v1(), title: 'bela cola', isDone: true},
        ]
    })

    const removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasksArr = [newTask, ...tasks]
        tasksObj[todolistId] = newTasksArr
        setTasksObj({...tasksObj})
    }

    const filteredTasks = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeStatus = (taskID: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }



    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTasksButton = tasksObj[tl.id]
                    if (tl.filter === 'completed') {
                        filteredTasksButton = filteredTasksButton.filter(t => t.isDone === true)
                    }
                    if (tl.filter === 'active') {
                        filteredTasksButton = filteredTasksButton.filter(t => t.isDone === false)
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasksButton}
                        removeTask={removeTask}
                        filteredTasks={filteredTasks}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    )
}

export default App;
