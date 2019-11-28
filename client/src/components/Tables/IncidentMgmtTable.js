import React from 'react'
import IncidentAction from '../Buttons/IncidentAction'
import { Table } from 'react-bootstrap'

const IncidentMgmtTable = props => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Severity</th>
          <th>Report date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.incidents.length > 0 ? (
          props.incidents.map(incident => (
            <tr key={incident.id}>
              <td>{incident.name}</td>
              <td>{incident.severity}</td>
              <td>{incident.reportDate.toString().split('T')[0]}</td>
              <td>
                <IncidentAction text='Edit' action={props.editIncident} actionItem={incident}/>
                {' '}
                <IncidentAction text='Delete' action={props.deleteIncident} actionItem={incident}/>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No incidents</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default IncidentMgmtTable