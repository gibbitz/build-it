import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';
import { createDataRequest } from '../actions/creators';

class WeatherWrapperView extends React.Component {
  static get propTypes(){
    return {
      children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
      requestLocation: PropTypes.func
    };
  }

  static get defaultProps(){
    return {

    };
  }

  static get displayName(){
    return "WeatherWrapperView";
  }

  constructor(props) {
    super(props);
  }

  componentWillMount(_nextProps) {
    this.props.requestLocation();
  }

  render() {
    let {town, state, country} = this.props;

    return(
      <article className="weather-wrapper">
        <header>
          <h1>{town}</h1>
          <h2>{state}, {country}</h2>
        </header>
        {this.props.children}
      </article>
    );
  }
}

const mapStateToProps = (_state) => ({
  town: _state.location.city,
  state: _state.location.region,
  country: _state.location.country
});

const mapDispatchToProps = (_dispatch) => ({
  requestLocation: () => {
    _dispatch(createDataRequest());
  }
});


export default connect( mapStateToProps,mapDispatchToProps )( WeatherWrapperView );
