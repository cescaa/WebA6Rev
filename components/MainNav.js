
import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeToken, readToken } from "@/lib/authenticate"; 

export default function MainNav() {
  const [searchBar, setSearchBar] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const token = readToken(); 
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchBar.trim()) {
      await addToHistory(`title=true&q=${searchBar}`);
      router.push(`/artwork?title=true&q=${searchBar}`);
      setIsExpanded(false); 
    }
  };

  const handleNavLinkClick = () => setIsExpanded(false);

  const handleLogout = () => {
    removeToken(); 
    setIsLoggedIn(false); 
    router.push("/login"); 
  };

  const activeLinkStyle = {
    color: "red",
  };

  return (
    <>
      <Navbar
        className="fixed-top navbar-light bg-light px-3"
        expand="lg"
        expanded={isExpanded}
      >
        <Navbar.Brand>Cesca Dela Cruz</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" legacyBehavior passHref>
              <Nav.Link
                active={router.pathname === "/"}
                onClick={handleNavLinkClick}
                style={router.pathname === "/" ? activeLinkStyle : {}}
              >
                Home
              </Nav.Link>
            </Link>
            {isLoggedIn && (
              <Link href="/search" legacyBehavior passHref>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={handleNavLinkClick}
                  style={router.pathname === "/search" ? activeLinkStyle : {}}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            )}
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-1"
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>

          <Nav>
            {isLoggedIn ? (
              <NavDropdown title="User Name" id="user-dropdown">
                <Link href="/favourites" legacyBehavior passHref>
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={handleNavLinkClick}
                    style={
                      router.pathname === "/favourites" ? activeLinkStyle : {}
                    }
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" legacyBehavior passHref>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={handleNavLinkClick}
                    style={
                      router.pathname === "/history" ? activeLinkStyle : {}
                    }
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav className="ms-auto">
                <Link href="/register" legacyBehavior passHref>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={handleNavLinkClick}
                    style={
                      router.pathname === "/register" ? activeLinkStyle : {}
                    }
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" legacyBehavior passHref>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={handleNavLinkClick}
                    style={router.pathname === "/login" ? activeLinkStyle : {}}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
}
