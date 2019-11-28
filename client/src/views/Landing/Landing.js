import React from 'react'
import {Jumbotron, Button} from 'react-bootstrap'

const Landing = props => {

    return (
      <Jumbotron>
      <h1>Welcome!</h1>
      <h3>
        This is a demo applicaton for incident management building through React, Node and Mongo.
      </h3>
      <br/>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
    );
}

export default Landing