import React from "react";
import style from './Home.module.css'

const Home = ({title,image,ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1 >{title}</h1>
            <img className={style.image} src={image} alt=""></img>
            {/* <ol>
                {ingredients.map(ingredient=>(
                    <li>{ingredient.text}</li>
                ))}
            </ol> */}
        </div>
    )
};

export default Home;
