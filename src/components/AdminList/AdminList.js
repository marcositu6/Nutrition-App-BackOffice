import "./AdminList.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Icon from "supercons";
import DeleteModal from "../DeleteModal/DeleteModal";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class AdminList extends React.Component {
  // class states =>
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      target: "admin",
    };
  }

  // fetch item data from API and assign it to state
  fetchData() {
    axios
      .get(`${apiURL}/api/v1/admin`)
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
    document.title = "Aurea BO Admin list";
    this.fetchData();
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
        val.name.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return val;
      } else if (key === 8 || key === 46) {
        // val.name.toLowerCase().includes(e.target.value.toLowerCase());
        return val;
      }
    });
    console.log(newList);
    this.setState({ list: newList });
  };
  convertTime(timestamp) {
    let d = new Date(timestamp);
    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yyyy = d.getFullYear();
    let time = dd + "-" + mm + "-" + yyyy;
    return time;
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
                onChange={(e) => this.handleSearch(e)}
              ></input>
            </div>
            {this.state.list &&
              this.state.list.map((admin, index) => {
                console.log(admin);
                return (
                  <div className="Alist-item" key={admin._id}>
                    <Link
                      className="Alist-link"
                      to={`/admin/details/${admin._id}`}
                    >
                      <div className="Alist-item-first">
                        <div className="Alist-item-first-Pholder">
                          <Icon
                            className="Alist-item-first-Pholder__icon"
                            glyph="admin"
                            size={60}
                          />
                        </div>
                        <h2 className="Alist-item-first__name">{`${admin.name}  ${admin.role}`}</h2>
                        <Icon
                          className="Alist-item-first__badge"
                          glyph="bolt"
                          size={16}
                        />
                        <p className="Alist-item-first__email">{admin.email}</p>
                        <p className="Alist-item-first__signin">
                          {`Last signin: ${this.convertTime(admin.updatedAt)}`}
                        </p>
                      </div>
                    </Link>
                    <div className="Alist-item-second">
                      <Icon
                        className="Alist-item-second__delete"
                        onClick={() => {
                          const modalName = `${admin.name}  ${admin.role}`;
                          this.showModal(admin._id, modalName);
                        }}
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
export default AdminList;
