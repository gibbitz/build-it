import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';

class DayView extends React.Component {
  static get propTypes(){
    return {

    };
  }

  static get defaultProps(){
    return {

    };
  }

  static get displayName(){
    return "DayView";
  }

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="weather-wrapper__day-view">
        DayView
      </section>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});


export default connect( mapStateToProps,mapDispatchToProps )( DayView );
