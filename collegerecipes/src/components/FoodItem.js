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
      function oneUp(){
        window.location.href = window.location.pathname.replace(itemNumber, parseInt(itemNumber) + 1)
      }
      function oneDown(){
        if (parseInt(itemNumber) === 1){
            window.location.href = window.location.pathname.replace("menuitem/" + itemNumber, "")
            return
        }
        window.location.href = window.location.pathname.replace(itemNumber, parseInt(itemNumber) - 1)
      }
      function Bullet(text) {
        let list = text.split("-")
        let bulletList = []
        list.map(bullet => {bulletList.push(<p className = "bullet">&bull; {bullet}</p>)});
        return (
            <div className = "list">
                {bulletList}
            </div>
        );
      }
      useEffect(() => {
        if (item !== null){
            setItemValues(
            <div className = "food-item">
                <img className = "arrow-right" onClick = {() => {oneUp()}} src = {arrow} alt = "none"></img>
                <img className = "arrow-left" onClick = {() => {oneDown()}} src = {arrow} alt = "none"></img>
                <div className = "food-item-body">
                    <div className = "food-item-top">
                        <div className = "dish">
                            {item.dish_name}
                        </div>
                        <div className = "page-number">
                            {item.item_number}
                        </div>
                    </div>
                    <div className = "food-item-middle">
                        <img className = "foodpic" src = {item.image} alt = "none"></img>
                        <div className = "ingredients">
                            <h1 className = "food-item-title">Ingredients</h1>
                            {Bullet(item.ingredients)}
                        </div>
                    </div>
                    <div className = "food-item-bottom">
                        <div className = "steps">
                            <h1 className = "food-item-title">Steps</h1>
                            {Bullet(item.steps)}
                        </div>
                    </div>
                </div>
            </div>
            );
        }

      }, [item])

    return (
        <div>{itemValues}</div>
    );
}

export default FoodItem;