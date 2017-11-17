import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import LandingPage from './LandingPage';
import * as actions from '../actions';


const Dashboard = () => <h1>Dashboard</h1>;
const CreateSurvey = () => <h1>New Survey</h1>;

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    console.log(process.env.NODE_ENV,"***********************",process.env.REACT_APP_STRIPE_KEY);
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <div className="row">
              <Route exact path = "/" component = {LandingPage} />
              <Route exact path = "/surveys" component = {Dashboard} />
              <Route path = "/surveys/create" component = {CreateSurvey} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser: actions.fetchUser })(App);