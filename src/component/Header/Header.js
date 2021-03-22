import React from 'react';
import { Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import './Header.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (

        <div className="">
            <div>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">BD Riders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end page-name">
                        <Nav className="mr-5">
                        <Link className="link" to="/home">Home</Link>
                        <Link className="link" to="/destination/:id">Destination</Link>
                        <Link className="link" to="">Blog</Link>
                        <Link className="link" to="">Contact</Link>
                        <Link className="link" to="/signup">Book</Link>
                        <Link to='/login'>
                        <Button  variant="success"  > Login </Button>
                        </Link>

                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>

            </div>


        </div>



    );
};

export default Header;