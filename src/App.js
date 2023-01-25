import './App.css';
import DateBox from './components/DateBox';

function App() {
  
  

  function renderWeek(){
    var date = new Date();
    var dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(date.getTime()))
      date.setDate(date.getDate() + 1);
    } 
    console.log(dates)
    return dates.map((date) => {
      return <DateBox date={date}/>
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {renderWeek()}
      </header>
    </div>
  );
}

export default App;
