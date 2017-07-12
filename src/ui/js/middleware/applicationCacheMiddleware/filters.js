import { DAYS, MONTHS } from '../../constants';

export const locationFilter = (_data) => {
  let {
    hostname,
    ip,
    org,
    ...output
  } = _data;
  return output;
};

export const forecastFilter = (_data) => {
  let output = {};
  _data.list.map((_item, _index)=>{
    let day = _item.dt_txt.split(' ')[0],
        date = new Date(_item.dt_txt),
        entry = {
          dateStr: _item.dt_txt,
          date: [
            DAYS[date.getDay()] + ',',
            MONTHS[date.getMonth()],
            date.getDate(),
          ].join(' '),
          time: date.toLocaleString('en-US', {hour:'numeric', minute:'2-digit'}),
          temperature: _item.main.temp,
          humidity: _item.main.humidity,
          weather: {
            icon: 'owf owf-' + _item.weather[0].id +' owf-3x',
            iconImage: 'http://openweathermap.org/img/w/' + _item.weather[0].icon + '.png',
            text: _item.weather[0].description,
            id: _item.weather[0].id
          }
        };
    if(output[day]){
      output[day].push(entry);
    }else{
      output[day] = [entry];
    }
  });
  return output;
};
