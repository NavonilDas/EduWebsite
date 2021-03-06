import "./App.css";
import React from "react";
import SideBar from "./components/SideBar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateTest from "./components/CreateTest";
import Chapters from "./components/Chapters";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewCourse from "./components/ViewCourse";
import Users from "./components/Users";
import Courses from "./components/Courses";
import AddContent from "./components/AddContent";
import Analysis from "./components/Analysis/index";

import axios from "axios";
import { errorHandler, getCookies, HOST } from "./Api";
import Profile from "./components/Profile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    const cookies = getCookies();
    if (cookies.ID) {
      this.onLogin();
    }
  }

  onLogin() {
    axios
      .post(
        `${HOST}users/verify`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.data.sucess && res.data.admin) {
          this.setState({ isLogin: true });
        }
      })
      .catch((err) => errorHandler(err, this));
  }

  dashboard() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <SideBar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/category/:id" exact component={Courses} />
            <Route path="/create/category" exact component={Courses} />
            <Route path="/users" exact component={Users} />
            <Route path="/chapter/:id" exact component={Chapters} />
            <Route path="/create/quiz/:id" exact component={CreateTest} />
            <Route path="/course/:id" exact component={ViewCourse} />
            <Route path="/content/:chapterID" exact component={AddContent} />
            <Route
              path="/edit/content/:contentID"
              exact
              component={AddContent}
            />
            <Route path="/dashboard" exact component={Analysis} />
          </Switch>
        </div>
      </Router>
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.isLogin ? (
          this.dashboard()
        ) : (
            <Login onLogin={this.onLogin} />
          )}
      </div>
    );
  }
}

export default App;
