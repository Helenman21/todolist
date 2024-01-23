import React, { FC, useState } from "react"
import ts from "typescript"
import { Button } from "./Button"
import { FuLLInput } from "./FullInput"

export type TasksPropsType = {
	id: string
	title: string
	isDone: boolean
}

enum TaskStatusEnum { 
	allFilter = "All", 
	activeFilter = "Active",
	completedFilter = "Completed"
};

type TaskStatusFilterType = TaskStatusEnum.allFilter | TaskStatusEnum.activeFilter | TaskStatusEnum.completedFilter

type TodoListPropsType = {
	title: String
	tasks: Array<TasksPropsType>
	onClickDeleteTask: (taskId: string) => void
	addTask: (task: string) => void
	valueInput: string
	onChangeInputHandler: (titleValueInput: string) => void
	changeStatusTask: (taskId: string, isDone: boolean) => void
}


export const TodoList: FC<TodoListPropsType> = ({ title, 
																  tasks, 
																  onClickDeleteTask, 
																  addTask, 
																  valueInput, 
																  onChangeInputHandler, 
																  changeStatusTask 
																}) => {

	const [statusTask, setStatusTask] = useState<TaskStatusFilterType>(TaskStatusEnum.allFilter);

	const changeShowTask = (status: TaskStatusFilterType) => {setStatusTask(status)};

	const onClickAddTask = () => {
		addTask(valueInput)
		onChangeInputHandler('')
	}	

	const onKeyPressAddTask = () => {
		addTask(valueInput)
		onChangeInputHandler('')
	}	

	const сhangefilterTasks = (tasks: Array<TasksPropsType>, filter: TaskStatusFilterType) => {
		switch(filter) {
			case TaskStatusEnum.activeFilter:
			  return tasks.filter(task => !task.isDone);		 
			case TaskStatusEnum.completedFilter:  // if (x === 'value2')
			  return tasks.filter(task => task.isDone) 		 
			default:
			  return tasks
		 }
	}

	
	const currentTasks: Array<TasksPropsType> = сhangefilterTasks(tasks, statusTask) || [];

	const isCurrentTask = currentTasks.length > 0;

	const tasksList: Array<JSX.Element> = currentTasks.map(task => {
	const onDeleteTaskHandler = () => {onClickDeleteTask(task.id)};
	const onChangeStatuseTaskHandler = (e: React.ChangeEvent<HTMLInputElement>) => { changeStatusTask(task.id, e.currentTarget.checked)}
		return (
			<li key={task.id}>
				<input type="checkbox" checked={task.isDone} onChange={onChangeStatuseTaskHandler}/>
				<span>{task.title}</span>
				<Button title="Х" onclickHandler={onDeleteTaskHandler} />
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
				<Button title={TaskStatusEnum.allFilter} onclickHandler={() => changeShowTask(TaskStatusEnum.allFilter)} />
				<Button title={TaskStatusEnum.activeFilter} onclickHandler={() => changeShowTask(TaskStatusEnum.activeFilter)} />
				<Button title={TaskStatusEnum.completedFilter} onclickHandler={() => changeShowTask(TaskStatusEnum.completedFilter)} />
			</div>
		</div>
	)
}