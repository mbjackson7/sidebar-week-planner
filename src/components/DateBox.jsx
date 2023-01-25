import { useEffect, useState } from "react";
import "./DateBox.css";
import TaskItem from "./TaskItem";

export default function DateBox(props) {
  const [data, setData] = useState({});
  useEffect(() => {
    if (window.localStorage.getItem(formatDate(props.date, true))) {
      setData(
        JSON.parse(window.localStorage.getItem(formatDate(props.date, true)))
      );
    }
    //console.log("Loaded '" + window.localStorage.getItem(formatDate(props.date)) + "' for " + formatDate(props.date))
    //console.log(data)
  }, [props.date]);

  function formatDate(date, dateOnly = false) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let dayOfWeek = date.getDay();
    if (dateOnly) {
      return `${month}/${day}/${year}`;
    }
    switch (dayOfWeek) {
      case 0:
        dayOfWeek = "Sunday";
        break;
      case 1:
        dayOfWeek = "Monday";
        break;
      case 2:
        dayOfWeek = "Tuesday";
        break;
      case 3:
        dayOfWeek = "Wednesday";
        break;
      case 4:
        dayOfWeek = "Thursday";
        break;
      case 5:
        dayOfWeek = "Friday";
        break;
      case 6:
        dayOfWeek = "Saturday";
        break;
      default:
        dayOfWeek = "Unknown";
    }
    return `${dayOfWeek}, ${month}/${day}/${year}`;
  }

  function updateNotes(e) {
    setData({
      list: data.list,
      notes: e.target.value,
    });
    //console.log(data)
    //console.log("Saved '" + window.localStorage.getItem(formatDate(props.date)) + "' for " + formatDate(props.date))
  }

  function handleBlur(e) {
    window.localStorage.setItem(
      formatDate(props.date, true),
      JSON.stringify({
        list: data.list,
        notes: e.target.value,
      })
    );
  }

  function saveTask(index, checked, text) {
    console.log(
      "Saving task " + index + " with checked=" + checked + " and text=" + text
    );
    if (text === "") {
      deleteTask(index);
    } else {
      let newList = data.list;
      if (!data.list) {
        newList = [];
      }
      if (index === "new") {
        newList.push({ checked: checked, text: text });
      } else {
        newList[index] = { checked: checked, text: text };
      }
      setData({
        list: newList,
        notes: data.notes,
      });
      window.localStorage.setItem(
        formatDate(props.date, true),
        JSON.stringify({
          list: newList,
          notes: data.notes,
        })
      );
    }
  }

  function deleteTask(index) {
    if (index !== "new"){
      console.log("Deleting task " + index);
      let newList = data.list;
      newList.splice(index, 1);
      setData({
        list: newList,
        notes: data.notes,
      });
      window.localStorage.setItem(
        formatDate(props.date, true),
        JSON.stringify({
          list: newList,
          notes: data.notes,
        })
      );
    }
  }

  function renderTasks() {
    if (data.list) {
      const taskList = data.list.map((task, index) => {
        console.log(
          "Rendering task " +
            index +
            " with checked=" +
            task.checked +
            " and text=" +
            task.text
        );
        return <TaskItem index={index} data={task} saveTask={saveTask} deleteTask={deleteTask}/>;
      });
      return taskList;
    }
  }

  return (
    <div className="DateBox">
      <h5>{formatDate(props.date)}</h5>
      <div>{renderTasks()}</div>
      <TaskItem index="new" saveTask={saveTask} />
      <textarea
        id="notes"
        onChange={(e) => updateNotes(e)}
        onBlur={(e) => handleBlur(e)}
        value={data.notes}
      ></textarea>
    </div>
  );
}
