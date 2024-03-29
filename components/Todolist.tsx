import React, { FC, useState } from "react"
import ts from "typescript"
import { Button } from "./Button"
import { CheckboxComponent } from "./Checkbox"
import { FuLLInput } from "./FullInput"

export type TasksPropsType = {
	id: string
	title: string
	isDone: boolean
}

export enum TaskStatusEnum {
	allFilter = "All",
	activeFilter = "Active",
	completedFilter = "Completed"
};

export type TaskStatusFilterType = TaskStatusEnum.allFilter | TaskStatusEnum.activeFilter | TaskStatusEnum.completedFilter

type TodoListPropsType = {
	title: String
	tasks: Array<TasksPropsType>
	onClickDeleteTask: (todolistId: string, taskId: string) => void
	addTask: (todolistId: string, task: string) => void
	changeStatusTask: (todolistId: string, taskId: string, isDone: boolean) => void
	todolistId: string
	removeTodoList: (todolistId: string) => void
}


export const TodoList: FC<TodoListPropsType> = ({ title,
	tasks,
	onClickDeleteTask,
	addTask,
	changeStatusTask,
	todolistId,
	removeTodoList
}) => {

	const [statusTask, setStatusTask] = useState<TaskStatusFilterType>(TaskStatusEnum.allFilter);

	const [error, setError] = useState(false);

	const [valueInput, setValueInput] = useState("");

	const onChangeInputHandler = (titleValueInput: string) => {
		 if(error)setError(false);	
		 setValueInput(titleValueInput)
	}

	const changeShowTask = (status: TaskStatusFilterType) => { setStatusTask(status) };

	const classButtonAll = statusTask === TaskStatusEnum.allFilter ? "filter-active-button" : "button";

	const classButtonActive = statusTask === TaskStatusEnum.activeFilter ? "filter-active-button" : "button";

	const classButtonCompleted = statusTask === TaskStatusEnum.completedFilter ? "filter-active-button" : "button";

	const classInput = error ? "task-input-error" : "";

	const classButtonAddTaskIsDisable = error ? "disable-button" : "";

	const messageError = "некорректное значение"

	const addNewTask = () => {
		const trimmedTaskTitle = valueInput.trim()
		if (trimmedTaskTitle) {
			console.log(trimmedTaskTitle)
			addTask(todolistId, trimmedTaskTitle)
			onChangeInputHandler('')
		} else {	
			setError(true)
		}

	}
	 
	const onClickAddTaskHandler = () => {
		addNewTask()
	}

	const onKeyPressAddTaskHandler = () => {
		addNewTask()
	}

	const onRemoveTodoListHandler = () => {
		removeTodoList(todolistId)
	}
	
	const сhangefilterTasks = (tasks: Array<TasksPropsType>, filter: TaskStatusFilterType) => {
		switch (filter) {
			case TaskStatusEnum.activeFilter:
				return tasks.filter(task => !task.isDone);
			case TaskStatusEnum.completedFilter:  // if (x === 'value2')
				return tasks.filter(task => task.isDone)
			default:
				return tasks
		}
	}
	const onChangeStatuseTaskHandler = (isDone: boolean, taskId: string) => { changeStatusTask(todolistId, taskId, isDone) }
	

	const currentTasks: Array<TasksPropsType> = сhangefilterTasks(tasks, statusTask) || [];

	const isCurrentTask = currentTasks.length > 0;

	

	const tasksList: Array<JSX.Element> = currentTasks.map(task => {
		const onDeleteTaskHandler = () => { onClickDeleteTask(todolistId, task.id) };
		
		return (
			<li key={task.id}>
				{/* <input type="checkbox" checked={task.isDone} onChange={onChangeStatuseTaskHandler} /> */}
				<CheckboxComponent checked={task.isDone} onChange={(isDone) => {onChangeStatuseTaskHandler(isDone, task.id)}}/>
				<span className={task.isDone ? "task-done" : "task"} >{task.title}</span>
				<Button title="Х" onclickHandler={onDeleteTaskHandler} />
			</li>
		)
	})
	return (
		<div className="todo-list-class-name">
			<h3>
				{title}
				<Button onclickHandler={onRemoveTodoListHandler} title={'х'} />
			</h3>
			<div>
				<FuLLInput callback={onChangeInputHandler}
								onKeyPressAddTask={onKeyPressAddTaskHandler}
								titleInput={valueInput}
								classInput={classInput}
				/>
				{error && <p>{messageError}</p>}
				<Button onclickHandler={onClickAddTaskHandler} title={"+"} classes={classButtonAddTaskIsDisable} isDisable={error} />
			</div>
			<ul>
				{isCurrentTask && tasksList}
				{!isCurrentTask && <span>Таких задач нет!</span>}
			</ul>
			<div className="buttons-filter-block" >
				<Button classes={classButtonAll} title={TaskStatusEnum.allFilter} onclickHandler={() => changeShowTask(TaskStatusEnum.allFilter)} />
				<Button classes={classButtonActive} title={TaskStatusEnum.activeFilter} onclickHandler={() => changeShowTask(TaskStatusEnum.activeFilter)} />
				<Button classes={classButtonCompleted} title={TaskStatusEnum.completedFilter} onclickHandler={() => changeShowTask(TaskStatusEnum.completedFilter)} />
			</div>
		</div>
	)
}