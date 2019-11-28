import React from 'react'
import IncidentAction from '../Buttons/IncidentAction'
import { Table } from 'react-bootstrap'

const IncidentTable = props => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Severity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.incidents.length > 0 ? (
          props.incidents.map(incident => (
            <tr key={incident.id}>
              <td>{incident.name}</td>
              <td>{incident.severity}</td>
              <td>
                  {incident.status==='open' ? (<IncidentAction text='Acknowledge' action={props.acceptIncident} actionItem={incident}/>) : (<span></span>)}
                  {' '}
                  {incident.status==='accepted' ? (<IncidentAction text='Resolve' action={props.resolveIncident} actionItem={incident}/>) : (<span></span>)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No incidents</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default IncidentTable