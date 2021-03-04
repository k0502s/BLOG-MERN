import React, { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppNavbar from '../components/AppNavbar'
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import categoryResult from './normalRoute/categoryResult';
import PostEdit from "./normalRoute/PostEdit";
import Profile from "./normalRoute/Profile"
import {
    EditProtectedRoute,
    ProfileProtectedRoute,
  } from "./protectedRoute/ProtectedRoute";
// import Auth from "../hoc/auth"



const MyRouter = () => {
    return (
       <Fragment>
           <AppNavbar />
           <Header />
           <Container id="main-body">
             <Switch>
                  {/* <Route exact path="/footer" component={Auth(Footer, true)} />
                  <Route exact path="/app" component={Auth(AppNavbar, false)} /> */}
                  <Route path='/' exact component={PostCardList} />
                  <Route path='/post' exact component={PostWrite} />
                  <Route path='/post/:id' exact component={PostDetail} />
                  <Route path='/post/category/:categoryName' exact component={categoryResult} />
                  <Route path='/search/:searchTerm' exact component={Search} />
                  <EditProtectedRoute path="/post/:id/edit" exact component={PostEdit} />
                  <ProfileProtectedRoute
                    path="/user/:userName/profile"
                    exact
                    component={Profile}
                    />
                  <Redirect from="*" to='/' />
             </Switch>
            </Container>
           <Footer />
       </Fragment>
    )
}

export default MyRouter
