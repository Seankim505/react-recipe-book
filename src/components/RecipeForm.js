import React, { Component } from 'react';
import { 
  Button,
  Input,
  Form,
  FormGroup,
  FormText,
  ModalFooter,
  Label } from 'reactstrap';
import { API, graphqlOperation } from 'aws-amplify'
import { createRecipe } from '../graphql/mutations'

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      image: '',
      ingredients: [],
      instructions: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  addNewRecipe = async () => {
    console.log('Adding Recipe to DB')
    try {
      let ingredients = this.state.ingredients
      let ingredientArray = ingredients.split(',');
      console.log(ingredientArray)
      let recipe = {
        name: this.state.name,
        type: this.state.type,
        image: this.state.image,
        ingredients: ingredientArray,
        instructions: this.state.instructions
      }
      await API.graphql(graphqlOperation(createRecipe, {input: recipe}))
    } catch(error) {
      console.log('Error in listAllRecipes',error)
    }
  }

  render() {
    return (
      <Form className="newRecipeDetails" onSubmit={() => this.addNewRecipe()}>
        <div className="newRecipeInputs">
          <FormGroup>
            <Label>Recipe Title</Label>
            <Input 
              name='name'
              placeholder="Name for your recipe here" 
              value={this.state.name}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Select a Type</Label>
            <Input 
              name='type'
              type="select" 
              value={this.state.type} 
              onChange={this.handleChange}>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Cocktail">Cocktail</option>
              <option value="Other">Other</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Ingredients</Label>
            <Input 
              name='ingredients'
              placeholder="eggs,cheese,butter..." 
              type="textarea" 
              value={this.state.ingredients}
              onChange={this.handleChange}/>
            <FormText color="muted">
              Seperate your ingredients using a comma.
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label>Instructions</Label>
            <Input 
              name='instructions'
              placeholder="Shake and Bake baby..."
              type="textarea" 
              value={this.state.instructions}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="recipeIMG">Image Url</Label>
            <Input 
              name='image'
              placeholder="https://myImage.com/example" 
              value={this.state.image}
              onChange={this.handleChange}/>
          </FormGroup>
        </div>
        <FormGroup>
        <ModalFooter>
          <Button color="primary" type="submit">Add New Recipe</Button>{' '}
          <Button color="secondary" onClick={this.props.formToggle}>Cancel</Button>
        </ModalFooter>
        </FormGroup>
      </Form>
    ) 
  }
}

export default RecipeForm;