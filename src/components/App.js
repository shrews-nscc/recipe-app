import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Favorites from "./pages/Favorites";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import axios from 'axios'

function App() {
  const APP_ID = "faeba007";
  const APP_KEY = "7779fa44d40a797ab15ab9baab3a72f0";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    getRecipes();
  }, [query]);

  const [healthLabels, sethealthLabels] = useState("vegan");
  const [numberRecipe, setNumberRecipe] = useState(6);
  //fetch dataBase
  const getRecipes = async () => {
    var response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=6&calories=0-2000&health=${healthLabels}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    numberRecipe = 6;
  };




 const loadMoreData = async() =>{
  console.log('load more data');
  setNumberRecipe (numberRecipe + 6);
   var response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${numberRecipe}&to=${numberRecipe + 6 }&calories=0-2000&health=${healthLabels}`
  );
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);

 }
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={Home} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/userProfile" element={<UserProfile />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Router>

      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by food name"
          value={search}
          onChange={updateSearch}
        />
        {/* <button className="search-button" type="submit">
        
        </button> */}

        <select className="app-healthLabels">
          <option onClick={() => sethealthLabels("vegan")}>Vegan</option>
          <option onClick={() => sethealthLabels("dairy-free")}>
            dairy-free
          </option>
          <option onClick={() => sethealthLabels("gluten-free")}>
            gluten-free
          </option>
          <option onClick={() => sethealthLabels("wheat-free")}>
            wheat-free
          </option>
          <option onClick={() => sethealthLabels("vegetarian")}>
            vegetarian
          </option>
          <option onClick={() => sethealthLabels("paleo")}>paleo</option>
          <option onClick={() => sethealthLabels("alcohol-free")}>
            alcohol-free
          </option>
        </select>
      </form>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Home
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <button id='button' onClick={loadMoreData} >Not what are you looking for?</button>
    </div>
  );
}

export default App;