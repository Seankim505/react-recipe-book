import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { CardDeck, Row} from 'reactstrap';
import Recipe from './Recipe'
import { listRecipes } from '../graphql/queries'

class RecipeList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipeList: [],
      searchList: []
    }
    console.log('RecipeList constructor')
    this.listAllRecipes();
  }

  listAllRecipes = async () => {
    console.log('getting all recipes')
    try {
      const apiData = await API.graphql(graphqlOperation(listRecipes))
      const recipeList = apiData.data.listRecipes.items
      this.setState({recipeList:recipeList, searchList:recipeList})
    } catch(error) {
      console.log('Error in listAllRecipes',error)
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(oldProps.selectedTitles !== newProps.selectedTitles) {
      this.searchForTitles(newProps);
    }

    if(oldProps.selectedTypes !== newProps.selectedTypes) {
      this.searchForTypes(newProps)
    }
  }
  
  searchForTitles(newProps) {
    let fullArray = this.state.recipeList;
    let tempArray = [];

    fullArray.forEach(function (arrayItem) {
      if (arrayItem.name.toLowerCase().includes(newProps.selectedTitles.toLowerCase())) {
        tempArray.push(arrayItem);
      }
  });
  this.setState({searchList: tempArray})
  }

  searchForTypes(newProps) {
    let fullArray = this.state.recipeList;
    let tempArray = [];

    if (newProps.selectedTypes == 'All') {
      this.setState({searchList: fullArray})
      return;
    }

    fullArray.forEach(function (arrayItem) {
      if (arrayItem.type.includes(newProps.selectedTypes)) {
        tempArray.push(arrayItem);
      }
  });
  this.setState({searchList: tempArray})
  }

  render(){
    return (
      <div className="container">
        <div className="cardContainer">
          <CardDeck>
            <Row>
                { 
                  this.state.searchList.map((rec,i)=>(
                  <Recipe key={{i}} recipeData={{rec}}></Recipe>
                ))
              }
            </Row>
          </CardDeck>
        </div> 
      </div> 
    )
  }
    
}
  
export default RecipeList;