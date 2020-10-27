import './App.css';
import React from 'react';
import SideBar from './components/SideBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateCourse from './components/CreateCourse';
import CreateQuiz from './components/CreateQuiz';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  dashboard() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <SideBar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/create/course" exact component={CreateCourse} />
            <Route path="/create/mcq" exact component={CreateQuiz} />
          </Switch>
        </div>
      </Router>
    );
  }

  render() {
    const isLogin = true;
    return (
      <div className="App">
        { isLogin ? this.dashboard() : <Login />}
      </div>
    );
  }
}

export default App;
