import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client/react';
import {QUERY_SINGLE_DIVISION} from '../../utils/queries';

import Nav from "../components/Nav";

const Div = () => {
  const {divisionId} = useParams();

  const {loading, error, data} = useQuery(QUERY_SINGLE_DIVISION, {
    variables: {divisionId: divisionId},
  });

  if(loading) {
    return null;
  };

  if(error) {
    return `Error! ${error}`;
  };

  const division = data?.division || {};

  // console.log(division);

  return (
    <div>
      <Nav />
      <h2>{division.day}</h2>
      <h2>{division.name}</h2>
    </div>
  )
}

export default Div;