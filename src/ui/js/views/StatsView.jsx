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
      hours: {}
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
      <section>
        <ul className="stats__hourly">
          {
            Object.keys(hours).map((_key, _index)=>{
              let hour = hours[_key];
              return (
                <li key={_index} className="stats__hour">
                  <div className="hour__weather">
                    <i className={hour.weather.icon} title={hour.weather.text} />
                    <span className="weather__temperature">
                      {hour.temperature}
                      <sup>&deg;</sup>
                    </span>
                    <span className="weather__humidity">
                      {hour.humidity}% <small>humidity</small>
                    </span>
                  </div>
                  <h2>{hour.time}</h2>
                </li>
              );
            })
          }
        </ul>
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
