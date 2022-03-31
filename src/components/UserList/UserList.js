import "./UserList.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class UserList extends React.Component {
  // class states =>
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      status: "item-details-second-start__stock",
    };
  }
  render() {
    return (
      <div className="background">
        <div className="wrapper">
          <section className="Ulist">
            <div className="Ulist-head">
              <Icon className="Ulist-head__icon" glyph="search" size={20} />
              <input
                className="Ulist-head__searchbar"
                placeholder="Search..."
              ></input>
            </div>
            <div className="Ulist-item">
              <Link className="Ulist-link" to="/users/details">
                <div className="Ulist-item-first">
                  <div className="Ulist-item-first-Pholder">
                    <Icon
                      className="Ulist-item-first-Pholder__icon"
                      glyph="profile"
                      size={40}
                    />
                  </div>
                  <h2 className="Ulist-item-first__name">Jhonny User</h2>
                  <Icon
                    className="Ulist-item-first__badge"
                    glyph="bolt"
                    size={16}
                  />
                  <p className="Ulist-item-first__email">
                    jhonnyuser@testing.com
                  </p>
                  <p className="Ulist-item-first__signin">
                    Last signin: 19/02/22
                  </p>
                </div>
              </Link>
              <div className="Ulist-item-second">
                <Icon
                  className="Ulist-item-second__delete"
                  glyph="delete"
                  size={32}
                />
                <Link className="Ulist-link" to="/users/details">
                  <Icon
                    className="Ulist-item-second__edit"
                    glyph="edit"
                    size={32}
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default UserList;
