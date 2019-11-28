import React, { useState, useEffect } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import IncidentMgmtTable from '../../components/Tables/IncidentMgmtTable'
import IncidentForm from '../../components/Forms/IncidentForm'
import DeleteIncidentDialog from '../../components/Dialogs/DeleteIncidentDialog'
import axios from "axios";
import API_URL from '../../config'

const Admin = props => {
    const incidentsData = [];
    const formTitles =['Add incident', 'Edit incident']
    const initialIncident = { id: null, name: '', severity: '', status:'open', reportDate: new Date(0) };

    const [ incidents, setIncidents ] = useState(incidentsData);
    const [ currentIncident, setCurrentIncident ] = useState(initialIncident);  
    const [ toBeDeletedIncident, setDeleteIncident ] = useState({}); 
    const [ formTitle, setFormTitle ] = useState(formTitles[0]);
    const [ show, setShow ] = useState(false);
    const [ deleteShow, setDeleteShow ] = useState(false);

    useEffect(
        () => {
            fetchDataFromServer();
        },
        [props]
    )

    const fetchDataFromServer = async () => {
        try {      
            console.log(API_URL)
            const response = await axios.get(API_URL + '/api/incidents');
            setIncidents(response.data.incidents);
            return response.data;
          }
          catch (error) {
            console.error(error);
          }
    }

    const addIncident = () => {
        setCurrentIncident(initialIncident);        
        setFormTitle(formTitles[0]);
        handleShow();
    }
    
    const editIncident = incident => {                
        setFormTitle(formTitles[1]);
        setCurrentIncident(incident)
		handleShow();
    }
    
	const deleteIncident = incident => {
        setDeleteIncident(incident);        
        setDeleteShow(true);
    }
    
	const updateIncident = async (id, updatedIncident) => {   
        if (id === null) {
            try {
                await axios.post(API_URL + '/api/incidents', updatedIncident);
                fetchDataFromServer();
            }
            catch(error) {
                console.error(error);
            }
        }
        else {
            try {
                console.log(id)
                await axios.put(API_URL + '/api/incidents/update', {        
                    id: id,
                    update: updatedIncident
                });
                fetchDataFromServer();
            }
            catch(error) {
                console.error(error);
            }
            // setIncidents(incidents.map(incident => (incident.id === id ? updatedIncident : incident)));
        }
        handleClose();
	}

    const handleDeleteConfirm = async (deletedIncident) => {
        console.log('delete...')
        console.log(deletedIncident);
        // setIncidents(incidents.filter(incident => incident.id !== deletedIncident.id));   
        try {
            await axios.delete(API_URL + '/api/incidents/delete', { data: {
                id: deletedIncident.id
              }
            });
            fetchDataFromServer();
        }
        catch(error) {
            console.error(error);
        }
        setDeleteShow(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    const handleDeleteCancel = () => setDeleteShow(false);

    return (
        <div>
            <ButtonToolbar>
                <Button variant="primary" size="lg" active onClick={addIncident}>
                    Add incident
                </Button>
            </ButtonToolbar>
            <br/>
			<IncidentMgmtTable incidents={incidents} deleteIncident={deleteIncident} editIncident={editIncident}/>            
            <IncidentForm currentIncident={currentIncident} updateIncident={updateIncident} show={show} handleClose={handleClose} title={formTitle}/>
            <DeleteIncidentDialog incident={toBeDeletedIncident} show={deleteShow} handleCancel={handleDeleteCancel} handleConfirm={handleDeleteConfirm}/>
        </div>
    );
}

export default Admin;