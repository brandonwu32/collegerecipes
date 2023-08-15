import "./Menu.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Menu() {
    const [breakfasts, setBreakfasts] = useState([]);
    const [lunches, setLunches] = useState([]);
    const [dinners, setDinners] = useState([]);
    const [desserts, setDesserts] = useState([]);
    let [menuItems, setMenuItems] = useState([]);
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
          let items = [];
          tableEntries.forEach(record => {
            let entry = record.fields;
            let item = {
              item_number: entry["Item Number"],
              dish_name: entry["Dish Name"],
              meal_type: entry["Meal Type"],
              ingredients: entry["Ingredients"],
              steps: entry["Steps"]
            }
            items.push(item)
          });
          setMenuItems(items);
        })
        .catch(err=> console.log(err));
      }, []);
      useEffect(() => {
        menuItems.map(item => {
            if (item.meal_type === "Breakfast"){
                breakfasts.push(item)
            }
            else if (item.meal_type === "Lunch"){
                lunches.push(item)
            }
            else if (item.meal_type === "Dinner"){
                dinners.push(item)
            }
            else if (item.meal_type === "Dessert"){
                desserts.push(item)
            }
        })
      }, [menuItems])
    return (
        <div className="menu">
            <div className="breakfast-items">
                {breakfasts.map(item => (
                    <p>{item.item_number}, {item.dish_name}</p>
                ))}
            </div>
            <div className="breakfast-items">
                {lunches.map(item => (
                    <p>{item.item_number}, {item.dish_name}</p>
                ))}
            </div>
            <div className="breakfast-items">
                {dinners.map(item => (
                    <p>{item.item_number}, {item.dish_name}</p>
                ))}
            </div>
            <div className="breakfast-items">
                {desserts.map(item => (
                    <p>{item.item_number}, {item.dish_name}</p>
                ))}
            </div>
        </div>
    );
}

export default Menu;