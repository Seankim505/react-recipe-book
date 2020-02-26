import React from 'react';
import { Input } from 'reactstrap';
import { GiKnifeFork } from 'react-icons/gi';

const Banner = (props) => {
    const filterName = (value) => {
        console.log('Filtering by Name');
        props.sortTitles(value);
    }
    const filterType = (value) => {
        console.log('Filtering by Type');
        props.sortTypes(value);
    }

    return (
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>
                <GiKnifeFork />&nbsp;Sean's Cookbook
            </h1>
            <div className="inputContainer">
              <Input className="searchbar" type="text" placeholder="Search Recipe by Name" onChange={(e) => filterName(`${e.target.value}`)}></Input>
              <Input className="selectpicker" type="select" onChange={(e) => filterType(`${e.target.value}`)}>
                <option value="All">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Cocktail">Cocktail</option>
                <option value="Other">Other</option>
              </Input>
            </div>
          </div>
        </div>
     )
}
  
export default Banner;