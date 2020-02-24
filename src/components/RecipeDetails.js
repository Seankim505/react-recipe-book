import React from 'react';
import { Media } from 'reactstrap';
import { ListGroup, ListGroupItem, Label } from 'reactstrap';

let imgStyle = {
  maxWidth: "256px",
  maxHeight: "256px",
  textAlign: "center",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%"
};

const RecipeDetails = (props) => {

  return (
    <div>
      <div >
        <Media object style={imgStyle} src={props.rec.image} alt="Image not found" />
        <Label>Ingredients:</Label>
        <ListGroup className="list-item">
          { 
            props.rec.ingredients.map((rec,i)=>(
              <ListGroupItem>{rec}</ListGroupItem>
            ))
          }
        </ListGroup>
        <div>&nbsp;</div>
        <Label>Instructions:</Label>
          <ListGroupItem>
            {props.rec.instructions}
          </ListGroupItem>
        <div>&nbsp;</div>
        <Label>Type:</Label>
        <ListGroupItem>
          {props.rec.type}
        </ListGroupItem>
      </div>
    </div>
  )
}

export default RecipeDetails;
