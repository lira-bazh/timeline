import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Graph from './graph'

const TimeLineBlocks = styled.div`
${ props => !props.visible ?'display: none;':`display: flex;
  flex-direction: column;`
  }
  margin-top: 30px;
  align-items: center;
`

const TimeLineText = styled.div`
  text-align: justify;
  font-size: 0.7em;
`

const TimeLine = () => {
  const startDate = useSelector((s) => s.weeks.birthday);

  return (
    <TimeLineBlocks visible={startDate}>
      <TimeLineText>
        Каждая клетка — одна неделя. В строке 52 недели, или 1 год.
      </TimeLineText>
      <Graph />
    </TimeLineBlocks>
  );
}

TimeLine.propTypes = {}

export default TimeLine
