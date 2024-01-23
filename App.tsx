import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TodoList, TasksPropsType } from "./components/Todolist";

function App() {
  const [tasks, setTask] = useState<Array<TasksPropsType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "RestAPI", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);
  
 
  
  const deleteTask = (taskId: string) => {
    const newArray: Array<TasksPropsType> = tasks.filter(
      (task) => task.id !== taskId
    );
    setTask(newArray);
  };

  const addTask = (task: string) => {
    const newTask = { id: v1(), title: task, isDone: false };
    setTask([...tasks, newTask]);
  };

  const changeStatusTask = (taskId: string, isDone: boolean) => {
	const newStateTasks = tasks.map(task => task.id === taskId?  {...task, isDone} : task)
	setTask(newStateTasks)
  }
  return (
    <div className="App">
      <TodoList
        title={"What to learn"}
        tasks={tasks}
        onClickDeleteTask={deleteTask}
        addTask={addTask}
		  changeStatusTask={changeStatusTask}
      />
    </div>
  );
}

export default App;
