import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { select, axisBottom } from 'd3'

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 400;
const X_MARGIN = 20
const Y_MARGIN = 20

const TimeLineBlocks = styled.div`
  ${(props) => {
    if (props.visible > 0) {
      return 'visibility : visible;'
    }
    return 'visibility : hidden;'
  }}
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TimeLineText = styled.div`
  text-align: justify;
  font-size: 0.7em;
`

function drawTimeline({ width, height }) {

}

const TimeLine = () => {
  const [width] = useState(DEFAULT_WIDTH)
  const [height] = useState(DEFAULT_HEIGHT)
  const averageAge = useSelector((s) => s.weeks.averageAge)
  const weekInYear = useSelector((s) => s.weeks.weekInYear)
  const weekCount = useSelector((s) => s.weeks.count)
  const content = useSelector((s) => s.weeks.content)

   useEffect(() => {
     drawTimeline({ width, height });
   }, []);

  return (
    <TimeLineBlocks visible={weekCount}>
      <TimeLineText>
        Каждая клетка — одна неделя. В столбце 52 недели, или 1 год.
      </TimeLineText>
      <svg width={width} height={height} id="chart" />
    </TimeLineBlocks>
  );
}

TimeLine.propTypes = {}

export default TimeLine
