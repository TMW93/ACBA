const quickSortStandings = (arr) => {
  if(arr.length <= 1 || arr.length === undefined) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for(let i = 0; i < arr.length - 1; i++) {
    if(arr[i].wins > pivot.wins) {
      left.push(arr[i]);
    } else if(arr[i].wins === pivot.wins) {
      if(arr[i].totalPoints > pivot.totalPoints) {
        left.push(arr[i]);
      } else if(arr[i].totalPoints === pivot.totalPoints) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSortStandings(left), pivot, ...quickSortStandings(right)];
}

export default quickSortStandings;