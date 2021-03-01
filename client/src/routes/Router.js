import React, { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppNavbar from '../components/AppNavbar'
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import PostCardList from './nomalRoute/PostCardList';
import PostWrite from './nomalRoute/PostWrite';
import PostDetail from './nomalRoute/PostDetail';
import Search from './nomalRoute/Search';
import categoryResult from './nomalRoute/categoryResult';
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
                  <Route path='/post/category/categoryName' exact component={categoryResult} />
                  <Route path='/search/:searchTerm' exact component={Search} />
                  <Redirect from="*" to='/' />
             </Switch>
            </Container>
           <Footer />
       </Fragment>
    )
}

export default MyRouter
