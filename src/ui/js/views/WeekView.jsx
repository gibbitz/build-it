import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';
import DailyBlockView from './components/DailyBlockView.jsx';

class WeekView extends React.Component {
  static get propTypes(){
    return {
      week: PropTypes.object
    };
  }

  static get defaultProps(){
    return {
      week: {}
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
        <ul className="week-view__weeks">
          {
            Object.keys(this.props.week).map((_key, _index)=>{
              // get midday weather or first available if past 12:00 in current day
              let repIndex = this.props.week[_key][4] ? 4 : 0;
              return (
                <DailyBlockView key={_index} linkKey={_key} {...this.props.week[_key][repIndex]} />
              );
            })
          }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  week: state.week
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect( mapStateToProps,mapDispatchToProps )( WeekView );
