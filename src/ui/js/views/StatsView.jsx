import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';
import { createShowStatsAction } from '../actions/creators';

class StatsView extends React.Component {
  static get propTypes(){
    return {
      params: PropTypes.object,
      setStatsState: PropTypes.func,
      today: PropTypes.string,
      temperature: PropTypes.number,
      humidity: PropTypes.number,
      description: PropTypes.string,
      icon: PropTypes.string,
      hours: PropTypes.object
    };
  }

  static get defaultProps(){
    return {
      hours: []
    };
  }

  static get displayName(){
    return "StatsView";
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setStatsState(this.props.params.day);
  }

  render() {
    let {today, temperature, humidity, description, icon, hours, params:{day}} = this.props;
    return(
      <section className="weather-wrapper__day-view">
        <p>
          <img src={icon} alt={description}/>
          {temperature}<sup>&deg;</sup>
          {humidity}
        </p>
        <h2>{today}</h2>
        <ul>
          {
            Object.keys(hours).map((_key, _index)=>{
              let hour = hours[_key];
              return (
                <li key={_index}>
                  <p>
                    <img src={hour.weather.icon} alt={hour.weather.description}/>
                    {hour.temperature}<sup>&deg;</sup>
                    {hour.humidity}
                  </p>
                  <h2>{hour.time}</h2>
                </li>
              );
            })
          }
        </ul>
        <Link to="/">
          home
        </Link>
        <Link to={`/${day}`}>
          back
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  today: state.stats[0] && state.stats[0].date,
  temperature: state.stats[0] && state.stats[0].temperature,
  humidity: state.stats[0] && state.stats[0].humidity,
  description: state.stats[0] && state.stats[0].weather.text,
  icon: state.stats[0] && state.stats[0].weather.icon,
  hours: state.stats,
});

const mapDispatchToProps = (dispatch) => ({
  setStatsState: (_dayKey)=>{
    dispatch(createShowStatsAction(_dayKey));
  }
});


export default connect( mapStateToProps,mapDispatchToProps )( StatsView );
