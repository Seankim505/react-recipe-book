import React, { Component } from 'react';
import './App.css'
import { API, graphqlOperation } from 'aws-amplify'
import { 
  Card, 
  CardImg, 
  CardDeck, 
  CardBody,
  CardTitle, 
  Button,
  Input,
  Row,
  Form,
  FormGroup,
  FormText,
  Label } from 'reactstrap';
import { getRecipe, listRecipes } from './graphql/queries'
import { createRecipe, deleteRecipe, updateRecipe } from './graphql/mutations'
import { onCreateRecipe, onUpdateRecipe, onDeleteRecipe } from  './graphql/subscriptions'



class App extends Component {
  state={ recipeList:[], id:'', name:'', ingredients:'', instructions:'',type:'Breakfast', view:'list',image:''}
  refreshPage() {
      window.location.reload(false);
    }

  listAllRecipes=async () => {
    try {
      const apiData = await API.graphql(graphqlOperation(listRecipes))
      const recipeList = apiData.data.listRecipes.items
      this.setState({recipeList})
    }catch(error){
      console.log('Error in listAllRecipes',error)
    }
  }

  createRecipe=async () =>{
    try {
      const recipe={ name:'test1', type:'test1', image:'test1.jpg', ingredients:['testIng1','testIng2'], instructions:'test1'}
      await API.graphql(graphqlOperation(createRecipe, {input: recipe}))
      console.log('Employee Record Created')
    } catch (err) {
      console.log('error: ', err)
    }
  }

  delRecipe=async recId=>{
    console.log("Deleting Recipe")
    const input={id:recId}
    await API.graphql(graphqlOperation(deleteRecipe,{input}))
    const apiData = await API.graphql(graphqlOperation(listRecipes))
    const recipeList = apiData.data.listRecipes.items
    this.setState({recipeList})
  }

  onChangeName=e=>{
    this.setState({name:e.target.value})
  }
  onChangeType=e=>{
    this.setState({type:e.target.value})
  }
  onChangeImage=e=>{
    this.setState({ image: e.target.value })
  }
  onChangeIngredients=e=>{
    this.setState({ingredients:e.target.value.split(',')})
  }
  onChangeInstructions=e=>{
    this.setState({instructions:e.target.value})
  }

  viewClick = () => {
    console.log('You Clicked View');
    this.setState({view:'details'});
  }
  editClick = () => {
    console.log('You Clicked Edit');
    this.setState({view:'edit'});
  }
  listClick = () => {
    console.log('You Clicked View');
    this.setState({view:'list'});
  }
  newClick = () => {
    console.log('You Clicked New View');
    this.setState({view:'new'});
  }


  filterName =  () => {
    console.log('Filtering by Name');
  }
  filterType =  () => {
    console.log('Filtering by Type');
  }


  addNewRecipe = () => {
    console.log('Clicked add new recipe');
    this.createRecipe();
  }

  submitRecipe = () => {
    console.log('Clicked submit new recipe');
    this.listClick();
  }

  onSubmit= async e=>  {
    const{name,type,ingredients,instructions,image}=this.state
    if (name === '' || type === '' || ingredients === '' || instructions === '' || image === '') {
      console.log('Not all fields filled out')
      return
    } 
    try {
      const newRecipe = {name,type,ingredients,instructions,image}
      const newRecipeList = [...this.state.recipeList, newRecipe]
      console.log("Creating new Recipe", newRecipe)
      this.setState({ newRecipeList, id:'' ,name: '', type: 'Breakfast',instructions:'',ingredients:'',image:'' })
      await API.graphql(graphqlOperation(createRecipe, {input: newRecipe}))
      console.log('New Recipe Added')
    } catch (err) {
      console.log('error: ', err)
    }

  }

  currentView(props) {
    if (props.view === 'list') {
      return this.listView(props);
    } else if (props.view === 'details') {
      return this.detailView(props);
    } else if (props.view === 'edit') {
      return this.editView(props);
    } else if (props.view === 'new') {
      return this.newView(props);
    }
  }

  detailView(props) {
    return (
      <div>
        Detail View!
      </div>
    )
  }

  editView(props) {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Edit {this.state.recipeList.name}</h1>
          </div>
        </div>
        <div className="container">
          <div>
            <Form className="newRecipeDetails" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Recipe Title</Label>
                <Input placeholder="Title" />
              </FormGroup>
              <FormGroup>
                <Label for="typeSelect">Select a Type</Label>
                <Input type="select" name="select" id="typeSelect">
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Cocktail">Cocktail</option>
                  <option value="Other">Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ingredients">Ingredients</Label>
                <Input type="textarea" name="Ingredients" id="ingredients" />
                <FormText color="muted">
                  Seperate your ingredients using a comma.
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="instructions">Instructions</Label>
                <Input type="textarea" name="instructions" id="instructions" />
              </FormGroup>
              <FormGroup>
                <Label for="recipeIMG">Image for your recipe</Label>
                <Input type="file" name="file" id="recipeIMG" />
                <FormText color="muted">
                  Keep this as a .jpg, .jpeg, or .png please.
                </FormText>
              </FormGroup>
              <Button color="secondary" type="Submit" onClick={this.submitRecipe}>Submit</Button>
              <Button color="secondary" type="Submit" onClick={this.listClick}>Back to List View</Button>
            </Form>
            </div>
          </div>
        </div>
    )
  }

  newView(props) {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Add a New Recipe</h1>
          </div>
        </div>
        <div className="container">
          <div>
            <Form className="newRecipeDetails">
              <FormGroup>
                <Label>Recipe Title</Label>
                <Input placeholder="Name for your recipe here" onChange={this.onChangeName} />
              </FormGroup>
              <FormGroup>
                <Label>Select a Type</Label>
                <Input type="select" onChange={this.onChangeType}>
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
                <Input placeholder="eggs,cheese,butter..." type="textarea" onChange={this.onChangeIngredients}/>
                <FormText color="muted">
                  Seperate your ingredients using a comma.
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Instructions</Label>
                <Input  placeholder="Shake and Bake baby..."type="textarea" onChange={this.onChangeInstructions} />
              </FormGroup>
              <FormGroup>
                <Label for="recipeIMG">Image Url</Label>
                <Input placeholder="https://myImage.com/example" onChange={this.onChangeImage}/>
                <FormText color="muted">
                  Please use a URL format
                </FormText>
              </FormGroup>
              <Button color="secondary" type="Submit" onClick={()=>this.onSubmit(
                {
                  name:this.state.name,
                  type:this.state.type, 
                  ingredients:this.state.ingredients,
                  instructions:this.instructions,
                  image:this.state.image
                } )}>Submit
              </Button>
              <Button color="secondary" onClick={this.listClick}>Back to List View</Button>
            </Form>
            </div>
          </div>
        </div>
    )
  }

  listView(props) {
    this.listAllRecipes();
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Sean's Cookbook Web App</h1>
            <div className="inputContainer">
              <Input className="searchbar" type="text" placeholder="Search by Name" onChange={this.filterName}></Input>
              <Input className="selectpicker" type="select" onChange={this.filterType}>
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
        <div className="container">
          <div className="cardContainer">
            <div className="cardHeaders">
              <Button color="secondary" type="Submit" onClick={this.newClick}>Add New Recipe</Button>
            </div>
            <CardDeck>
              <Row>
                { 
                  this.state.recipeList.map((rec,i)=>(
                  <div key={i} className="col-sm-3">
                    <div key={rec.id} className="listItems">
                      <Card>
                        <CardImg top width="100%" src={rec.image} alt="Card image cap" />
                        <CardBody>
                        <CardTitle>{rec.name}</CardTitle>
                          <Button color="secondary" type="Submit" onClick={this.viewClick}>View</Button>
                          <Button color="secondary" type="Submit" onClick={this.editClick}>Edit</Button>
                          <Button color="danger" type="Submit" onClick={()=>this.delRecipe(rec.id)} style={{float: 'right'}}>X</Button>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  ))
                }
              </Row>
            </CardDeck>
          </div> 
        </div> 
      </div>
   );
  }
  
  render() {
    return (
      <div>
        {this.currentView(this.state)}
      </div>
    );
  }
}

export default App;