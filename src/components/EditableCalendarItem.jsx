import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  editEvent,
  deleteEvent,
  updateEvent,
  eventsByDay
} from '../features/events/eventsSlice'
import TimeInput from './date-input/TimeInput'
import HorizontalFlow from './common/HorizontalFlow'
import { EventColorContainer, EventColor } from './common/Event'
import CalendarEvent from './CalendarItem'

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '10px 10px',
    minWidth: '300px'
  },
  root: {
    border: 0,
    padding: '10px 30px',
    display: 'flex'
  },
  buttonPanel: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const TitleContainer = styled.div`
    max-height: 56px;
    font-size: 22px;
    font-weight: 400;
    color: #3c4043;
    display: flex;
    flex-direction: row;
    align-items: baseline;
`

const parseDate = (dateString) => {
  const date = new Date(dateString)
  return date.getHours() + ':' + date.getMinutes()
}

const EditableCalendarItem = ({ event, eventId, day, month, dismiss }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isEditing } = useSelector(eventsByDay)
  const start = parseDate(event.start)
  const end = parseDate(event.end)

  const handleDeleteEvent = event => {
    event.stopPropagation()
    dispatch(deleteEvent({ day, month, eventId }))
    dismiss()
  }

  return (
    <Paper elevation={3}>
      <Box className={classes.main} p={2} flexDirection='column' display='flex'>
        <Box justifyContent={isEditing ? 'flex-end' : 'space-around'} display='flex'>
          { isEditing ? (
            <IconButton
              aria-label="cancel edit event"
              color="primary"
              onClick={dismiss}>
              <CloseIcon />
            </IconButton>
          ) : (
            <React.Fragment>
              <IconButton
                aria-label="edit event"
                color="primary"
                onClick={() => dispatch(editEvent({ day, eventId }))}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={handleDeleteEvent}>
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          )}
        </Box>
        { isEditing ? (<CalendarEvent
          day={day}
          month={month}
          onClose={dismiss}
          action={updateEvent}
          event={event}
          eventId={eventId}
          isEditing
        />)
          : (<HorizontalFlow>
            <EventColorContainer>
              <EventColor color={event.color}/>
            </EventColorContainer>
            <div>
              <TitleContainer>
                {event.title}
              </TitleContainer>
              <HorizontalFlow>
                    start <TimeInput defaultValue={start} disabled/>
                    end at <TimeInput defaultValue={end} />
              </HorizontalFlow>
            </div>
          </HorizontalFlow>
          )}
      </Box>
    </Paper>
  )
}

export default EditableCalendarItem
