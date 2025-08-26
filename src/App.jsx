import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState([]);

  const saveTask = (e) => {
    e.preventDefault();

    let taskname = e.target.taskname.value.trim();

    if (taskname === "") {
      alert("Task cannot be empty!");
      return;
    }

    if (!task.some((t) => t.text === taskname)) {
      let newTask = {
        text: taskname,
        time: new Date().toLocaleTimeString([],{hour:"2-digit" , minute:"2-digit"}),
      };
      setTask([...task, newTask]);
    } else {
      alert("Duplicate entry !!");
    }

    e.target.reset();
  };

  const clearAll = () => {
    setTask([]);
  };

  return (
    <div className="App">
      <h1>📝 TO-DO LIST</h1>
      <form onSubmit={saveTask}>
        <input type="text" name="taskname" placeholder="Enter task..." />
        <button type="submit">Add</button>
      </form>

      <div className="task-header">
        <p>Total Tasks: {task.length}</p>
        {task.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="outerdiv">
        <ul>
          {task.map((item, index) => (
            <ToDoListItems
              key={index}
              indexNumber={index}
              value={item}
              task={task}
              setTask={setTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

function ToDoListItems({ value, indexNumber, task, setTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.text);

  const deleteRow = () => {
    let finalData = task.filter((_, i) => i !== indexNumber);
    setTask(finalData);
  };

  const saveEdit = () => {
    if (editValue.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    let updatedTasks = task.map((t, i) =>
      i === indexNumber ? { ...t, text: editValue } : t
    );
    setTask(updatedTasks);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className="save-btn" onClick={saveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          <div>
            <strong>{value.text}</strong>
            <div className="time"> {value.time}</div>
          </div>
          <div className="actions">
            <span className="edit-btn" onClick={() => setIsEditing(true)}>
              ✏️
            </span>
            <span className="delete-btn" onClick={deleteRow}>
              ❌
            </span>
          </div>
        </>
      )}
    </li>
  );
}
