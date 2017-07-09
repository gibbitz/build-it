import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';
import { createShowDayAction } from '../actions/creators';

class DayView extends React.Component {
  static get propTypes(){
    return {
      params: PropTypes.object,
      setDayState: PropTypes.func,
      today: PropTypes.string,
      temperature: PropTypes.number,
      description: PropTypes.string,
      icon: PropTypes.string,
      hours: PropTypes.object
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

  componentDidMount() {
    this.props.setDayState(this.props.params.day);
  }

  render() {
    let {today, temperature, description, icon, hours, params:{day}} = this.props;
    return(
      <section className="weather-wrapper__day-view">
        <p>
          <img src={icon} alt={description}/>
          {temperature}<sup>&deg;</sup>
        </p>
        <h2>{today}</h2>
        <Link to="/">
          back
        </Link>
        <Link to={`/${day}/statistics`}>
          detail
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  today: state.day[0] && state.day[0].date,
  temperature: state.day[0] && state.day[0].temperature,
  description: state.day[0] && state.day[0].weather.text,
  icon: state.day[0] && state.day[0].weather.icon,
  hours: state.day,
});

const mapDispatchToProps = (dispatch) => ({
  setDayState: (_dayKey)=>{
    dispatch(createShowDayAction(_dayKey));
  }
});


export default connect( mapStateToProps,mapDispatchToProps )( DayView );
