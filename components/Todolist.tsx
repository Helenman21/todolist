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
	changeStatusTask: (taskId: string, isDone: boolean) => void
}


export const TodoList: FC<TodoListPropsType> = ({ title,
	tasks,
	onClickDeleteTask,
	addTask,
	changeStatusTask
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
			addTask(trimmedTaskTitle)
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

	

	const currentTasks: Array<TasksPropsType> = сhangefilterTasks(tasks, statusTask) || [];

	const isCurrentTask = currentTasks.length > 0;

	

	const tasksList: Array<JSX.Element> = currentTasks.map(task => {
		const onDeleteTaskHandler = () => { onClickDeleteTask(task.id) };
		const onChangeStatuseTaskHandler = (e: React.ChangeEvent<HTMLInputElement>) => { changeStatusTask(task.id, e.currentTarget.checked) }
		return (
			<li key={task.id}>
				<input type="checkbox" checked={task.isDone} onChange={onChangeStatuseTaskHandler} />
				<span className={task.isDone ? "task-done" : "task"} >{task.title}</span>
				<Button title="Х" onclickHandler={onDeleteTaskHandler} />
			</li>
		)
	})
	return (
		<div className="todo-list-class-name">
			<h3>{title}</h3>
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