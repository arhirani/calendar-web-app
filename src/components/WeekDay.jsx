import React, { useRef, useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import CalendarEvent from './CalendarItem'
import CompactEventList from './CompactEventList'
import EventContainer from './EventContainer'
import { eventsByDay, setCurrentSelectedDay, isEditing, createNewEvent } from '../features/events/eventsSlice'

const DayButton = styled.button`
  height: 125px;
  width: 100px;
  padding-left: 0;
  padding-right: 0;
  font-size: 20px;
  background: ${props => props.isCurrentMonth ? 'lightgray' : 'gray'};
  
`

const CalendarDay = styled.div`
  top: 6px;
  right: 6px;
  position: absolute;
`

const CircleCalendarDay = styled(CalendarDay)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* font-size: 30px; */
  color: #fff;
  line-height: 30px;
  text-align: center;
  background: #000;
`

const WeekDay = ({ day, month, isCurrentMonth }) => {
  const target = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { currentSelectedDate, isEditing } = useSelector(eventsByDay)
  const dispatch = useDispatch()

  const currentDate = new Date()

  useLayoutEffect(() => {
    if (target.current) {
      setDimensions({
        width: target.current.offsetWidth,
        height: target.current.offsetHeight
      })
    }
  }, [])

  const handleClick = event => {
    event.stopPropagation()
    dispatch(setCurrentSelectedDay({ day, month }))
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isCurrentDay = currentDate.getMonth() === month && currentDate.getDate() === day

  const open = !!anchorEl && day === currentSelectedDate.day && month === currentSelectedDate.month && !isEditing
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <DayButton className="col" ref={target} onClick={handleClick} disabled={isEditing} isCurrentMonth={isCurrentMonth}>
        {
          isCurrentDay ? (
            <CircleCalendarDay>
              { day}
            </CircleCalendarDay>
          ) : (
            <CalendarDay>
              { day}
            </CalendarDay>
          )}
        {
          open && <CompactEventList preview={true} event={{ title: 'No Title', end: '', start: '' } } parentRef={target}/>
        }
        <EventContainer
          day={day}
          month={month}
          parentDimensions={dimensions.height}
        />
      </DayButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Paper elevation={3}>
          <Box p={1} flexDirection='column' display='flex'>
            <CalendarEvent day={day} month={month} onClose={handleClose} action={createNewEvent}/>
          </Box>
        </Paper>
      </Popover>
    </>
  )
}

WeekDay.propTypes = {
  day: PropTypes.number.isRequired,
  isHoliday: PropTypes.bool.isRequired,
  events: PropTypes.array,
  currentSelectedDate: PropTypes.number
}

export default WeekDay
