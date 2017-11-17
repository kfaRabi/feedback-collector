import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

class Header extends Component {

  renderContent(){
    if(this.props.auth === null){
      return;
    }
    else if(this.props.auth === false){
      return <li><a href="/oauth/google">Login With Google</a></li>;
    }
    return [
      <li key="1"><Payment /></li>,
      <li key="1">Credits: {this.props.auth.credits}</li>,
      <li key = "2" ><a href="/api/logout">Logout</a></li>
    ];
  }

  render() {
    return (
      <nav className="row">
        <div className="col s12 nav-wrapper">
          <Link to={ this.props.auth ? "/surveys" : "/"} className="brand-logo left">LOGO</Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps)(Header);