import "./RecipeReview.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Icon from "supercons";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class RecipeReview extends React.Component {
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
          <section className="recipe">
            <div className="recipe-header">
              <img
                className="recipe-header__img"
                alt="recipe header pic"
                src="../../assets/img/pexels-daria-shevtsova-1095550.jpg"
              />
            </div>
            <div className="recipe-preview">
              <h1 className="recipe-preview__title">
                Abocado toast with poached egg
              </h1>
              <div className="recipe-preview-subheader">
                <h5 className="recipe-preview-subheader__author">
                  Submited by: Jhonny Master
                </h5>
                <Icon
                  className="recipe-preview-subheader__badge"
                  glyph="bolt"
                  size={32}
                />
              </div>
            </div>
            <div className="recipe-ingredients">
              <h2 className="recipe-ingredients__title">Ingredients</h2>
              <ul className="recipe-ingredients-list">
                <li className="recipe-ingredients-list__item">2 0nions</li>
              </ul>
            </div>
            <div className="recipe-steps">
              <h2 className="recipe-steps__title">Details</h2>
              <ul className="recipe-steps-list">
                <li className="recipe-steps-list__item">
                  Step 1: dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default RecipeReview;
