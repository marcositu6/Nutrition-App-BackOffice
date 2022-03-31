import "./PageHeader.scss";
import { Link } from "react-router-dom";
import { Component } from "react";
import Icon from "supercons";

class PageHeader extends Component {
  render() {
    return (
      <section className="navbar">
        <div className="navbar__accent">
          <div className="navbar__iconPholder">
            <Icon className="navbar__icon" glyph="admin" size={128} />
          </div>
        </div>
        <ul className="navbar-list">
          <Link className="navbar-list__link" to="/users">
            <li
              className={
                this.props.location.pathname.includes("users")
                  ? "navbar-list__link-item navbar-list__link-item--highlight"
                  : "navbar-list__link-item"
              }
            >
              USERS
            </li>
            <div
              className={
                this.props.location.pathname.includes("users")
                  ? "navbar-list__link-accent--highlight"
                  : "navbar-list__link-accent"
              }
            ></div>
          </Link>
          <Link className="navbar-list__link" to="/admins">
            <li
              className={
                this.props.location.pathname.includes("admin")
                  ? "navbar-list__link-item navbar-list__link-item--highlight"
                  : "navbar-list__link-item"
              }
            >
              ADMINS
            </li>
            <div
              className={
                this.props.location.pathname.includes("admin")
                  ? "navbar-list__link-accent--highlight"
                  : "navbar-list__link-accent"
              }
            ></div>
          </Link>
          <Link className="navbar-list__link" to="/recipe/review">
            <li
              className={
                this.props.location.pathname.includes("recipe")
                  ? "navbar-list__link-item navbar-list__link-item--highlight"
                  : "navbar-list__link-item"
              }
            >
              RECIPES
            </li>
            <div
              className={
                this.props.location.pathname.includes("recipe")
                  ? "navbar-list__link-accent--highlight"
                  : "navbar-list__link-accent"
              }
            ></div>
          </Link>
        </ul>
      </section>
    );
  }
}
export default PageHeader;
