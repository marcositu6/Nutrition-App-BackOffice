import "./AdminList.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class AdminList extends React.Component {
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
          <section className="Alist">
            <div className="Alist-head">
              <Icon className="Alist-head__icon" glyph="search" size={20} />
              <input
                className="Alist-head__searchbar"
                placeholder="Search..."
              ></input>
            </div>
            <div className="Alist-item">
              <Link className="Alist-link" to="/admin/details">
                <div className="Alist-item-first">
                  <div className="Alist-item-first-Pholder">
                    <Icon
                      className="Alist-item-first-Pholder__icon"
                      glyph="profile"
                      size={40}
                    />
                  </div>
                  <h2 className="Alist-item-first__name">Jhonny Master</h2>
                  <Icon
                    className="Alist-item-first__badge"
                    glyph="bolt"
                    size={16}
                  />
                  <p className="Alist-item-first__email">
                    jhonnymaster@testing.com
                  </p>
                  <p className="Alist-item-first__signin">
                    Last signin: 19/02/22
                  </p>
                </div>
              </Link>
              <div className="Alist-item-second">
                <Icon
                  className="Alist-item-second__delete"
                  glyph="delete"
                  size={32}
                />
                <Link className="Alist-link" to="/users/details">
                  <Icon
                    className="Alist-item-second__edit"
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
export default AdminList;
