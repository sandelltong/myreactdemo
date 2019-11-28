import React, { useState, useEffect } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'

const IncidentForm = props => {
    const [ incident, setIncident ] = useState(props.currentIncident)

    useEffect(
        () => {
            setIncident(props.currentIncident);
        },
        [ props ]
    )
    
    const handleInputChange = event => {
        const { name, value } = event.target
        setIncident({ ...incident, [name]: value })
    }


    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>             
            <Form noValidate onSubmit={event => {
                event.preventDefault();    
                props.updateIncident(incident.id, incident)
            }}
            >            
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="incidentName">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control name="name" type="text" value={incident.name || ''}  onChange={handleInputChange} placeholder="Input incident name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="incidentName">
                        <Form.Label column sm="2">Severity</Form.Label>
                        <Col sm="10">
                            <Form.Control name="severity" type="text" value={incident.severity || ''} onChange={handleInputChange} placeholder="Input incident severity"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="incidentName">
                        <Form.Label column sm="2">Status</Form.Label>
                        <Col sm="10">
                            <Form.Control name="status" type="text" value={incident.status || ''} onChange={handleInputChange} placeholder="Input incident status"/>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default IncidentForm