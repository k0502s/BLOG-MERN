import React, { Fragment, useState, useCallback, useEffect } from 'react';
import {
    Navbar,
    Container,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Form,
    Button,
  } from "reactstrap";
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from "../components/auth/RegisterModal";
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_REQUEST, POSTS_WRITE_REQUEST} from '../redux/types';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {isAuthenticated, user, userRole} = useSelector((state) => state.auth);

    console.log(userRole, "userRole");

    const dispatch = useDispatch();

   const onLogout = useCallback(() => {
       dispatch({
           type: LOGOUT_REQUEST,
       })
   }, [dispatch]);

   useEffect(() => {
    setIsOpen(false);
   }, [user]); //user가 들어오면 즉 로그인이 되면 setIsOpen을 false로 바꿔주어 화면에 드랍창을 닫게함

   const handleToggle = () => {
       setIsOpen(!isOpen); //여기는 토글 버튼만 누르면 언제든지 드랍열리게 하기
   };

   const addPostClick = () => {
    dispatch({
      type: POSTS_WRITE_REQUEST,
    });
  };

   const authLink = (
    <Fragment>
      <NavItem>
        {userRole === "MainJuin" ? (
          <Form className="col mt-2">
            <Link
              to='/#'
              className="btn btn-success block text-white px-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : ""}
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to='/#'>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to='/#'>
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );
   
    
    return(
        <Fragment>
        <Navbar color="dark" expand="lg" className="sticky-top">
            <Container>
                <Link to="/" className="text-white text-decoration-none">
                 Camera
                </Link>
                <NavbarToggler onClick={handleToggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto d-flex justify-content-around" navbar>
                    {isAuthenticated
                    ? (authLink)
                    : (guestLink)
                    }
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </Fragment>
    );
    
};


export default AppNavbar 