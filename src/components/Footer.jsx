import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppFooter from './bootstrap/components/AppFooter';

class Footer extends Component {
  render () {
    return (
      <AppFooter className="Footer text-center">
        <Link to="/about">Learn more</Link> about the bionet.
      </AppFooter>
    );
  }
}

export default Footer;