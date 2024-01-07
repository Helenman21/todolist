
import './App.css';
import { TodoList, TasksPropsType } from './components/Todolist';

function App() {
	const task: Array<TasksPropsType> = [
		{ id: 2, title: "HTML&CSS", isDone: true },
		{ id: 2, title: "JS", isDone: true },
		{ id: 2, title: "React", isDone: true },
	]

	return (
		<div className="App" >
			<TodoList title={"What to learn"} tasks={task} />
			<TodoList title={"What to read"} tasks={task} />
			<TodoList title={"What to buy"} tasks={task} />

		</div>
	);
}




export default App;
