import React, { useState, useEffect } from 'react'
import IncidentTable from '../../components/Tables/IncidentTable'
import axios from "axios";

axios.defaults.baseURL = window.location.origin;

const Incident = props => {
  const incidentsData = []
  const [ incidents, setIncidents ] = useState(incidentsData);
  
  useEffect(
    () => {
        fetchDataFromServer();
    },
    [props]
  )

  const fetchDataFromServer = async () => {
      try {      
          const response = await axios.get('/api/incidents');
          setIncidents(response.data.incidents);
          return response.data;
        }
        catch (error) {
          console.error(error);
        }
  }

  const acceptIncident = async (incident) => {
    var findIncident = incidents.find(item => item.id === incident.id);
    findIncident.status = 'accepted';
    try {
      await axios.put('/api/incidents/update', {        
          id: incident.id,
          update: incident
      });
      fetchDataFromServer();
    }
    catch(error) {
        console.error(error);
    }  
  }
    
	const resolveIncident = async (incident) => {
    var findIncident = incidents.find(item => item.id === incident.id);
    findIncident.status = 'resolved';
    try {
      await axios.put('/api/incidents/update', {        
          id: incident.id,
          update: incident
      });
      fetchDataFromServer();
    }
    catch(error) {
        console.error(error);
    }      
	}
    
  return (
    <div>
      <IncidentTable incidents={incidents} acceptIncident={acceptIncident} resolveIncident={resolveIncident}/>
    </div>
  );
}

export default Incident;