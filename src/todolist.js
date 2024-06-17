import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function Todolist() {
    const [tasks, setTasks] = useState(["Eat", "Hi"]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null); // State to track which task is being edited

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        // Exit edit mode if deleting the currently edited task
        if (editIndex === index) {
            setEditIndex(null);
        }
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleEditMode(index) {
        setEditIndex(index === editIndex ? null : index);
    }

    function handleEditChange(event, index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = event.target.value;
        setTasks(updatedTasks);
    }

    return (
        <div className="todolist-container">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange} />
                <button className='add-button' onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        {editIndex === index ? (
                            <input
                                type="text"
                                value={task}
                                onChange={(event) => handleEditChange(event, index)}
                            />
                        ) : (
                            <span className='text'>{task}</span>
                        )}
                        <button className='edit-button' onClick={() => toggleEditMode(index)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className='delete-button' onClick={() => deleteTask(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className='move-button' onClick={() => moveTaskUp(index)}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button className='move-button' onClick={() => moveTaskDown(index)}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Todolist;