import { useState } from "react";
import "./App.css";
import { TodoList, TasksPropsType } from "./components/Todolist";

function App() {
  const [tasks, setTask] = useState<Array<TasksPropsType>>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: true },
    { id: 4, title: "RestAPI", isDone: false },
    { id: 5, title: "GraphQL", isDone: false },
  ]);
  const [valueInput, setValueInput] = useState("");

  const onChangeInputHandler = (titleValueInput: string) => {
		setValueInput(titleValueInput)
  }
  let nextId = 6;
  const deleteTask = (taskId: number) => {
    const newArray: Array<TasksPropsType> = tasks.filter(
      (task) => task.id !== taskId
    );
    setTask(newArray);
  };
  const addTask = (task: string) => {
    const newTask = { id: nextId++, title: task, isDone: false };
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
