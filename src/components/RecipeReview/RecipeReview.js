import "./RecipeReview.scss";
import axios from "axios";
import React from "react";
const PORT = "8080";
const apiURL = `http://localhost:${PORT}`;

class RecipeReview extends React.Component {
  // class states =>
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }

  // fetch item data from API and assign it to state (also changes var for badge element)
  fetchData() {
    axios.get(`${apiURL}/api/v1/recipes`).then((response) => {
      console.log(response.data.data);

      this.setState({
        list: response.data.data.filter((recipe) => {
          if (!recipe.isAccepted) {
            return true;
          }
        }),
      });
    });
  }

  componentDidMount() {
    // change tittle of webpage
    document.title = "Aurea BO Recipe Review";
    this.fetchData();
  }
  convertString(String) {
    return String.replace(/_/gi, " ");
  }
  millisToMinutes(millis) {
    const minutes = Math.floor(millis / 60000);
    return minutes;
  }
  handleSave(e, id) {
    e.preventDefault();
    axios
      .patch(`${apiURL}/api/v1/recipes/${id}`, { isAccepted: "true" })
      .then((response) => {
        console.log(response);
        console.log("Saved");
      });
  }
  handleDiscard(e, id) {
    e.preventDefault();
    axios.delete(`${apiURL}/api/v1/recipes/${id}`).then((response) => {
      console.log(response);
      console.log("Deleted");
    });
  }

  render() {
    return (
      <div className="background">
        <div className="wrapperRecipe">
          {this.state.list &&
            this.state.list.map((recipe, index) => {
              return (
                <section className="recipe" key={recipe._id}>
                  <div className="recipe-header"></div>
                  <div className="recipe-preview">
                    <h1 className="recipe-preview__title">{recipe.name}</h1>
                    <div className="recipe-preview-subheader">
                      <h5 className="recipe-preview-subheader__author">
                        {`Dificulty: ${recipe.complexity.toLowerCase()}`}
                      </h5>
                      <h5 className="recipe-preview-subheader__author">
                        {`Duration: ${this.millisToMinutes(
                          recipe.durationMs
                        )} minutes`}
                      </h5>
                    </div>
                  </div>
                  <div className="recipe-ingredients">
                    <h2 className="recipe-ingredients__title">Ingredients</h2>
                    <ul className="recipe-ingredients-list">
                      {this.state.list &&
                        recipe.ingredients.map((ingredient, index) => {
                          return (
                            <li
                              className="recipe-ingredients-list__item"
                              key={ingredient._id}
                            >
                              {`${ingredient.quantity.value} ${ingredient.quantity.unit}:  ${ingredient.foodName}`}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="recipe-steps">
                    <h2 className="recipe-steps__title">Details</h2>
                    <ul className="recipe-steps-list">
                      {this.state.list &&
                        recipe.steps.map((step, index) => {
                          if (step.cookingAction === "CUT") {
                            return (
                              <li
                                className="recipe-steps-list__item"
                                key={step._id}
                              >
                                {`${step.cookingAction} in ${step.instructions[0].cuttingTechnique} ${step.ingredients[0].quantity.value} ${step.ingredients[0].foodName}`}
                              </li>
                            );
                          } else if (step.cookingAction === "PAN") {
                            return (
                              <li
                                className="recipe-steps-list__item"
                                key={step._id}
                              >
                                {`Heat a ${step.cookingAction} at ${
                                  step.instructions[0].intensity
                                } heat, add ${
                                  step.ingredients[0].quantity.value
                                } ${
                                  step.ingredients[0].foodName
                                } for ${this.millisToMinutes(
                                  step.instructions[0].complete
                                )} minutes`}
                              </li>
                            );
                          } else {
                            return (
                              <li
                                className="recipe-steps-list__item"
                                key={step._id}
                              >
                                {`${this.convertString(step.cookingAction)}: ${
                                  step.instructions[0].details
                                }`}
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                  <h5 className="recipe-footer">
                    {`Serving Temperature: ${this.convertString(
                      recipe.servingTemperature.toLowerCase()
                    )}`}
                  </h5>
                  <div className="recipe-buttons">
                    <button
                      className="recipe-buttons__cancel"
                      onClick={(e) => this.handleDiscard(e, recipe._id)}
                    >
                      Discard Recipe
                    </button>
                    <button
                      className="recipe-buttons__save"
                      onClick={(e) => this.handleSave(e, recipe._id)}
                    >
                      Save Recipe
                    </button>
                  </div>
                </section>
              );
            })}
        </div>
      </div>
    );
  }
}
export default RecipeReview;
