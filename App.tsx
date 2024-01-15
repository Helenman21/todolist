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
  
  const [valueInput, setValueInput] = useState("");

  const onChangeInputHandler = (titleValueInput: string) => {
		setValueInput(titleValueInput)
  }
  
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
  return (
    <div className="App">
      <TodoList
        title={"What to learn"}
        tasks={tasks}
        onClickDeleteTask={deleteTask}
        addTask={addTask}
		  valueInput={valueInput}
		  onChangeInputHandler={onChangeInputHandler}
      />
    </div>
  );
}

export default App;
