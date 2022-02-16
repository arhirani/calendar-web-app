import React from 'react'
import styled from 'styled-components'

const BorderlessInput = styled.input`
border: 0;
size: '';
width: 20px;
`

const BorderlessInputWide = styled.input`
border: 0;
size: 4;
width: 45px;
`

const Container = styled.div`
display: flex;
flex-direction: row;
margin-left: 10px;
`

const DateInput = ({ day, month, year }) => {
  return (
    <Container>
      <BorderlessInput type="text" maxLength='2' name="day" min='1' max='31' defaultValue={day}/>/
      <BorderlessInput type="text" maxLength='2' name="month" max="12" min='1' defaultValue={month}/>/
      <BorderlessInputWide align="right" type="text" maxLength='4' name="year" min='1909' defaultValue={year}/>
      <div />
    </Container>
  )
}

export default DateInput
