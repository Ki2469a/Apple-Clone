import NavbarList from "./NavBarList/NavBarList";
import logo from "../../images/icons/logo-sm.png";
import search from "../../images/icons/search-icon-sm.png";
import cart from "../../images/icons/cart-sm.png";
import { useEffect } from "react";
import $ from "jquery";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Nav() {
  useEffect(() => {
    $(".search-link").click(function (event) {
      event.preventDefault();
      $(".navbar-collapse.collapse").removeClass("show");
      $(".searchbox").slideToggle();
    });
  }, []);

  return (
    <div>
      <div className="nav-tool fixed-top">
        <div className="container">
          <nav className="navbar navbar-toggleable-sm navbar-expand-md">
            <Navbar
              className="w-100"
              collapseOnSelect
              expand="lg"
              variant="dark"
            >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Link className="navbar-brand mx-auto apple-logo" to="/">
                <img src={logo} alt="Apple logo" />
              </Link>

              <Navbar.Collapse id="responsive-navbar-nav">
                <ul className="navbar-nav nav-justified w-100 nav-fill">
                  <NavbarList LinkUrl="/mac/" LinkName="Mac" />
                  <NavbarList LinkUrl="/iphone/" LinkName="iphone" />
                  <NavbarList LinkUrl="/ipad/" LinkName="ipad" />
                  <NavbarList LinkUrl="/watch/" LinkName="watch" />
                  <NavbarList LinkUrl="/tv/" LinkName="tv" />
                  <NavbarList LinkUrl="/Music/" LinkName="Music" />
                  <NavbarList LinkUrl="/Support/" LinkName="Support" />
                  <li className="nav-item">
                    <Link
                      className="search-link nav-link js-scroll-trigger"
                      to="/search/"
                    >
                      <img src={search} alt="Search logo" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link js-scroll-trigger logo-link"
                     to="/cart/"
                    >
                      <img src={cart} alt="Cart logo" />
                    </Link>
                  </li>
                </ul>
              </Navbar.Collapse>
            </Navbar>
          </nav>
        </div>
      </div>

      <section className="searchbox">
        <form>
          <input type="text" name="searchbox" />
          <button id="submitButton" className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </section>
    </div>
  );
}

export default Nav;
