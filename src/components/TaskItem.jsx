import { useEffect, useState } from "react";
import "./DateBox.css";

export default function TaskItem(props) {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (props.data) {
      setChecked(props.data.checked);
      setText(props.data.text);
    }
  }, []);

  function handleChange(e) {
    setChecked(e.target.checked);
    props.saveTask(props.index, e.target.checked, text);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleBlur(e) {
    props.saveTask(props.index, checked, text);
    if (props.index === "new") {
      setText("");
    }
  };

  function handleKeyPress(e) {
    if(e.keyCode === 13){
      e.target.blur(); 
    };
 }

  return (
    <div className="Task">
      { props.index !== "new" &&
      <input
        className="TaskInput"
        type="checkbox"
        checked={checked}
        onChange={(e) => handleChange(e)}
      />
      }
      <input
        className={checked ? "TaskInputDone" : "TaskInput"}
        type="text"
        value={text}
        onChange={(e) => handleTextChange(e)}
        onBlur={(e) => handleBlur(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      { props.index !== "new" &&
      <h5
        onClick={() => props.deleteTask(props.index)}
      >X
      </h5>
      }
    </div>
  );
}
