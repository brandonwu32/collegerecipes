import './FoodItem.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import arrow from "../static/arrow.svg";

function FoodItem() {
    const { itemNumber } = useParams();
    const [item, setItem] = useState(null);
    const [pages, setPages] = useState(0)
    const [itemValues, setItemValues] = useState(null);
    useEffect(() => {
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_BASE_ID}/${process.env.REACT_APP_RECIPES_TOKEN}`;
        const config = {
          headers : {
            "Authorization" : `Bearer ${process.env.REACT_APP_PERSONAL_TOKEN}`,
          }
        };
        axios.get(url, config)
        .then(res => {
          let tableEntries = res.data.records;
          tableEntries.forEach(record => {
            let entry = record.fields;
            let item = {
              item_number: entry["Item Number"],
              dish_name: entry["Dish Name"],
              meal_type: entry["Meal Type"],
              ingredients: entry["Ingredients"],
              steps: entry["Steps"],
              image: entry["Image"]
            }
            if (item.item_number === parseInt(itemNumber)){
                setItem(item);
            }
          });
        })
        .catch(err=> console.log(err));
      }, []);
      function oneUp(number){
        window.location.href = window.location.pathname.replace(itemNumber, parseInt(itemNumber) + 1)
      }
      useEffect(() => {
        if (item !== null){
            setItemValues(
            <div>
                {item.item_number}
                {item.dish_name}
                {item.ingredients}
                {item.steps}
                <img className = "foodpic" src = {item.image} alt = "none"></img>
                <img className = "right-arrow" onClick = {() => {oneUp()}} src = {arrow} alt = "none"></img>
            </div>
            );
        }

      }, [item])
    return (
        <div>{itemValues}</div>
    );
}

export default FoodItem;