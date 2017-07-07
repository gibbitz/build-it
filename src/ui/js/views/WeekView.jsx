import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';

class WeekView extends React.Component {
  static get propTypes(){
    return {

    };
  }

  static get defaultProps(){
    return {

    };
  }

  static get displayName(){
    return "WeekView";
  }

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="weather-wrapper__week-view">
        WeekView
      </section>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});


export default connect( mapStateToProps,mapDispatchToProps )( WeekView );
