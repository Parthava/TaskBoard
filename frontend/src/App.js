import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>

        <main className="py-3">

          <Container>

            <Switch>

              <Route exact path="/" component={HomeScreen}/>
              <Route exact path="/login" component={LoginScreen}/>
              <Route exact path="/register" component={RegisterScreen}/>

            </Switch>

          </Container>

        </main>

      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
