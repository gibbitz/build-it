import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';

export class DailyBlockView extends React.Component {
  static get propTypes(){
    return {
      linkKey: PropTypes.string,
      date: PropTypes.string,
      temperature: PropTypes.number,
      weather: PropTypes.object
    };
  }

  static get defaultProps(){
    return {

    };
  }

  static get displayName(){
    return "DailyBlockView";
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { linkKey, date, temperature, weather:{icon, iconImage, text, id}} = this.props;
    return(
      <li className="weeks__daily-block">
        <Link to={`/${linkKey}`}>
          <div className="daily-block__weather">
            <i className={icon} title={text} />
            <span className="weather__temperature">{temperature}<sup>&deg;</sup></span>
          </div>
          <h2>
            {date}
          </h2>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});


export default connect( mapStateToProps,mapDispatchToProps )( DailyBlockView );
