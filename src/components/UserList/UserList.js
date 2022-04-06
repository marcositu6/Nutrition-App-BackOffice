import "./UserList.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class UserList extends React.Component {
  // class states =>
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      show: false,
      target: "patient",
      id: "",
      name: "",
    };
    // Bind this to function hide / show modal so it's assigned to the state
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  // fetch item data from API and assign it to state
  fetchData() {
    axios
      .get(`${apiURL}/api/v1/patient`)
      .then(async (response) => {
        let emails = response.data.data.map((user) =>
          this.fetchEmail(user.user)
        );
        emails = await Promise.all(emails);
        console.log(emails);
        response.data.data.forEach(
          (each, index) => (each.email = emails[index].data.email)
        );
        this.setState({
          list: response.data.data,
        });
      })
      .catch((err) => console.log(err));
  }

  fetchEmail(user) {
    return axios
      .get(`${apiURL}/api/v1/users/${user}`)
      .catch((err) => console.log(err));
  }
  // calls fetch data once component is mounted
  componentDidMount() {
    // change tittle of webpage
    document.title = "Aurea BO User list";
    this.fetchData();
  }
  convertTime(timestamp) {
    let d = new Date(timestamp);
    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yyyy = d.getFullYear();
    let time = dd + "-" + mm + "-" + yyyy;
    return time;
  }
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
  handleSearch = (e) => {
    var key = e.charCode;
    console.log(e.keyCode);
    let newList = this.state.list.filter((val) => {
      if (e.target.value === "") {
        return val;
      } else if (
        val.firstName.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return val;
      } else if (key === 8 || key === 46) {
        // val.firstName.toLowerCase().includes(e.target.value.toLowerCase());
        return val;
      }
    });
    console.log(newList);
    this.setState({ list: newList });
  };

  render() {
    console.log(this.state.list);
    return (
      <div className="background">
        <div className="wrapper">
          <section className="Ulist">
            <div className="Ulist-head">
              <Icon className="Ulist-head__icon" glyph="search" size={20} />
              <input
                className="Ulist-head__searchbar"
                placeholder="Search..."
                onChange={(e) => this.handleSearch(e)}
              ></input>
            </div>
            {this.state.list &&
              this.state.list.map((user, index) => {
                if (user.isSubscribed) {
                  this.badge = "Ulist-item-first__badge";
                } else {
                  this.badge = "Ulist-item-first__none";
                }
                return (
                  <div className="Ulist-item" key={user._id}>
                    <Link
                      className="Ulist-link"
                      to={`/users/details/${user._id}`}
                    >
                      <div className="Ulist-item-first">
                        <div className="Ulist-item-first-Pholder">
                          <Icon
                            className="Ulist-item-first-Pholder__icon"
                            glyph="profile"
                            size={40}
                          />
                        </div>
                        <h2 className="Ulist-item-first__name">
                          {`${user.firstName}  ${user.lastName}`}
                        </h2>
                        <Icon
                          className={`${this.badge}`}
                          glyph="bolt"
                          size={16}
                        />
                        <p className="Ulist-item-first__email">{user.email}</p>
                        <p className="Ulist-item-first__signin">
                          {`Last signin: ${this.convertTime(user.updatedAt)}`}
                        </p>
                      </div>
                    </Link>
                    <div className="Ulist-item-second">
                      <Icon
                        className="Ulist-item-second__delete"
                        onClick={() => {
                          const modalName = `${user.firstName}  ${user.lastName}`;
                          this.showModal(user._id, modalName);
                        }}
                        glyph="delete"
                        size={32}
                      />
                      <Link
                        className="Ulist-link"
                        to={`/users/details/${user._id}`}
                      >
                        <Icon
                          className="Ulist-item-second__edit"
                          glyph="edit"
                          size={32}
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </section>
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
export default UserList;
