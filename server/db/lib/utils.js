exports.calculateAge = function(birthday) {
  var year = parseInt(birthday.slice(-4));
  var month = parseInt(birthday.slice(0, 2)) - 1;
  var day = parseInt(birthday.slice(3, 5));
  // month is zero based so if january, push back a month
  if (month === 0) {
    month = 12;
    year--;
  }
  birthday = new Date(year, month, day);
  console.log(birthday);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}