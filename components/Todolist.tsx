import React, {FC} from "react"
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

export const TodoList: FC<TodoListPropsType> = ({title, tasks, onClickDeleteTask}) => {
		const tasksList: Array<JSX.Element> = tasks.map( task => {
			return(
				<li key={task.id}>
					<input type="checkbox" checked={task.isDone}  /> 
					<span>{task.title}</span>
					<Button title="Х" onclickHandler={()=> onClickDeleteTask(task.id)} />
				</li>
			)
		})
		return (
			<div className="todo-list-class-name">
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title="+" />
                </div>
                <ul>
                   {tasksList}
                </ul>
                <div>
                    {/* <Button title="All" onclickHandler={() => onclickHandler("All")}/> */}
                    {/* <Button title="Active" onclickHandler={() => onclickHandler("Active")}/> */}
                    {/* <Button title="Completed" onclickHandler={() => onclickHandler("Active")}/> */}
                </div>

            </div>
		)
}