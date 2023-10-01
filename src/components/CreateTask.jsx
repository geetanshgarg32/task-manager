import React, { useState } from "react";


function CreateTask(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTask(prevTask => {
      return {
        ...prevTask,
        [name]: value
      };
    });
  }

  function submitTask(event) {
    props.onAdd(task);
    setTask({
      title: "",
      description: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-task">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={task.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="description"
          onClick={expand}
          onChange={handleChange}
          value={task.description}
          placeholder="Enter The Task..."
          rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitTask}> Add</button>
      </form>
    </div>
  );
}

export default CreateTask;
