export function diffdate(start, end){
  return Math.floor(( Date.parse(end) - Date.parse(start) ) / 86400000);
}
