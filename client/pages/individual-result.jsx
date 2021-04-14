import React from 'react';

export default class IndividualResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  render() {
    if (!this.state.product) return null;
    return (
      <div></div>
    );
  }
}
