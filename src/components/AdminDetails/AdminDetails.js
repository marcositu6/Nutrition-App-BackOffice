import "./AdminDetails.scss";
import axios from "axios";
import React from "react";
import Icon from "supercons";
import DeleteModal from "../DeleteModal/DeleteModal";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class AdminDetails extends React.Component {
  // class states =>
  constructor(props) {
    super(props);
    this.state = {
      admin: null,
      show: false,
      target: "admin",
      id: "",
      name: "",
      email: "",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // fetch item data from API and assign it to state (also changes var for badge element)
  fetchData() {
    axios
      .get(`${apiURL}/api/v1/admin/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          admin: response.data,
        });
        // if (this.state.user.ro) {
        //   this.badge = "Ulist-item-first__badge";
        // } else {
        //   this.badge = "Ulist-item-first__none";
        // }
        axios
          .get(`${apiURL}/api/v1/users/${response.data.user}`)
          .then((res) => {
            this.setState({
              email: res.data.email,
            });
          });
      });
  }
  componentDidMount() {
    // change tittle of webpage
    document.title = "Aurea BO Admin Details";
    this.fetchData();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const admin = this.state.admin;
    console.log(admin);
    axios
      .patch(`${apiURL}/api/v1/admin/${this.state.admin._id}`, admin)
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
  handleChange = (e) => {
    let newAdmin = { ...this.state.admin };
    newAdmin[e.target.name] = e.target.value;

    console.log(newAdmin);
    this.setState({
      admin: newAdmin,
    });
  };
  convertString(String) {
    return String.replace(/_/gi, " ");
  }
  handleToggle = (e, index) => {
    e.preventDefault();
    let boolean = null;
    // console.log(e);
    if (this.state.admin.permissions[index].boolean) {
      boolean = false;
    } else {
      boolean = true;
    }

    let newState = { ...this.state.admin };
    newState.permissions[index].boolean = boolean;

    this.setState({
      admin: newState,
    });
    console.log(this.state.admin);
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

  convertTime(timestamp) {
    let d = new Date(timestamp);
    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yyyy = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let time =
      dd +
      "-" +
      mm +
      "-" +
      yyyy +
      " @ " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    return time;
  }

  render() {
    return (
      <div className="background">
        <div className="wrapper">
          <form className="Adetails" onSubmit={this.handleSubmit}>
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
                    <input
                      className="Adetails-head-flex-text-first__name"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.admin && this.state.admin.name}
                    />
                    <select
                      className="Adetails-head-flex-text-first__role"
                      name="role"
                      onChange={this.handleChange}
                      value={this.state.admin && `${this.state.admin.role}`}
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPERADMIN">Super Admin</option>
                    </select>
                    <Icon
                      className="Adetails-head-flex-text-first__badge"
                      glyph="bolt"
                      size={32}
                    />
                    <p className="Adetails-head-flex-text-first__email">
                      {this.state.email && this.state.email}
                    </p>
                  </div>
                  <p className="Adetails-head-flex-text__signin">
                    {this.state.admin &&
                      `Last signin: ${this.state.admin.updatedAt}`}
                  </p>
                </div>
              </div>
              <div className="Adetails-head-flex-icons">
                <Icon
                  className="Adetails-head-flex-icons__delete"
                  onClick={() => {
                    const modalName = `${this.state.admin.name}  ${this.state.admin.role}`;
                    this.showModal(this.state.admin._id, modalName);
                  }}
                  glyph="delete"
                  size={50}
                />
              </div>
            </div>
            <div className="Adetails-permissions">
              <h2 className="Adetails-permissions__title">Permissions</h2>
              <div className="Adetails-permissions-icons">
                {this.state.admin &&
                  this.state.admin.permissions.map((permission, index) => {
                    if (permission.boolean) {
                      this.permission = "Adetails-permissions-icons-each__icon";
                    } else {
                      this.permission = "Adetails-permissions-icons-each__none";
                    }
                    return (
                      <button
                        className="Adetails-permissions-icons-each"
                        onClick={(e) => this.handleToggle(e, index)}
                        key={permission._id}
                      >
                        <Icon
                          className={this.permission}
                          glyph="code"
                          size={60}
                        />
                        <p className="Adetails-permissions-icons-each__name">
                          {this.convertString(permission.name).toLowerCase()}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="Adetails-log">
              <h2 className="Adetails-log__title">Logs</h2>
              <ul className="Adetails-log-list">
                {this.state.admin &&
                  this.state.admin.logs.map((log, index) => {
                    return (
                      <li className="Adetails-log-list__item">
                        {`${this.convertTime(log.timestamp)}: ${log.action}`}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="Adetails-buttons">
              <button
                className="Adetails-buttons__cancel"
                onClick={this.props.history.goBack}
              >
                Cancel
              </button>
              <button className="Adetails-buttons__save" type="submit">
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
export default AdminDetails;
