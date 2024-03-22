import logo from './logo.svg';
import './App.css';
a  = 15;
a 

var red = 10;     
function App() {
  return (
    <span><button onClick={fetch("localhost:8000").then(console.log("hello world"))}>
      generate a random number
    </button>
    <div>
      Generate!
    </div>
    </span>
  );
}

export default App;
