import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { select, axisLeft } from "d3";
import { scaleTime } from "d3-scale";

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 400;

const TimeLineBlocks = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TimeLineText = styled.div`
  text-align: justify;
  font-size: 0.7em;
`

const TimeLine = () => {
  const [width] = React.useState(DEFAULT_WIDTH);
  const [height] = React.useState(DEFAULT_HEIGHT);
  const averageAge = useSelector((s) => s.weeks.averageAge)
  const CELL_SIZE = height / averageAge;
  const weekInYear = useSelector((s) => s.weeks.weekInYear)

  // const weekCount = useSelector((s) => s.weeks.count)
  // const content = useSelector((s) => s.weeks.content)
  // const startDate = useSelector((s) => s.weeks.startDate)
  // const currentDate = useSelector((s) => s.weeks.currentDate);
  // const endDate = useSelector((s) => s.weeks.endDate);
  const startDate = new Date("1991-09-21")
  const currentDate = new Date()
  const endDate = new Date(startDate.getTime())
  endDate.setFullYear(startDate.getFullYear() + averageAge)

  function getWeek(past, future) {
    const millisecondInWeek = 604800000
    let sumYear;
    let startYear;
    if (past.getMonth() > future.getMonth()) {
      sumYear = future.getFullYear() - past.getFullYear() - 1;
      startYear = new Date(future.getFullYear() - 1, past.getMonth(), past.getDate());
    }
    else {
      sumYear = future.getFullYear() - past.getFullYear();
      startYear = new Date(future.getFullYear(), past.getMonth(), past.getDate());
    }
    const week = Math.floor((future.getTime() - startYear.getTime()) / millisecondInWeek);
    return sumYear*weekInYear + week;
  }

  const todayWeek = getWeek(startDate, currentDate)
  console.log("todayWeek", todayWeek);

  const data = new Array(averageAge).fill(0).map((yearItem, yearIndex) => {

    return new Array(weekInYear).fill(0).map((weekItem, weekIndex) => {
      return {
        week: weekIndex + 1,
        year: yearIndex,
        num: weekInYear * yearIndex + weekIndex + 1,
        color: weekInYear * yearIndex + weekIndex + 1 < todayWeek ? 1 : 0,
      };
    })
  })
  console.log('data ',data)



  const axisTime = scaleTime()
    .domain([startDate, endDate])
    .range([0, DEFAULT_HEIGHT]);

  React.useEffect(() => {
    const axisY = axisLeft().scale(axisTime).ticks(10);

    select("#chart")
      .append("g")
      .attr("transform", "translate(50, 0)")
      .call(axisY);

    data.forEach((item) => {
      select("#chart")
        .append("rect")
        .attr("width", CELL_SIZE - 1)
        .attr("height", CELL_SIZE - 1)
        .attr("x", 0)
        .attr("y", axisTime(item.date))
        .attr("fill", "gray")
        .attr("transform", "translate(55, 0)");
    })

  }, []);

  return (
    <TimeLineBlocks>
      <TimeLineText>
        Каждая клетка — одна неделя. В столбце 52 недели, или 1 год.
      </TimeLineText>
      <svg width={width} height={height} id="chart" />
    </TimeLineBlocks>
  );
}

TimeLine.propTypes = {}

export default TimeLine
