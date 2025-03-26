import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!title) return;
    try {
      await axios.post("http://localhost:5000/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
      });
      setEditId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTask = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="add-task">
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Task Title</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Description (optional)</label>
        </div>
        <button className="add" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task">
            {editId === task._id ? (
              <>
                <div className="input-group">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                  <label>Task Title</label>
                </div>
                <div className="input-group">
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <label>Description (optional)</label>
                </div>
              </>
            ) : (
              <span className={task.completed ? "completed" : ""}>
                {task.title} {task.description && `- ${task.description}`}
              </span>
            )}
            <div className="task-buttons">
              {editId === task._id ? (
                <button className="save" onClick={() => saveEdit(task._id)}>
                  Save
                </button>
              ) : (
                <button className="edit" onClick={() => startEdit(task)}>
                  Edit
                </button>
              )}
              <button
                className="complete"
                onClick={() => updateTask(task._id, task.completed)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="delete" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;