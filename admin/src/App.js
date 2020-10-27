import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <SideBar />
    </div>
  );
}

export default App;
