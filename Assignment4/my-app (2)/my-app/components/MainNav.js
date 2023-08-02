import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router'
import Link from "next/link"

export default function MainNav() {

    const router = useRouter();

    function submitForm(e) {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${e.target.search.value}`)
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="fixed-top navbar-primary bg-success">
                <Container>
                    <Navbar.Brand>Shaid Amin Malik</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link href="/search">Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                name="search"
                            />
                            <Button variant="outline-light" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <br />
            <br />
        </>
    );
}