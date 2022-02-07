import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { updateWeeksCount } from '../redux/reducers/weeks'

const DateForm = styled.form`
  background-color: #b9b9b9;
  padding: 8px;
  border-radius: 5px;
  display: flex;
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
  border-radius: 5px;
  width: 24px;
  font-size: 1.1em;
  border-width: 0px;
  display: flex;
  align-items: center;
`;

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
    if (event.target[0].value) {
      dispatch(updateWeeksCount(Math.floor((+curDate - Date.parse(event.target[0].value))/millisecondInWeek)))
    }
  }

  return (
    <DateForm onSubmit={sendBirthday}>
      <label htmlFor="birthday">
        Введите дату рождения:&nbsp;
        <DateInput type="date" id="birthday" max={maxDate} min={minDate} />
      </label>
      <BtnSend type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
        </svg>
      </BtnSend>
    </DateForm>
  );
}

BithdayForm.propTypes = {}

export default BithdayForm
