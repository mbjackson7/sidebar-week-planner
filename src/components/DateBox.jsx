import { useEffect, useState } from "react";
import "./DateBox.css";

export default function DateBox(props) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem(formatDate(props.date))) {
      setNotes(window.localStorage.getItem(formatDate(props.date)));
    }
    console.log("Loaded '" + window.localStorage.getItem(formatDate(props.date)) + "' for " + formatDate(props.date))
  }, [props.date])

  function formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function updateNotes(e) {
    setNotes(e.target.value)
    window.localStorage.setItem(formatDate(props.date), e.target.value);
  }

  return (
    <div>
      <h3>{formatDate(props.date)}</h3>
      <div>{/* Will get calendar data here */}</div>
      <textarea id="notes" onChange={(e) => updateNotes(e)} value={notes}></textarea>
    </div>
  );
}
