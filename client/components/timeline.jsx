import React from 'react'
import styled from 'styled-components'
import Graph from './graph'

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

  return (
    <TimeLineBlocks>
      <TimeLineText>
        Каждая клетка — одна неделя. В столбце 52 недели, или 1 год.
      </TimeLineText>
      <Graph />
    </TimeLineBlocks>
  );
}

TimeLine.propTypes = {}

export default TimeLine
