import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import SignInAndSignUpPage  from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

class App extends React.Component {
  constructor(){
    super();
    
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null ;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      createUserProfileDocument(user);

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div className="App">
        <Header currentUser = {this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path="/shop" component={ ShopPage } />
          <Route path="/signin" component={ SignInAndSignUpPage } />
          
        </Switch>
      </div>
    );
  }
  
    
}


  
export default App;
