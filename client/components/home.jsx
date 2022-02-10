import React from 'react'
import styled from 'styled-components'
import BithdayForm from './birthdayForm'
import TimeLine from './timeline'

const MainPage = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  font-family: 'Roboto', sans-serif;
`

const TitlePage = styled.div`
  font-size: 1.5em;
  margin-bottom: 30px;
`

const Home = () => {
  return (
    <MainPage>
      <TitlePage>Визуализация длительности жизни</TitlePage>
       <BithdayForm />
      <TimeLine />
    </MainPage>
  )
}

Home.propTypes = {}

export default Home
