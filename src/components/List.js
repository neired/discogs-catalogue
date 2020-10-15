import React from 'react';
import { Link } from 'react-router-dom';

const List = props => {
  const {data} = props;
    return (
      <ol>
        {data.map(item => { 
          return (
            <li key={item.id}>
              <Link to={`/${item.type}/${item.id}`} className="">
                <p>{item.title}, {item.id}, {item.resource_url}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    )
}

export default List;