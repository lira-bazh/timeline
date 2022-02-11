import { useSelector } from "react-redux";

export default function getArrayWeeks() {
  const averageAge = useSelector((s) => s.weeks.averageAge);
  const weekInYear = useSelector((s) => s.weeks.weekInYear);
  const startDate = new Date(useSelector((s) => s.weeks.birthday));
  const currentDate = new Date();

  if ((startDate > currentDate) || (startDate.getTime() === 0)) {
    return []
  }

  let lastBirthday;
  if (startDate.getMonth() < currentDate.getMonth()) {
    lastBirthday = new Date(
      currentDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    )
  }
  else {
    lastBirthday = new Date(
      currentDate.getFullYear() - 1,
      startDate.getMonth(),
      startDate.getDate()
    );
  }
  // console.log("lastBirthday", lastBirthday);
  const millisecInWeek = 604800000;
  const diffWeek = Math.floor((currentDate.getTime() - lastBirthday.getTime()) / millisecInWeek)
  const diffYear = lastBirthday.getFullYear() - startDate.getFullYear()

  const getColor = (week, year) => {
    if (year < diffYear || (year === diffYear && week < diffWeek)) {
      return 1;
    }
    return 0
  }

  const data = new Array(averageAge * weekInYear)
    .fill(0)
    .map((item, index) => {
      const week = index % weekInYear;
      const year = Math.floor(index / weekInYear);
      return {
        week: week,
        year: year,
        color: getColor(week, year),
      };
  });

  return data
}