import React from 'react'
import { useSelector } from 'react-redux'
import { select, axisLeft, scaleLinear } from 'd3'

const MARGIN_X = 50;
const MARGIN_Y = 50;

const Graph = () => {
  const width = useSelector((s) => s.weeks.width)
  const height = useSelector((s) => s.weeks.height)
  const averageAge = useSelector((s) => s.weeks.averageAge)
  const weekInYear = useSelector((s) => s.weeks.weekInYear)
  const cellSize = Math.min(
    (height - MARGIN_Y) / averageAge,
    (width - MARGIN_X) / weekInYear
  );
  console.log(
    (height - MARGIN_Y) / averageAge,
    (width - (width - MARGIN_X) / weekInYear) / weekInYear
  );
  console.log(cellSize);

  const startDate = new Date("1991-09-21")
  const currentDate = new Date()
  const endDate = new Date(startDate.getTime())
  endDate.setFullYear(startDate.getFullYear() + averageAge)

  const data = new Array(averageAge).fill(0).map((yearItem, yearIndex) => {
    return new Array(weekInYear).fill(0).map((weekItem, weekIndex) => {
      return {
        week: weekIndex + 1,
        year: yearIndex,
        color: 0,
      };
    })
  })
  console.log('data ',data)

  const axisTime = scaleLinear()
    .domain([0, averageAge])
    .range([25, height - MARGIN_Y]);

  const axisWeek = scaleLinear()
    .domain([0, weekInYear])
    .range([0, width - MARGIN_X]);

  React.useEffect(() => {
    const axisY = axisLeft().scale(axisTime).ticks(10);

    select("#chart")
      .append("g")
      .attr("transform", `translate(${MARGIN_X*0.5}, 0)`)
      .call(axisY);

    data.forEach((yearItem, yearIndex) => {
      yearItem.forEach((weekItem, weekIndex) => {
        select("#chart")
          .append("rect")
          .attr("width", cellSize * 0.8)
          .attr("height", cellSize * 0.8)
          .attr("x", axisWeek(weekIndex))
          .attr("y", axisTime(yearIndex))
          .attr("fill", "gray")
          .attr("transform", `translate(${MARGIN_X * 0.6}, 0)`);
      })
    })


  }, []);

  return (
    <div>
      <svg width={width} height={height} id="chart" />
    </div>
  )
}

Graph.propTypes = {}

export default Graph