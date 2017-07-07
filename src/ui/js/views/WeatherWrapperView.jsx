import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';

class WeatherWrapperView extends React.Component {
  static get propTypes(){
    return {
      children: PropTypes.array
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

  render() {
    return(
      <article className="weather-wrapper">
        WeatherWrapperView
        {this.props.children}
      </article>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});


export default connect( mapStateToProps,mapDispatchToProps )( WeatherWrapperView );
