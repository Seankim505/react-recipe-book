import React from 'react';
import EditRecipeForm from './EditRecipeModal'
import ViewModal from './ViewRecipe'
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import { API, graphqlOperation } from 'aws-amplify'
import { deleteRecipe} from '../graphql/mutations'

const Recipe = (props) => {

  const tossRecipe = async (recipeID) => {
    console.log('deleting Recipe with ID: '+ recipeID)
    try {
      const input={id:recipeID}
      await API.graphql(graphqlOperation(deleteRecipe,{input}))
      window.location.reload(false);
    } catch(err) {
      console.log('error ' + err)
    }
    
  }

  return (
    <div key={props.recipeData.rec.id} className="col-sm-3">
      <div className="listItems">
        <Card>
          <CardImg top width="100%" src={props.recipeData.rec.image} alt="Card image cap" />
          <CardBody>
          <CardTitle>{props.recipeData.rec.name}</CardTitle>
          <span>
            <ViewModal rec={props.recipeData.rec}></ViewModal>
            <EditRecipeForm recipeDetails={props.recipeData.rec}></EditRecipeForm>
            <Button color="danger" onClick={() => tossRecipe(props.recipeData.rec.id)} style={{float: 'right'}}>X</Button>
          </span>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Recipe;
