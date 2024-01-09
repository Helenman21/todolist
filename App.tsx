
import { useState } from 'react';
import './App.css';
import { TodoList, TasksPropsType } from './components/Todolist';

function App() {
	const [tasks, setTask ]= useState ([
		{ id: 1, title: "HTML&CSS", isDone: true },
		{ id: 2, title: "JS", isDone: true },
		{ id: 3, title: "React", isDone: true },
		{ id: 4, title: 'RestAPI', isDone: false},
		{ id: 5, title: 'GraphQL', isDone: false},
	])
const deleteTask = (taskId: number) => {
	const newArray: Array<TasksPropsType> = tasks.filter(task => task.id !== taskId) 
	setTask(newArray)
}
	return (
		<div className="App" >
			<TodoList title={"What to learn"} tasks={tasks} onClickDeleteTask={deleteTask} />
		

		</div>
	);
}




export default App;
