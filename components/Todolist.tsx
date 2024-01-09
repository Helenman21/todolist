import { type } from "@testing-library/user-event/dist/type"
import React, { FC, useState } from "react"
import { Button } from "./Button"

export type TasksPropsType = {
	id: number
	title: string
	isDone: boolean
}

type TodoListPropsType = {
	title: String
	tasks: Array<TasksPropsType>
	onClickDeleteTask: (taskId: number) => void
}
type TaskStatusPropsType = "All" | "Active" | "Completed"

export const TodoList: FC<TodoListPropsType> = ({ title, tasks, onClickDeleteTask }) => {
	const [statusTask, setStatusTask] = useState("All");

	const changeShowTask = (status: TaskStatusPropsType) => {setStatusTask(status)};

	const currentTasks = statusTask === "Active" ? tasks.filter(task => !task.isDone) :
								statusTask === "Completed" ? tasks.filter(task => task.isDone) :
								tasks;
								
	const tasksList: Array<JSX.Element> = currentTasks.map(task => {
		return (
			<li key={task.id}>
				<input type="checkbox" checked={task.isDone} />
				<span>{task.title}</span>
				<Button title="Х" onclickHandler={() => onClickDeleteTask(task.id)} />
			</li>
		)
	})
	return (
		<div className="todo-list-class-name">
			<h3>{title}</h3>
			<div>
				<input />
				<Button title="+" />
			</div>
			<ul>
				{tasksList}
			</ul>
			<div>
				<Button title="All" onclickHandler={() => changeShowTask("All")} />
				<Button title="Active" onclickHandler={() => changeShowTask("Active")} />
				<Button title="Completed" onclickHandler={() => changeShowTask("Completed")} />
			</div>

		</div>
	)
}