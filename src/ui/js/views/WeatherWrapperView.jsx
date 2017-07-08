import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';
import { createLocationRequest } from '../actions';

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
    return(
      <article className="weather-wrapper">
        WeatherWrapperView
        {this.props.children}
      </article>
    );
  }
}

const mapStateToProps = (_state) => ({

});

const mapDispatchToProps = (_dispatch) => ({
  requestLocation: () => {
    _dispatch(createLocationRequest());
  }
});


export default connect( mapStateToProps,mapDispatchToProps )( WeatherWrapperView );
