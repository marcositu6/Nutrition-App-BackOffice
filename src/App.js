import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AdminDetails from "./components/AdminDetails/AdminDetails";
import AdminList from "./components/AdminList/AdminList";
import PageHeader from "./components/PageHeader/PageHeader";
import RecipeReview from "./components/RecipeReview/RecipeReview";
import UserDetails from "./components/UserDetails/UserDetails";
import UserList from "./components/UserList/UserList";

function App() {
  return (
    <div className="app">
      <div className="mainWrapper">
        <Router>
          <Route path="/" component={PageHeader} />
          <Switch>
            <Route path="/users" exact component={UserList} />
            <Route path="/users/details" component={UserDetails} />
            <Route path="/recipe/review" component={RecipeReview} />
            <Route path="/admins" component={AdminList} />
            <Route path="/admin/details" component={AdminDetails} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
