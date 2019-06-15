import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalExample from './activity_modal';


export const GET_POSTS = gql`
  query {
    suggestions {
      key
      activity
      accessibility
      price
      link
      type
    }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>activity</th>
            <th>accessibility</th>
            <th>link</th>
            <th>type</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
            <tr key={data.suggestions.key}>
              <td>{data.suggestions.activity}</td>
              <td>{data.suggestions.accessibility}</td>
              <td>{data.suggestions.link}</td>             
              <td>{data.suggestions.type}</td>
              <td>{data.suggestions.price}</td>
              <ModalExample buttonLabel="Category" data={data.suggestions}>Just do it</ModalExample>
            </tr>          
        </tbody>
      </Table>
    )}
  </Query>
);