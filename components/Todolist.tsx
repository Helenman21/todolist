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
}

export const TodoList: FC<TodoListPropsType> = ({title, tasks}) => {
		const tasksList: Array<JSX.Element> = tasks.map( task => {
			return(
				<li key={task.id}><input type="checkbox" checked={task.isDone}  /> <span>{task.title}</span></li>
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
                    <Button title="All" />
                    <Button title="Active"/>
                    <Button title="Completed"/>
                </div>

            </div>
		)
}