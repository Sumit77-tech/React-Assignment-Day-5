import React from "react";

const Navbar = ({ tasks }) => {
  const completedCount = tasks.filter(task => task.status === "completed").length;
  const ongoingCount = tasks.filter(task => task.status === "ongoing").length;
  const notStartedCount = tasks.filter(task => task.status === "not-started").length;

  return (
    <nav className="navbar">
      <h2>Task Manager</h2>
      <div className="task-counts">
        <span>✅ Completed: {completedCount}</span>
        <span>🚀 Ongoing: {ongoingCount}</span>
        <span>📌 Not Started: {notStartedCount}</span>
      </div>
      <div className="task-counts">
  <span className="hover-box">
    ✅ Completed: {completedCount}
    <div className="task-list">{tasks.filter(task => task.status === "completed").map(t => <p key={t.id}>{t.name}</p>)}</div>
  </span>
  <span className="hover-box">
    🚀 Ongoing: {ongoingCount}
    <div className="task-list">{tasks.filter(task => task.status === "ongoing").map(t => <p key={t.id}>{t.name}</p>)}</div>
  </span>
  <span className="hover-box">
    📌 Not Started: {notStartedCount}
    <div className="task-list">{tasks.filter(task => task.status === "not-started").map(t => <p key={t.id}>{t.name}</p>)}</div>
  </span>
</div>
    </nav>
  );
};

export default Navbar;
