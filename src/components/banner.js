import React from 'react';
import { Input } from 'reactstrap';
import { GiKnifeFork } from 'react-icons/gi';

const Banner = (props) => {
    const filterName = () => {
        console.log('Filtering by Name');
    }
    const filterType = () => {
        console.log('Filtering by Type');
    }

    return (
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>
                <GiKnifeFork />&nbsp;Sean's Cookbook
            </h1>
            <div className="inputContainer">
              <Input className="searchbar" type="text" placeholder="Search Recipe by Name" onChange={() => filterName}></Input>
              <Input className="selectpicker" type="select" onChange={() => filterType}>
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