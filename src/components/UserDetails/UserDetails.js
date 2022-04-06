import "./UserDetails.scss";
import axios from "axios";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";
import DeleteModal from "../DeleteModal/DeleteModal";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class UserDetails extends React.Component {
  // class states =>
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: null,
      logs: null,
      gender: null,
      show: false,
      target: "patient",
      id: "",
      name: "",
    };
    // Bind this to function hide / show modal so it's assigned to the state
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // fetch item data from API and assign it to state (also changes var for badge element)
  fetchData() {
    axios
      .get(`${apiURL}/api/v1/patient/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          user: response.data,
        });
        if (this.state.user.isSubscribed) {
          this.badge = "Ulist-item-first__badge";
        } else {
          this.badge = "Ulist-item-first__none";
        }
        axios
          .get(`${apiURL}/api/v1/users/${response.data.user}`)
          .then((res) => {
            this.setState({
              email: res.data.email,
              logs: res.data.logs,
            });
            this.stateLogs();
          });
      });
  }
  componentDidMount() {
    // change tittle of webpage
    document.title = "Aurea BO User Details";
    this.fetchData();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.state.user;
    console.log(user);
    axios
      .patch(`${apiURL}/api/v1/patient/${this.state.user._id}`, user)
      .then((res, req) => {
        if (res.status === 200) {
          console.log("success");
          console.log(res);
        }
      })
      .catch((err) => {
        //catch in case of error console log it
        console.log(err);
      });
  };

  convertTime(timestamp) {
    let d = new Date(timestamp);
    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yyyy = d.getFullYear();
    let time = dd + "-" + mm + "-" + yyyy;
    return time;
  }
  convertString(String) {
    return String.replace(/_/gi, " ");
  }
  convertNum(string) {
    return string.replace(/\D/g, "");
  }
  handleChangeBirthdate = (e) => {};

  handleChange = (e) => {
    let newUser = null;
    if (e.target.name.includes(".")) {
      const target = e.target.name;
      const array = target.split(".");
      const first = array[0];
      const second = array[1];
      newUser = { ...this.state.user };
      newUser[first][second] = e.target.value;
    } else {
      newUser = { ...this.state.user };
      newUser[e.target.name] = e.target.value;
    }
    // console.log(newUser);
    this.setState({
      user: newUser,
    });
  };

  handleToggle = (e, index) => {
    e.preventDefault();
    let boolean = null;
    // console.log(e);
    if (this.state.user.nutritionalPreferences.allergenGroups[index].boolean) {
      boolean = false;
    } else {
      boolean = true;
    }

    let newState = { ...this.state.user };
    newState.nutritionalPreferences.allergenGroups[index].boolean = boolean;

    this.setState({
      user: newState,
    });
    console.log(this.state.user);
  };

  stateLogs = () => {
    this.setState({
      logging: this.state.logs.filter((log) => {
        if (log.actionType === "CHEATMEAL_INPUT") {
          if (log.timestamp) {
            return true;
          }
        }
      }),
      data: {
        labels: this.state.logs
          .filter((log) => {
            if (log.actionType === "WEIGHT_INPUT") {
              if (log.timestamp) {
                return true;
              }
            }
          })
          .map((log) => this.convertTime(log.timestamp)),
        datasets: [
          {
            label: "User weight in kg",
            data: this.state.logs
              .filter((log) => {
                if (log.actionType === "WEIGHT_INPUT") {
                  if (log.input) {
                    return true;
                  }
                }
              })
              .map((log) => this.convertNum(log.input)),
            backgroundColor: ["#F95738"],
            borderWidth: 2,
          },
        ],
      },
    });
  };

  // function to call to show modal
  showModal = (id, name) => {
    this.setState({ show: true });
    this.setState({ id: id });
    this.setState({ name: name });
  };
  // function to call to hide modal
  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="background">
        <div className="wrapper">
          <form className="Udetails" onSubmit={this.handleSubmit}>
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
                    <input
                      className="Udetails-head-flex-text-first__name"
                      name="firstName"
                      onChange={this.handleChange}
                      value={this.state.user && this.state.user.firstName}
                    />
                    <input
                      className="Udetails-head-flex-text-first__name"
                      name="lastName"
                      onChange={this.handleChange}
                      value={this.state.user && `${this.state.user.lastName}`}
                    />
                    <Icon className={`${this.badge}`} glyph="bolt" size={32} />
                    <p className="Udetails-head-flex-text-first__email">
                      {this.state.email && this.state.email}
                    </p>
                  </div>
                  <p className="Udetails-head-flex-text__signin">
                    {this.state.user &&
                      `Last signin: ${this.convertTime(
                        this.state.user.updatedAt
                      )}`}
                  </p>
                </div>
              </div>
              <div className="Udetails-head-icons">
                <Icon
                  className="Udetails-head-icons__delete"
                  onClick={() => {
                    const modalName = `${this.state.user.firstName}  ${this.state.user.lastName}`;
                    this.showModal(this.state.user._id, modalName);
                  }}
                  glyph="delete"
                  size={50}
                />
              </div>
            </div>
            <div className="Udetails-allergies">
              <h2 className="Udetails-allergies__title">Allergies</h2>
              <div className="Udetails-allergies-icons">
                {this.state.user &&
                  this.state.user.nutritionalPreferences.allergenGroups.map(
                    (allergy, index) => {
                      if (allergy.boolean) {
                        this.allergy = "Udetails-allergies-icons-each__icon";
                      } else {
                        this.allergy = "Udetails-allergies-icons-each__none";
                      }
                      return (
                        <button
                          className="Udetails-allergies-icons-each"
                          key={allergy._id}
                          onClick={(e) => this.handleToggle(e, index)}
                        >
                          <img
                            className={`${this.allergy}`}
                            src={require(`../../assets/icons/${allergy.name}.png`)}
                            alt="icon allergy"
                          />
                          <p className="Udetails-allergies-icons-each__name">
                            {this.convertString(allergy.name)}
                          </p>
                        </button>
                      );
                    }
                  )}
              </div>
            </div>
            <div className="Udetails-info">
              <h2 className="Udetails-info__title">User Information</h2>
              <ul className="Udetails-info-text">
                <li className="Udetails-info-text__address">
                  Address:
                  <input
                    className="Udetails-info-text__address--input"
                    name="address.city"
                    onChange={this.handleChange}
                    value={this.state.user && `${this.state.user.address.city}`}
                  />
                  <input
                    className="Udetails-info-text__address--input"
                    name="address.country"
                    onChange={this.handleChange}
                    value={
                      this.state.user && `${this.state.user.address.country}`
                    }
                  />
                </li>
                <li className="Udetails-info-text__physicalAttributes">
                  Physical Attributes:
                  <input
                    className="Udetails-info-text__physicalAttributes--input"
                    name="physicalAttributes.heightCm"
                    onChange={this.handleChange}
                    value={
                      this.state.user &&
                      `${this.state.user.physicalAttributes.heightCm}`
                    }
                  />
                  Cm &nbsp;
                  <input
                    className="Udetails-info-text__physicalAttributes--input"
                    name="physicalAttributes.weightKg"
                    onChange={this.handleChange}
                    value={
                      this.state.user &&
                      `${this.state.user.physicalAttributes.weightKg}`
                    }
                  />
                  Kg &nbsp; &nbsp; &nbsp; Gender:
                  <select
                    className="Udetails-info-text__physicalAttributes--input"
                    name="physicalAttributes.gender"
                    onChange={this.handleChange}
                    value={
                      this.state.user &&
                      `${this.state.user.physicalAttributes.gender}`
                    }
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </li>
                <li className="Udetails-info-text__objective">
                  Objective:
                  <select
                    className="Udetails-info-text__objective--input"
                    onChange={this.handleChange}
                    value={this.state.user && this.state.user.objective}
                    name="objective"
                  >
                    <option value="STAY_HEALTHY">Stay healthy</option>
                    <option value="GAIN_WEIGHT">Gain weight</option>
                    <option value="LOSE_WEIGHT">Lose weight</option>
                  </select>
                </li>
                <li className="Udetails-info-text__activity">
                  Activity level:
                  <select
                    className="Udetails-info-text__activity--input"
                    name="habits.activityLevel"
                    onChange={this.handleChange}
                    value={
                      this.state.user && this.state.user.habits.activityLevel
                    }
                  >
                    <option value="SEDENTARY">Sedentary</option>
                    <option value="MILD">Mild</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="INTENSE">Intense</option>
                  </select>
                </li>
                <li className="Udetails-info-text__birthDate">
                  Birthdate:
                  <input
                    className="Udetails-info-text__birthDate--input"
                    name="birthDate"
                    onChange={this.handleChange}
                    value={
                      this.state.user &&
                      `${this.convertTime(this.state.user.birthDate)}`
                    }
                  />
                </li>
              </ul>
            </div>
            <div className="Udetails-analytics">
              <h2 className="Udetails-analytics__title">Analytics</h2>
              <div className="Udetails-analytics-graphs">
                <div className="Udetails-analytics-graphs__first">
                  {this.state.data && <Line data={this.state.data} />}
                </div>
              </div>
              <h2 className="Udetails-analytics__titleOther">Other logs</h2>
              <div className="Udetails-analytics-logList">
                {this.state.logging &&
                  this.state.logging.map((log) => {
                    return (
                      <p
                        className="Udetails-analytics-logList__item"
                        key={log._id}
                      >
                        {`${this.convertTime(
                          log.timestamp
                        )}: User inputted cheat meal: ${
                          log.input
                        },  Diet recalculated for week.`}
                      </p>
                    );
                  })}
              </div>
            </div>
            <div className="Udetails-buttons">
              <button
                className="Udetails-buttons__cancel"
                onClick={this.props.history.goBack}
              >
                Cancel
              </button>
              <button className="Udetails-buttons__save" type="submit">
                Save Changes
              </button>
            </div>
          </form>
          <DeleteModal
            show={this.state.show}
            handleClose={this.hideModal}
            target={this.state.target}
            id={this.state.id}
            name={this.state.name}
          />
        </div>
      </div>
    );
  }
}
export default UserDetails;
