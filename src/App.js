import './App.css';
import { useState } from 'react';
import DateBox from './components/DateBox';

function App() {
  const [modifier, setModifier] = useState(0);

  function renderWeek(modifier){
    var date = new Date();
    date.setDate(date.getDate() + modifier);
    var dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(date.getTime()))
      date.setDate(date.getDate() + 1);
    } 
    console.log("Rerendering")  
    //console.log(dates)
    return dates.map((date) => {
      return <DateBox date={date}/>
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {/*<div>
          <button onClick={() => setModifier(modifier - 7)}>Previous Week</button>
          <button onClick={() => setModifier(modifier + 7)}>Next Week</button>
        </div>*/}
        {renderWeek(modifier)}
      </header>
    </div>
  );
}

export default App;
