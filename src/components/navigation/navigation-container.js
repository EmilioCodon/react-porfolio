import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { FontAwesome } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationComponent = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        
          <NavLink to={route} activeClassName="nav-link-active">
            {linkText}
          </NavLink>
        
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
  };

  <div className="nav-link-wrapper">
    <NavLink to="/blog" activeClassName="nav-link-active">
      Blog
    </NavLink>
  </div>;

  return (
    <div>
      <div className="nav-wrapper">
        <div className="left-side">
          <div className="nav-link-wrapper">
            <NavLink exact to="/" activeClassName="nav-link-active">
              Home
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/about-me" activeClassName="nav-link-active">
              About
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/contact" activeClassName="nav-link-active">
              Contact
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/blog" activeClassName="nav-link-active">
              Blog
            </NavLink>
          </div>

          {props.loggedInStatus === "LOGGED_IN"
            ? dynamicLink("/portfolio-manager", "Portfolio Manager")
            : null}

          {false ? <button>Add Blog</button> : null}
        </div>

        <div className="right-side">
          EMILIO CODON
          {props.loggedInStatus === "LOGGED_IN" ? (
            <a onClick={handleSignOut}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
