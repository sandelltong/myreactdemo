import React from 'react'
import { Button } from 'react-bootstrap'

const IncidentAction = props => (
    <Button
       onClick={() => {
            props.action(props.actionItem)
        }}
        variant="outline-primary" 
        >
        {props.text}
    </Button>
)

export default IncidentAction;