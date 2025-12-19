const timeConvert = (time) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(hours, minutes);

  const time12 = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }). format(date);

  return time12;
}

export default timeConvert