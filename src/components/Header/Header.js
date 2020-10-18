import React from 'react';
import './Header.scss';
import { Typography } from 'antd';


const Header = props => {
  const { Title } = Typography;
  return (
    <header className="App-header">
      <Title level={1}>Discogs Catalogue</Title>
    </header>
  )
}

export default Header;