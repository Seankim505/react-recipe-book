import React, { Component } from 'react';
import './App.css'
import { API, graphqlOperation } from 'aws-amplify'
import { Card, CardImg, CardDeck, CardBody,
  CardTitle, Button } from 'reactstrap';
import { Input , Row} from 'reactstrap';
import { getRecipe, listRecipes } from './graphql/queries'
import { createRecipe, deleteRecipe, updateRecipe } from './graphql/mutations'
import { onCreateRecipe, onUpdateRecipe, onDeleteRecipe } from  './graphql/subscriptions'



class App extends Component {
  state={ recipeList:[], view:'list'}
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

  onChangeName=e=>{
    this.setState({name:e.target.value})
  }
  onChangeType=e=>{
    this.setState({type:e.target.value})
  }
  onChangeImage=e=>{
    this.setState({image:e.target.value})
  }
  onChangeIngredients=e=>{
    this.setState({ingredients:e.target.value})
  }
  onChangeType=e=>{
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
  filterName =  () => {
    console.log('Filtering by Name');
  }
  filterType =  () => {
    console.log('Filtering by Type');
  }
  addNewRecipe = () => {
    console.log('Clicked add new recipe');
    this.createRecipe();
    // this.setState({view:'new'});
  }

  tempFunction = () => {
    this.listAllRecipes();
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

  render() {
    return (
      <div>
        {this.currentView(this.state)}
      </div>
    );
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
        Edit View!
      </div>
    )
  }

  newView(props) {
    return (
      <div>
        New View!
      </div>
    )
  }

  listView(props) {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Sean's React Practice</h1>
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
              <Button color="secondary" type="Submit" onClick={this.addNewRecipe}>Add New Recipe</Button>
              <Button color="secondary" type="Submit" onClick={this.tempFunction}>TempButton</Button>
            </div>
            <CardDeck>
              <Row>
                {
                  this.state.recipeList.map((rec,i)=>(
                  <div className="col-sm-3">
                    <div key={i} className="listItems">
                      <Card>
                        <CardImg top width="100%" src={ require('./Images/bd2.jpg') } alt="Card image cap" />
                        <CardBody>
                        <CardTitle>{rec.id}</CardTitle>
                          <Button color="secondary" type="Submit" onClick={this.editClick}>Edit</Button>
                          <Button color="secondary" type="Submit" onClick={this.viewClick}>View</Button>
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
}

export default App;