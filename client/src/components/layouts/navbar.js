import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">iNoteBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="me-auto navlinks">
                            <Link to="/">Home</Link>
                            <Link to="/login" >Login</Link>
                            <Link to="/signup" >Sign up</Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;
