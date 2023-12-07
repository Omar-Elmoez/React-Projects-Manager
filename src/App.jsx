import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState] = useState({
    projects: [],
    tasks: [],
    // undefined means => you don't select any project and you are not going to add a new one.
    selectedProjectId: undefined,
  });

  const startaddingProjectHandler = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        // null means => you are going to add a new one.
        selectedProjectId: null,
      };
    });
  };

  const addingNewProjectHandler = (projectData) => {
    setProjectState((prevState) => {
      const newProject = {
        id: Math.random(),
        ...projectData,
      };
      return {
        ...prevState,
        // projects: [...prevState.projects, createdProject]
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const cancelHandler = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const selectProjectHandler = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  // const removeProjectHandler = (id) => {
  //   setProjectState((prevState) => {
  //     return {
  //       ...prevState,
  //       projects: prevState.projects.filter((p) => p.id !== id),
  //       selectedProjectId: undefined,
  //     };
  //   });
  // };

  const removeProjectHandler = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (p) => p.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  const addTaskHandler = (taskText) => {
    setProjectState((prevState) => {
      const newTask = {
        text: taskText,
        id: Math.random(),
        relatedProjectId: prevState.selectedProjectId
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  };
  const removeTaskHandler = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (t) => t.id !== id
        ),
      };
    });
  };

  let chosenProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={chosenProject}
      onDelete={removeProjectHandler}
      onAddTask={addTaskHandler}
      onDeleteTask={removeTaskHandler}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onCreateProject={startaddingProjectHandler} />;
  } else if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onSave={addingNewProjectHandler} onCancel={cancelHandler} />
    );
  }

  return (
    <main className="pt-8 h-screen flex gap-8">
      <SideBar
        selectedProjectId={projectState.selectedProjectId}
        onSelectProject={selectProjectHandler}
        onCreateProject={startaddingProjectHandler}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
