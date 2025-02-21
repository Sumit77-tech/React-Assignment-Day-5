import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; // Assume correct Firebase config

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Real-time listener for Firestore updates
    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Cleanup function to prevent memory leaks
    return () => unsubscribe();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
