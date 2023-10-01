import React from "react";


function Task(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="task">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

export default Task;
