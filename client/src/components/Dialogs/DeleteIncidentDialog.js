import React, { useState, useEffect }  from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteIncidentDialog = props => {    
    const [ incident, setIncident ] = useState(props.incident)

    useEffect(
        () => {            
            setIncident(props.incident);
        },
        [ props ]
    )
    
    return (
        <Modal show={props.show} onHide={props.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Delete incident</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to delete the incident with name '{incident.name}'!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCancel}>
                Cancel
                </Button>
                <Button variant="primary" onClick={() => {props.handleConfirm(incident)}}>
                Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteIncidentDialog