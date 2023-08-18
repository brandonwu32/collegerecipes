import './FoodItem.css';
import { useState, useEffect } from "react";
import axios from "axios";
import arrow from "../static/arrow.svg";
import {Link, useLocation } from "react-router-dom";
import Fade from "react-reveal/Fade";

function FoodItem(props) {
    const location = useLocation();
    const { fromNumber } = location.state;
    console.log(fromNumber);
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
          setPages(tableEntries.length);
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
            if (item.item_number === parseInt(fromNumber)){
                setItem(item);
            }
          });
        })
        .catch(err=> console.log(err));
      }, [fromNumber]);
      function oneUp(){
        if (parseInt(fromNumber) === pages) {
            alert("This is the last page of the cookbook");
            return
        }
    }
      function oneDown(){
        if (parseInt(fromNumber) === 1){
            console.log(window.location.pathname)
            window.location.href = window.location.pathname.replace("menuitem/" + fromNumber, "home")
            return
        }
        window.location.href = window.location.pathname.replace(fromNumber, parseInt(fromNumber) - 1)
      }
      function Bullet(text) {
        let list = text.split("-").slice(1,);
        let bulletList = []
        list.map(bullet => {bulletList.push(<p className = "bullet">&bull; {bullet.trim()}</p>);
    return (null)});
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
                <Link to = "/menuitem" state={{fromNumber: fromNumber + 1}}><img className = "arrow-right" src = {arrow} alt = "none"></img></Link>
                <Link to = "/menuitem" state={{fromNumber: fromNumber - 1}}><img className = "arrow-left" src = {arrow} alt = "none"></img></Link>
                <Fade right>
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
                </Fade>
            </div>
            );
        }

      }, [item])

    return (
        <div>{itemValues}</div>
    );
}

export default FoodItem;