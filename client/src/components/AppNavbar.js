import React, { Fragment, useState } from 'react'
import { Navbar, Container, NavbarToggler, Collapse, Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
import LoginModal from '../components/auth/LoginModal'
import { useSelector, useDispatch } from 'react-redux'

const AppNavbar = () => {
    const [isOpen, setInOpen] = useState(false)
    const {isAuthenticated, user, userRole} = useSelector((state) => state.auth)

    console.log(userRole, "userRole")

    const dispatch = useDispatch()
    
    return(
        <Fragment>
        <Navbar color="dark" expand="lg" className="sticky-top">
            <Container>
                <Link to="/" className="text-white text-decoration-none">
                 Camera
                </Link>
                <NavbarToggler />
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto d-flex justify-content-around" navbar>
                    {
                    false ? (<h1 className="text-white">authLink</h1>)
                    : (<LoginModal />)
                    }
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </Fragment>
    )
    
}


export default AppNavbar 