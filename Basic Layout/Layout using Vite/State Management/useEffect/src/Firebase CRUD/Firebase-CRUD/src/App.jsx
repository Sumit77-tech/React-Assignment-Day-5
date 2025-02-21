import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskManager from "./TaskManager";
import { db } from "./firebase-config";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar tasks={tasks} />
      <TaskManager />
    </div>
  );
}

export default App;
