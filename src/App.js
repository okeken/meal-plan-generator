import React from 'react';
import ContactUs from './components/contact';
import Home from './components/home';
import WeeklyPlanner from './components/weekly meal planner with grocery list ';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.css';
export function App() {
  return (
    <main>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Free Meal planner</title>
        <link rel='canonical' href='' />
      </Helmet>
      <NavBar />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/contact' component={ContactUs} />
        <Route
          path='/weekly meal planner with grocery list'
          component={WeeklyPlanner}
        />
      </Switch>
    </main>
  );
}

export default App;
