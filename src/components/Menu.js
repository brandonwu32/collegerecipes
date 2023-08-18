import "./Menu.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

function Menu() {
    const [breakfasts, setBreakfasts] = useState([]);
    const [lunches, setLunches] = useState([]);
    const [dinners, setDinners] = useState([]);
    const [desserts, setDesserts] = useState([]);
    let [menuItems, setMenuItems] = useState([]);
    const [menuLength, setMenuLength] = useState(0);
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
          setMenuLength(items.length);
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
            <h1 className="menu-title">Menu</h1>
            <div className="top">
                <div className="breakfast-items">
                    <h1>Breakfast</h1>
                    {breakfasts.map(item => (
                        <div>
                            <Fade right>
                                <Link className="item" to = {"/menuitem/" + item.item_number}>
                                    <div className="dish-name">
                                        <p>{item.dish_name}</p>
                                    </div>
                                    <div className="item-number">
                                        <p>{item.item_number}</p>
                                    </div>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
                <div className="lunch-items">
                    <h1>Lunch</h1>
                    {lunches.map(item => (
                        <div>
                            <Fade right>
                                <Link className="item" to = {"/menuitem/" + item.item_number}>
                                    <div className="dish-name">
                                        <p>{item.dish_name}</p>
                                    </div>
                                    <div className="item-number">
                                        <p>{item.item_number}</p>
                                    </div>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bottom">
                <div className="dinner-items">
                    <h1>Dinner</h1>
                    {dinners.map(item => (
                        <div>
                            <Fade right>
                                <Link className="item" to = {"/menuitem/" + item.item_number}>
                                    <div className="dish-name">
                                        <p>{item.dish_name}</p>
                                    </div>
                                    <div className="item-number">
                                        <p>{item.item_number}</p>
                                    </div>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
                <div className="dessert-items">
                    <h1>Dessert</h1>
                    {desserts.map(item => (
                        <div>
                            <Fade right>
                                <Link className="item" to = {"/menuitem/" + item.item_number}>
                                    <div className="dish-name">
                                        <p>{item.dish_name}</p>
                                    </div>
                                    <div className="item-number">
                                        <p>{item.item_number}</p>
                                    </div>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
            </div>
            <h3 className="menu-title">Items: {menuLength}</h3>
        </div>
    );
}

export default Menu;