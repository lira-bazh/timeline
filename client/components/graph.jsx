import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { select, axisLeft, scaleLinear } from 'd3'
import getArrayWeeks from '../functions'

const SvgBlock = styled.svg`
  ${
    props => !props.visible ?'display: none':''
  }
`

const MARGIN_X = 50;
const MARGIN_Y = 50;

const Graph = () => {
  const width = useSelector((s) => s.weeks.width)
  const height = useSelector((s) => s.weeks.height)
  const averageAge = useSelector((s) => s.weeks.averageAge)
  const weekInYear = useSelector((s) => s.weeks.weekInYear)
  const startDate = useSelector((s) => s.weeks.birthday);
  const cellSize = Math.min(
    (height - MARGIN_Y) / averageAge,
    (width - MARGIN_X) / weekInYear
  );

  const axisTime = scaleLinear()
    .domain([0, averageAge])
    .range([25, height - MARGIN_Y]);

  const axisWeek = scaleLinear()
    .domain([0, weekInYear])
    .range([0, width - MARGIN_X]);

  function getColor(atr) {
    if (atr > 0) {
      return 'red'
    }
    return 'gray'
  }
  const arrWeeks = getArrayWeeks();
  console.log("arrWeeks", arrWeeks);

  React.useEffect(() => {
    if (startDate !== 0) {
      const axisY = axisLeft().scale(axisTime).ticks(10);

      select("#chart").selectAll(".axis-y").call(axisY)

      select("#chart")
        .append("g")
        .attr("transform", `translate(${MARGIN_X * 0.5}, 0)`)
        .attr('class', 'axis-y')
        .call(axisY);

      const selectionRect = select("#chart").selectAll("rect").data(arrWeeks);

      selectionRect.attr("fill", (d) => getColor(d.color));

      selectionRect
        .enter()
        .append("rect")
        .attr("fill", (d) => getColor(d.color))
        .attr("width", cellSize * 0.8)
        .attr("height", cellSize * 0.8)
        .attr("x", (d) => axisWeek(d.week))
        .attr("y", (d) => axisTime(d.year))
        .attr("fill", (d) => getColor(d.color))
        .attr("transform", `translate(${MARGIN_X * 0.6}, 0)`);
    }
  }, [startDate]);

  return (
    <div>
      <SvgBlock visible={startDate} width={width} height={height} id="chart" />
    </div>
  )
}

Graph.propTypes = {}

export default Graph