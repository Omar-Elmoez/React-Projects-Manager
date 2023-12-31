// import { useRef } from "react";

import { useContext, useState } from "react";
import { TaskContext } from "../store/task-context";
import { ProjectContext } from "../store/project-context";

export default function NewTask() {

  const { addTask } = useContext(TaskContext);
  const { selectedProjectId } = useContext(ProjectContext)

  // const task = useRef();
  const [task, setTask] = useState("");

  const inputChangeHandler = (e) => {
    setTask(e.target.value)
  }

  const clickButtonHandler = () => {
    if (task.trim() === "") {
      return;
    }
    addTask(selectedProjectId, task);
    setTask("")
  }

  return (
    <div className="space-x-4">
      {/* <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" ref={task} /> */}
      {/* <button className="text-stone-700 hover:text-stone-950" onClick={() => onAddingTask(task.current.value)}>Add Task</button> */}
      <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" value={task} onChange={inputChangeHandler} />
      <button className="text-stone-700 hover:text-stone-950" onClick={clickButtonHandler}>Add Task</button>
    </div>
  );
}