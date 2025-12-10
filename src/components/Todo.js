import React, { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [filter,setFilter]=useState("ALL");

  const handleAdd = () => {
    if (task.trim() !== "") {
      setTasklist([...tasklist, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const newList = [...tasklist];
    newList[index].completed = !newList[index].completed;
    setTasklist(newList);
  };

  const handleDelete = (index) => {
    const newList = tasklist.filter((_, i) => i !== index);
    setTasklist(newList);
  };

  const handleEdit = (index) => {
    const newTask = prompt("Edit task:", tasklist[index].text);
    if (newTask !== null && newTask.trim() !== "") {
      const newList = [...tasklist];
      newList[index].text = newTask;
      setTasklist(newList);
    }
  };

  const filteredTasks=tasklist.filter((task)=>
    {
      if(filter==="ALL") return true;
      if(filter==="Done") return task.completed;
      if(filter==="Todo") return !task.completed;
      return true;
    }
  );

  return (
    <div className="Outter">
      <div className="todo">Todo</div>

      <div className="Inner-top">
        <input
          className="inp"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e)=>{if(e.key==="Enter") {handleAdd();}}}
          placeholder="New Todo"
        />
        <button className="add-button" onClick={handleAdd}>
          Add new Task
        </button>
      </div>

      <div className="Inner">
        <div className="todolist">TodoList</div>
        <div className="buttons">
          <button className="all" onClick={()=>{setFilter("ALL")}}>ALL</button>
          <button className="Done" onClick={()=>{setFilter("Done")}}>Done</button>
          <button className="Todo" onClick={()=>{setFilter("Todo")}}>Todo</button>
        </div>

        <ul className="tasklist">
          {filteredTasks.map((item) => {
            const originalIndex = tasklist.indexOf(item);
            return (
              <li key={originalIndex} className="task-item">
                <span
                  className={`task-text ${item.completed ? "completed" : ""}`}
                >
                  {item.text}
                </span>
                <div>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(originalIndex)}
                  />
                  <span className="edit" onClick={() => handleEdit(originalIndex)}>
                    ✏️
                  </span>
                  <span className="delete" onClick={() => handleDelete(originalIndex)}>
                    🗑️
                  </span>
                </div>
              </li>
            );
          })}
      </ul>

      </div>
    </div>
  );
};

export default Todo;
