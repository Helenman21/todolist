import React, { FC, useState } from "react"
import { Button } from "./Button"
import { FuLLInput } from "./FullInput"

export type TasksPropsType = {
	id: string
	title: string
	isDone: boolean
}
type TaskStatusFilterPropsType = "All" | "Active" | "Completed"

type TodoListPropsType = {
	title: String
	tasks: Array<TasksPropsType>
	onClickDeleteTask: (taskId: string) => void
	addTask: (task: string) => void
	valueInput: string
	onChangeInputHandler: (titleValueInput: string) => void
}


export const TodoList: FC<TodoListPropsType> = ({ title, 
																  tasks, 
																  onClickDeleteTask, 
																  addTask, 
																  valueInput, 
																  onChangeInputHandler 
																}) => {

	const [statusTask, setStatusTask] = useState<TaskStatusFilterPropsType>("All");

	const changeShowTask = (status: TaskStatusFilterPropsType) => {setStatusTask(status)};
	const onClickAddTask = () => {
		addTask(valueInput)
		onChangeInputHandler('')
	}	
	const onKeyPressAddTask = () => {
		addTask(valueInput)
		onChangeInputHandler('')
	}														
	const currentTasks = statusTask === "Active" ? tasks.filter(task => !task.isDone) :
								statusTask === "Completed" ? tasks.filter(task => task.isDone) :
								tasks;
	const isCurrentTask = currentTasks.length > 0
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
				<FuLLInput callback={onChangeInputHandler} 
							  onKeyPressAddTask = {onKeyPressAddTask} 
							  titleInput={valueInput}
				 />
				<Button onclickHandler={onClickAddTask} title={"+"} />
			</div>
			<ul>
				{isCurrentTask && tasksList}
				{!isCurrentTask && <span>Таких задач нет!</span>}
			</ul>
			<div>
				<Button title="All" onclickHandler={() => changeShowTask("All")} />
				<Button title="Active" onclickHandler={() => changeShowTask("Active")} />
				<Button title="Completed" onclickHandler={() => changeShowTask("Completed")} />
			</div>

		</div>
	)
}