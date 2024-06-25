import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import AccountService from '../service/Account.Service'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Header({ user, setUser }) {
    const [cookies, setCookie] = useCookies(['user'])

    const navigateTo = useNavigate();

    const logoutFunction = async() => {
        const response = await AccountService.logout()
        if (response.status === 200) {
            setCookie('user', "userData", { path: '/', maxAge: 0 });
            setUser("");
            navigateTo("/login");
        }
    }
    
    
  return (
      <div>
          <Navbar key={"menu"} expand={false} className="bg-body-tertiary mb-3" placement="end" fixed="top" data-bs-theme="dark" >
              <Container fluid>
                  <Navbar.Brand href="#">
                      
                  </Navbar.Brand>
                  <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${false}`} />
                  <Navbar.Offcanvas
                      placement="end"
                      data-bs-theme="dark">
                      <Offcanvas.Header closeButton>
                          <Offcanvas.Title>
                              Account Options
                          </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                          <Nav className='justify-content-end flex-grow-1 pe-3'>
                              <Nav.Link href="/">Home</Nav.Link>
                              <Nav.Link href="/accountmanagement">Account Management</Nav.Link>
                              {user.admin && (<Nav.Link href="/admin">Admin Controls</Nav.Link>)}
                              <Nav.Link onClick={logoutFunction}>Logout {user.username}</Nav.Link>
                          </Nav>
                      </Offcanvas.Body>
                      
                  </Navbar.Offcanvas>
                  
                  
              </Container>
              
          </Navbar>
          
    </div>
  )
}

export default Header