import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import store from './store';
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Login from "./components/admin/Login";
import Register from "./components/admin/Register";
import Dashboard from './components/admin/Dashboard';
import Settings from './components/admin/Settings';

import './App.scss';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  // Set User and isAuth
  store.dispatch(setCurrentUser(decoded));
  
  // Check if token has expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());

    // TODO Clear Profile and what else I need to.a1

    // Redirect to login
    window.location.href = '/login';
  }
}

/* We can register a new user and then remove that route. Or have built in admin users? */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/settings" component={Settings} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
