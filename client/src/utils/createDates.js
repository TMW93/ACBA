const createDates = () => {
  let today = new Date();
  const temp = {
    d: today.getDate(),
    m: today.getMonth(),
    y: today.getFullYear(),
  }
  const numDaysInMonth = new Date(temp.y, temp.m + 1, 0).getDate()

  return Array.from({length: 7}, _ => {
    if (temp.d > numDaysInMonth){
      temp.m = temp.m + 1;
      temp.d = 1;
    }      

    const newDate = new Date(temp.y, temp.m, temp.d++);

    return {
      day: newDate.getDate(),
      dayNameLong: newDate.toLocaleDateString('en-US', {weekday: 'long'}),
      dayNameShort: newDate.toLocaleDateString('en-US', {weekday: 'short'}),
      month: newDate.getMonth(),
      monthName: newDate.toLocaleString('en-US', {month: 'long'}),
      year: newDate.getFullYear(),
      date: newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
    };
  });
};

export default createDates;
