import { StarWarsAutocomplete } from "./components/templates/StarWarsAutocomplete/StarWarsAutocomplete";
import "./App.css";

export const App = () => {
  return (
    <div className="app">
      <h1>Search a Star Wars character!</h1>
      <StarWarsAutocomplete />
    </div>
  );
};
