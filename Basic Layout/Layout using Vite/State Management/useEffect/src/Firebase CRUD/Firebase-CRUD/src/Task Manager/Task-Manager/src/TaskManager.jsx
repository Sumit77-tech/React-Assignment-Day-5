import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTaskName, setUpdatedTaskName] = useState("");

  useEffect(() => {
    const unsubscribe = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "") return;
    await db.collection("tasks").add({ name: newTask, status: "not-started" });
    setNewTask("");
  };

  // Delete a task
  const deleteTask = async (id) => {
    await db.collection("tasks").doc(id).delete();
  };

  // Edit a task
  const updateTask = async (id) => {
    if (updatedTaskName.trim() === "") return;
    await db.collection("tasks").doc(id).update({ name: updatedTaskName });
    setEditingTask(null);
  };

  return (
    <div className="task-container">
      <h1>Task Manager</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter Task Name"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={updatedTaskName}
                  onChange={(e) => setUpdatedTaskName(e.target.value)}
                />
                <button onClick={() => updateTask(task.id)}>Update</button>
              </>
            ) : (
              <>
                <span>{task.name}</span>
                <button onClick={() => setEditingTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
