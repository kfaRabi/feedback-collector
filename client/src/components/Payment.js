import React, {Component} from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payment extends Component {

  render() {
    return (
      <ReactStripeCheckout
        name = "Emily"
        description = "Add $5 for 5 email credits"
        amount = {500}
        token = { (token) => this.props.handleToken(token) }
        stripeKey = { process.env.REACT_APP_STRIPE_KEY }
      >
      <a className="btn red">Add Credits</a>
      </ReactStripeCheckout>
    );
  }
}

export default connect(null, actions)(Payment);