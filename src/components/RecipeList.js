import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { CardDeck, Row} from 'reactstrap';
import Recipe from './Recipe'
import { listRecipes } from '../graphql/queries'

class RecipeList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipeList: []
    }
    this.listAllRecipes();
  }

  listAllRecipes = async () => {
    console.log('getting all recipes')
    try {
      const apiData = await API.graphql(graphqlOperation(listRecipes))
      const recipeList = apiData.data.listRecipes.items
      this.setState({recipeList})
    } catch(error) {
      console.log('Error in listAllRecipes',error)
    }
  }

  componentDidMount() {}

  render(){
    return (
      <div className="container">
        <div className="cardContainer">
          <CardDeck>
            <Row>
              { 
                this.state.recipeList.map((rec,i)=>(
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