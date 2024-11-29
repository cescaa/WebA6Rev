/*import { useState } from "react";
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
import { addToHistory } from "@/lib/userData"; // Import the function

export default function MainNav() {
  const [searchBar, setSearchBar] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchBar.trim()) {
      // Add to search history and navigate to the results
      await addToHistory(`title=true&q=${searchBar}`);
      router.push(`/artwork?title=true&q=${searchBar}`);
      setIsExpanded(false); // Collapse the navbar
    }
  };

  const handleNavLinkClick = () => setIsExpanded(false);

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
            <Link href="/search" legacyBehavior passHref>
              <Nav.Link
                active={router.pathname === "/search"}
                onClick={handleNavLinkClick}
                style={router.pathname === "/search" ? activeLinkStyle : {}}
              >
                Advanced Search
              </Nav.Link>
            </Link>
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
                  style={router.pathname === "/history" ? activeLinkStyle : {}}
                >
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
}
*/

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
import { removeToken, readToken } from "@/lib/authenticate"; // Import functions from authenticate.js

export default function MainNav() {
  const [searchBar, setSearchBar] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const router = useRouter();

  useEffect(() => {
    const token = readToken(); // Check if the user is logged in by reading the token
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchBar.trim()) {
      // Add to search history and navigate to the results
      await addToHistory(`title=true&q=${searchBar}`);
      router.push(`/artwork?title=true&q=${searchBar}`);
      setIsExpanded(false); // Collapse the navbar
    }
  };

  const handleNavLinkClick = () => setIsExpanded(false);

  const handleLogout = () => {
    removeToken(); // Remove token on logout
    setIsLoggedIn(false); // Update state to reflect the user is logged out
    router.push("/login"); // Redirect to the login page
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
              // If logged in, show the user's name and logout option
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
              // If not logged in, show login and register links
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
