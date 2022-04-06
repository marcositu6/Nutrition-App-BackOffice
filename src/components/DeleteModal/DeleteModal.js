import "./DeleteModal.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

const ModalDelete = ({ handleClose, show, name, id, target }) => {
  // change class to show/hide based on show state passed with props
  const showHideClassName = show
    ? "modal-wrapper display-flex"
    : "modal-wrapper display-none";

  // Axios call to delete user depending on the props passed down
  function handleDelete() {
    console.log(id);
    axios
      .delete(`${apiURL}/api/v1/${target}/${id}`)
      .then((res, req) => {
        if (res.status === 200) {
          console.log("deleted");
          console.log(res);
          handleClose();
        }
      })
      .catch((err) => {
        //catch in case of error console log it
        console.log(err);
      });
  }

  return (
    <div role="button" className={showHideClassName}>
      <div className="modal-item">
        <button className="modal-item__close" onClick={handleClose}>
          <Icon
            className="modal-item__close-icon"
            glyph="view-close-small"
            size={35}
          />
        </button>
        <div className="modal-item-text">
          <h1 className="modal-item-text__title">
            {`Delete ${name} from the dataBase?`}
          </h1>
          <p className="modal-item-text__description">
            {`Please confirm that you’d like to delete ${name}. You won’t be able to undo this action.`}
          </p>
        </div>
        <div className="modal-item-buttons">
          <button className="modal-item-buttons__cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="modal-item-buttons__delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ModalDelete);
