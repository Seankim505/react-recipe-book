import React, { Component } from 'react';
import Banner from './components/Banner';
import RecipeList from './components/RecipeList';
import AddRecipeModal from './components/AddRecipeModal'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={ 
      id:'', 
      name:'', 
      ingredients:'', 
      instructions:'',
      type:'Breakfast', 
      view:'list',
      image:''
    }
  }
  
  render() {
    return (
      <div>
        <Banner></Banner>
        <AddRecipeModal></AddRecipeModal>
        <RecipeList></RecipeList>
      </div>
    );
  }
}

export default App;