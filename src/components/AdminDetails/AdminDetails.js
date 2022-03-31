import "./AdminDetails.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class AdminDetails extends React.Component {
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
          <section className="Adetails">
            <div className="Adetails-head">
              <div className="Adetails-head-flex">
                <div className="Adetails-head-flex-Pholder">
                  <Icon
                    className="Adetails-head-flex-Pholder__icon"
                    glyph="admin"
                    size={80}
                  />
                </div>
                <div className="Adetails-head-flex-text">
                  <div className="Adetails-head-flex-text-first">
                    <h2 className="Adetails-head-flex-text-first__name">
                      Jhonny Master
                    </h2>
                    <Icon
                      className="Adetails-head-flex-text-first__badge"
                      glyph="bolt"
                      size={32}
                    />
                    <p className="Adetails-head-flex-text-first__email">
                      jhonnymaster@testing.com
                    </p>
                  </div>
                  <p className="Adetails-head-flex-text__signin">
                    Last signin: 19/02/22
                  </p>
                </div>
              </div>
              <div className="Adetails-head-flex-icons">
                <Icon
                  className="Adetails-head-flex-icons__delete"
                  glyph="delete"
                  size={50}
                />
              </div>
            </div>
            <div className="Adetails-permissions">
              <h2 className="Adetails-permissions__title">Permissions</h2>
              <div className="Adetails-permissions-icons">
                <div className="Adetails-permissions-icons-each">
                  <Icon
                    className="Adetails-permissions-icons-each__icon Highlight!!!"
                    glyph="delete"
                    size={60}
                  />
                  <p className="Adetails-permissions-icons-each__name">
                    Permisssion 1
                  </p>
                </div>
              </div>
            </div>
            <div className="Adetails-log">
              <h2 className="Adetails-log__title">Details</h2>
              <ul className="Adetails-log-list">
                <li className="Adetails-log-list__item">
                  Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default AdminDetails;
