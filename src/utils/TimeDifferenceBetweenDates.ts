import moment from 'moment';

// Returns difference in minutes hours or days depending the difference betweeen two dates
export const TimeDifferenceBetweenDates = (date1:string, date2:string)=> {
  const difference = moment(date2).diff(moment(date1));
  const duration = moment.duration(difference);

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  let formattedDifference = '';

  if (days > 0) {
    formattedDifference += `${days} día${days !== 1 ? 's' : ''} `;
  }

  if (hours > 0) {
    formattedDifference += `${hours} hora${hours !== 1 ? 's' : ''} `;
  }

  if (minutes > 0 || (days === 0 && hours === 0)) {
    formattedDifference += `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }

  return formattedDifference.trim();
}