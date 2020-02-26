import React, { Component } from 'react';
import Banner from './components/Banner';
import RecipeList from './components/RecipeList';
import AddRecipeModal from './components/AddRecipeModal'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortbyType = this.sortbyType.bind(this);
    this.state={ 
      title: '',
      type: ''
    };
  }
  
  sortbyType = (typeValue) => {
    console.log(typeValue)
    this.setState({
      type: typeValue
    });
  }

  sortByTitle(titleValue) {
    console.log(titleValue)
    this.setState({
      title: titleValue
    });
  }

  render() {
    return (
      <div>
        <Banner sortTitles={this.sortByTitle} sortTypes={this.sortbyType}></Banner>
        <AddRecipeModal></AddRecipeModal>
        <RecipeList selectedTitles={this.state.title} selectedTypes={this.state.type}></RecipeList>
      </div>
    );
  }
}

export default App;