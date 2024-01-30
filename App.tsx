import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TodoList, TasksPropsType, TaskStatusFilterType, TaskStatusEnum } from "./components/Todolist";
export type TypeTasks = {
	[key: string]: Array<TasksPropsType>
}
type TypeTodoLists = {
	id: string, title: string, filter: TaskStatusFilterType,
}
function App() {
	const idTasksWhatToLearn = v1();
	const idTasksWhatToBuy = v1();

	const [tasks, setTasks] = useState <TypeTasks>({
		[idTasksWhatToLearn]: [
											{id: v1(), title: "HTML&CSS", isDone: true},
											{id: v1(), title: "JS", isDone: true},
											{id: v1(), title: "ReactJS", isDone: false},
											{id: v1(), title: "Rest API", isDone: false},
											{id: v1(), title: "GraphQL", isDone: false},
									],
		[idTasksWhatToBuy]: [
										{id: v1(), title: "Milk", isDone: true},
										{id: v1(), title: "Honey", isDone: true},
										{id: v1(), title: "Butter", isDone: false},
										{id: v1(), title: "Coffee", isDone: false},
										{id: v1(), title: "Tea", isDone: false},
								],							
	})
	const [todoLists, setTodoLists] = useState <Array<TypeTodoLists>>([
		{id: idTasksWhatToLearn, title: "What to learn", filter: TaskStatusEnum.allFilter},
		{id: idTasksWhatToBuy, title: "What to buy", filter: TaskStatusEnum.allFilter}
	])
  const deleteTask = (todolistId: string, taskId: string) => {
    const newArray = tasks[todolistId].filter(
      (task) => task.id !== taskId
    );
    setTasks({...tasks, [todolistId]: newArray});
  };

  const addTask = (todolistId: string,task: string) => {
    const newTask = { id: v1(), title: task, isDone: false };
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
  };

  const changeStatusTask = (todolistId: string,taskId: string, isDone: boolean) => {
	// const newStateTasks = tasks.map(task => task.id === taskId?  {...task, isDone} : task)
	setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId?  {...task, isDone} : task) })
  }
  return (
    <div className="App">
		{todoLists.map( todolist => {
			return(
				<TodoList
				key={todolist.id}
				title={"What to learn"}
				tasks={tasks[todolist.id]}
				onClickDeleteTask={deleteTask}
				addTask={addTask}
				changeStatusTask={changeStatusTask}
				todolistId={todolist.id}
			 />
			)
		}
		)}

    </div>
  );
}

export default App;
