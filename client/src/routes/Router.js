import React, { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppNavbar from '../components/AppNavbar'
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../hoc/auth"



const MyRouter = () => {
    return (
       <Fragment>
           <AppNavbar />
           <Header />
           <Container id="main-body">
             <Switch>
                  <Route exact path="/footer" component={Auth(Footer, true)} />
                  <Route exact path="/app" component={Auth(AppNavbar, false)} />
             </Switch>
            </Container>
           <Footer />
       </Fragment>
    )
}

export default MyRouter
