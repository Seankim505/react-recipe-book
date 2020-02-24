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
import { updateRecipe } from '../graphql/mutations'

class EditRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.recipeDetails.id,
      name: props.recipeDetails.name,
      type: props.recipeDetails.type,
      image: props.recipeDetails.image,
      ingredients: props.recipeDetails.ingredients,
      instructions: props.recipeDetails.instructions,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  updateRecipe = async () => {
    console.log('Updating Recipe in DB')
    try {
      let ingredients = this.state.ingredients
      let ingredientArray;
      if (typeof ingredients === 'string' && ingredients.includes(',')) {
        ingredientArray = ingredients.split(',');
      } else {
        console.log(typeof ingredients)
        ingredientArray = ingredients;
      }
      let recipe = {
        id: this.state.id,
        name: this.state.name,
        type: this.state.type,
        image: this.state.image,
        ingredients: ingredientArray,
        instructions: this.state.instructions
      }
      await API.graphql(graphqlOperation(updateRecipe, {input: recipe}))
    } catch(error) {
      console.log('Error in updateRecipe',error)
    }
  }

  render() {
    return (
      <Form className="newRecipeDetails" onSubmit={() => this.updateRecipe()}>
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
          <Button color="primary" type="submit">Update Recipe</Button>{' '}
          <Button color="secondary" onClick={this.props.formToggle}>Cancel</Button>
        </ModalFooter>
        </FormGroup>
      </Form>
    ) 
  }
}

export default EditRecipeForm;