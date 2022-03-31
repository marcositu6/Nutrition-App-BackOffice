import "./UserDetails.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class UserDetails extends React.Component {
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
          <section className="Udetails">
            <div className="Udetails-head">
              <div className="Udetails-head-flex">
                <div className="Udetails-head-flex-Pholder">
                  <Icon
                    className="Udetails-head-flex-Pholder__icon"
                    glyph="profile"
                    size={60}
                  />
                </div>
                <div className="Udetails-head-flex-text">
                  <div className="Udetails-head-flex-text-first">
                    <h2 className="Udetails-head-flex-text-first__name">
                      Jhonny User
                    </h2>
                    <Icon
                      className="Udetails-head-flex-text-first__badge"
                      glyph="bolt"
                      size={32}
                    />
                    <p className="Udetails-head-flex-text-first__email">
                      jhonnyuser@testing.com
                    </p>
                  </div>
                  <p className="Udetails-head-flex-text__signin">
                    Last signin: 19/02/22
                  </p>
                </div>
              </div>
              <div className="Udetails-head-icons">
                <Icon
                  className="Udetails-head-icons__delete"
                  glyph="delete"
                  size={50}
                />
              </div>
            </div>
            <div className="Udetails-allergies">
              <h2 className="Udetails-allergies__title">Allergies</h2>
              <div className="Udetails-allergies-icons">
                <div className="Udetails-allergies-icons-each">
                  <Icon
                    className="Udetails-allergies-icons-each__icon Highlight!!!"
                    glyph="delete"
                    size={32}
                  />
                  <p className="Udetails-allergies-icons-each__name">
                    allergy name
                  </p>
                </div>
              </div>
            </div>
            <div className="Udetails-analytics">
              <h2 className="Udetails-analytics__title">Analytics</h2>
              <div className="Udetails-analytics-graphs">
                <div className="Udetails-analytics-graphs__first"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default UserDetails;
