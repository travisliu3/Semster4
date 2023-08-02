import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router'
import Link from "next/link"
import { searchHistoryAtom } from '../store';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';

export default function MainNav() {

    const [setSearchHistory] = useAtom(searchHistoryAtom)

    const [isExpanded, setisExpanded] = useState(false);

    const router = useRouter();

    function submitForm(e) {
        e.preventDefault();
        setisExpanded(expand => expand = false);
        setSearchHistory(current => [...current, `title=true&q=${e.target.search.value}`]);
        router.push(`/artwork?title=true&q=${e.target.search.value}`)
    }

    function toggleNav(e) {
        setisExpanded(expand => expand = !expand);
    }

    function NavLinkClick() {
        setisExpanded(false);
    }

    return (
        <>
            <Navbar expanded={isExpanded} bg="light" expand="lg" className="fixed-top">
                <Container>
                    <Navbar.Brand>Mohammad Abil Obid Abilail</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNav} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior >
                                <Nav.Link href="/" onClick={handleNavLinkClick}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior >
                                <Nav.Link href="/search" onClick={handleNavLinkClick}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;<Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                name="search"
                            />
                            <Button variant="outline-light" type="submit">Search</Button>
                        </Form>&nbsp;
                        <Nav>
                            <NavDropdown active={router.pathname === "/history"} title="User Name" id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior >
                                    <NavDropdown.Item href="/favourites" onClick={NavLinkClick}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior >
                                    <NavDropdown.Item href="/history" onClick={NavLinkClick}>Search History</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <br />
            <br />
        </>
    );
}