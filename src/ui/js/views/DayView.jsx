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
      humidity: PropTypes.number,
      description: PropTypes.string,
      icon: PropTypes.string,
      children: PropTypes.array,
      hours: PropTypes.array
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
    let {today, temperature, humidity, description, icon, hours, params:{day}} = this.props;
    return(
      <section className={`weather-wrapper__day-view ${this.props.children && ' day-view--expanded'}`}>
        <div className="day-view__weather">
          <i className={icon} title={description} />
          <span className="weather__temperature">
            {temperature}
            <sup>&deg;</sup>
          </span>
          <span className="weather__humidity">
            {humidity}%<small> humidity</small>
          </span>
        </div>
        <h2>{today}</h2>
        <div className="day-view__stats">
          {this.props.children}
        </div>
        <nav className="day-view__links">
          <Link to="/">
            back
          </Link>
          {!this.props.children &&
            <Link to={`/${day}/statistics`}>
              show detail
            </Link>
          }
          {this.props.children &&

            <Link className="stats__close" to={`/${day}`}>
              hide detail
            </Link>
          }
        </nav>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  today: state.day[0] && state.day[0].date,
  temperature: state.day[0] && state.day[0].temperature,
  humidity: state.day[0] && state.day[0].humidity,
  description: state.day[0] && state.day[0].weather.text,
  icon: state.day[0] && state.day[0].weather.icon
});

const mapDispatchToProps = (dispatch) => ({
  setDayState: (_dayKey)=>{
    dispatch(createShowDayAction(_dayKey));
  }
});


export default connect( mapStateToProps,mapDispatchToProps )( DayView );
