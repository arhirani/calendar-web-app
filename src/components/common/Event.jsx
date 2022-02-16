import styled from 'styled-components'

const Event = styled.div`
    font-size: 20px;
    height: 20px;
    background-color: ${props => props.color || 'tomato'};
    padding: 0 4px;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto';
    color: #fff;
    border-radius: 4px;
    text-align: left;
    margin-top: 2px;
`
const EventColor = styled.div`
  border-radius: 4px;
  height: 14px;
  width: 14px;
  margin-left: 3px;
  margin-top: 3px;
  background-color: ${props => props.color || 'tomato'};
`

const EventColorContainer = styled.div`
  padding-left: 8px;
  width: 40px;
  max-height: 36px;
  display: flex;
  align-items: center;
`

export default Event

export { EventColor, EventColorContainer }
