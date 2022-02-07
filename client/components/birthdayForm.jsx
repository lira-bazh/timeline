import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { updateWeeksCount } from '../redux/reducers/weeks'

const DateForm = styled.form`
  background-color: #b9b9b9;
  padding: 8px;
  border-radius: 5px;
`

const DateInput = styled.input`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
`

const BtnSend = styled.button`
margin-left: 5px;
  width: 25px;
  height: 25px;
  border-radius: 1rem;
  font-size: 1.1em;
`

const BithdayForm = () => {
  const averageAge = useSelector((s) => s.weeks.averageAge)
  const millisecondInWeek = 604800000
  const dispatch = useDispatch()
  const curDate = new Date()

  function dateToStr(inputData) {
    const year = inputData.getFullYear()
    const month = inputData.getMonth() + 1 < 10 ? `0${inputData.getMonth() + 1}` : inputData.getMonth() + 1
    const day = inputData.getDate()

    return `${year}-${month}-${day}`
  }

  const maxDate = dateToStr(curDate)
  const minDate = dateToStr(new Date(curDate.getFullYear() - averageAge, curDate.getMonth(), curDate.getDate()))

  function sendBirthday(event) {
    event.preventDefault()
    dispatch(updateWeeksCount(Math.floor((+curDate - Date.parse(event.target[0].value))/millisecondInWeek)))
  }

  return (
    <DateForm onSubmit={sendBirthday}>
      <label htmlFor="birthday">
        Введите дату рождения:&nbsp;
        <DateInput
          type="date"
          id="birthday"
          max={maxDate}
          min={minDate}
        />
      </label>
      <BtnSend type="submit">&#8250;</BtnSend>
    </DateForm>
  )
}

BithdayForm.propTypes = {}

export default BithdayForm
