// should include logo (?), possibly socials, FAQ, contact form, maybe languages(?)

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar collapseOnSelect expand="lg" className="footer" >
      <Container>
        <Navbar.Brand href="/">
          <i className="fa-solid fa-paw" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/contactus">Contact us</Nav.Link>
            <Nav.Link href="/FAQ">FAQ</Nav.Link>
            {/*  <Nav.Link href="/Kofi">Buy us a Kofi!</Nav.Link> */} {/* void since we have integration if you agree */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;