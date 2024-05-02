export function getTemperature(temperature: number) {
  // between -0.5 and 0, the temperature will get returned as -0
  // need to convert to 0 or looks ugly
  return temperature > -0.5 && temperature < 0 ? 0 : temperature.toFixed(0);
};

const numToMonthName = new Map([
  [1, "Jan"],
  [2, "Feb"],
  [3, "Mar"],
  [4, "Apr"],
  [5, "May"],
  [6, "Jun"],
  [7, "Jul"],
  [8, "Aug"],
  [9, "Sep"],
  [10, "Oct"],
  [11, "Nov"],
  [12, "Dec"]
]);

export function getDate(timeStr: string){
  // example: 2024-05-07 15:00:00 => May 7
  let dataStr = timeStr.split(" ")[0];
  return numToMonthName.get(parseInt(dataStr.split("-")[1])) +
    " " + parseInt(dataStr.split("-")[2]).toString();
}

export function getHour(timeStr: string){
  // example: 2024-05-07 15:00:00 => 3pm
  let hourStr = timeStr.split(" ")[1].split(":")[0];
  
  if (hourStr == "00") {
    return "midnight";
  }
  else if (hourStr == "12") {
    return "noon";
  }
  else {
    let hourInt = parseInt(hourStr)
    if (hourInt > 12){
      return (hourInt - 12).toString() + "pm"
    }
    else {
      return hourInt.toString() + "am"
    }
  }
}