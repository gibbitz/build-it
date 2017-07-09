import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router';

class DailyBlockView extends React.Component {
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
    let { linkKey, date, temperature, weather:{icon, text}} = this.props;
    return(
      <li className="week-view__daily-block">
        <Link to={`/${linkKey}`}>
          <p><img src={icon} alt={text}/>
          {temperature}<sup>&deg;</sup>
          </p>
          <h2>{date}</h2>
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
