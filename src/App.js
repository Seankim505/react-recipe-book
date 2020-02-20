import React, { Component } from 'react';
import Banner from './components/banner'
import './App.css'

class App extends Component {
  state={ recipeList:[], id:'', name:'', ingredients:'', instructions:'',type:'Breakfast', view:'list',image:''}
  
  render() {
    return (
      <div>
        <Banner></Banner>
      </div>
    );
  }
}

export default App;