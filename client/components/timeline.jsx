import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

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

const TimeLineContent = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.weekInYear}, 1fr);
  grid-template-columns: repeat(${(props) => props.averageAge}, 1fr);
  gap: 2px;
  grid-auto-flow: column;
  margin-top: 10px;
`

const WeekItem = styled.div`
  background-color: ${(props) => (props.color ? 'red' : 'gray')};
  width: ${(props) => props.sizeBlock}px;
  height: ${(props) => props.sizeBlock}px;
`

const Legend = styled.div`
  position: relative;
  bottom: -${(props) => props.sizeBlock}px;
  ${(props) => {
    if (props.content >= 10) {
      return `left: -${props.sizeBlock / 2}px;`
    }
    return ''
  }}
  font-size: 0.6em;
`

const TimeLine = () => {
  const averageAge = useSelector((s) => s.weeks.averageAge)
  const weekInYear = useSelector((s) => s.weeks.weekInYear)
  const weekCount = useSelector((s) => s.weeks.count)
  const content = useSelector((s) => s.weeks.content)
  const sizeBlock = 7
  const periodTextLegend = 4

  return (
    <TimeLineBlocks visible={weekCount}>
      <TimeLineText>Каждая клетка — одна неделя. В столбце 52 недели, или 1 год.</TimeLineText>
      <TimeLineContent averageAge={averageAge} weekInYear={weekInYear}>
        {content.map((item, index) => {
          // console.log((index + 1) % weekInYear)
          if (
            (index + 1) % (weekInYear * periodTextLegend) === 0 ||
            (index + 1) / weekInYear === 1
          ) {
            return (
              <WeekItem
                key={index}
                color={item}
                sizeBlock={sizeBlock}
              >
                <Legend sizeBlock={sizeBlock} content={(index + 1) / weekInYear}>
                  {(index + 1) / weekInYear}
                </Legend>
              </WeekItem>
            )
          }
          return (
            <WeekItem
              key={index}
              color={item}
              sizeBlock={sizeBlock}
            />
          )
        })}
      </TimeLineContent>
    </TimeLineBlocks>
  )
}

TimeLine.propTypes = {}

export default TimeLine
