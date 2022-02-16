import React, { useRef, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import TimeInput from './date-input/TimeInput'
import HorizontalFlow from './common/HorizontalFlow'
import { EventColorContainer, EventColor } from './common/Event'

import { eventColors, MAX_EVENT_LENGTH } from '../app/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    padding: '10px 10px',
    display: 'flex',
    flexDirection: 'column'
  },
  buttonPanel: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const parseDate = (dateString) => {
  const date = new Date(dateString)
  return date.getHours() + ':' + date.getMinutes()
}

const CalendarEvent = ({ day, month, onClose, event, eventId, action, isEditing }) => {
  const currenDate = new Date()
  const classes = useStyles()
  const evtNameRef = useRef(null)
  const [eventName, setEventName] = useState('')
  const [start, setStart] = useState(isEditing ? parseDate(event.start) : `${currenDate.getHours()}:00`)
  const [end, setEnd] = useState(isEditing ? parseDate(event.end) : `${currenDate.getHours()}:30`)
  const [err, setErr] = useState('')
  const [eventColor, setEventColor] = useState(eventColors[0])
  const dispatch = useDispatch()

  useEffect(() => {
    evtNameRef.current.focus()
  }, [])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch(action({
      day,
      month,
      event: {
        eventId,
        title: eventName,
        color: eventColor,
        start: new Date(currenDate.getFullYear(), month, day, start.split(':')[0], start.split(':')[1], 0, 0).toString(),
        end: new Date(currenDate.getFullYear(), month, day, end.split(':')[0], end.split(':')[1], 0, 0).toString()
      }
    })
    )
    onClose()
  }

  const handleOnChange = (e) => {
    const change = e.target.value
    if (change.length > MAX_EVENT_LENGTH) {
      setErr('Maximun length exceeded')
    } else {
      setEventName(change)
    }
  }

  const handleColorChange = (e) => {
    setEventColor(e.target.value)
  }

  const handleEndTimeFocus = (e) => {
    setEnd(start)
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit} >
      <HorizontalFlow>
        <TextField type="text"
          error={err.length !== 0}
          placeholder= {isEditing ? '' : 'New Event' }
          defaultValue={isEditing ? event.title : ''}
          inputRef={evtNameRef}
          onChange={handleOnChange}
          inputProps={{ style: { fontSize: 20 } }}
          helperText={`${MAX_EVENT_LENGTH - eventName.length} characters remaining`}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={eventColor}
            onChange={handleColorChange}
            label="Color"
          >
            { eventColors.map(color =>
              (<MenuItem key={color} value={color}>
                <EventColorContainer>
                  <EventColor color={color} />
                </EventColorContainer>
              </MenuItem>))
            }
          </Select>
        </FormControl>
      </HorizontalFlow>
      <HorizontalFlow>
      start <TimeInput defaultValue={start} onChange={setStart}/>
       end at
        <TimeInput defaultValue={end} onChange={setEnd} onFocus={handleEndTimeFocus} />
      </HorizontalFlow>
      { isEditing ? (
        <Box className={classes.buttonPanel} justifyContent="flex-end" display='flex'>
          <Button variant="contained" color="primary" type='submit' onClick={handleSubmit}>
           Update
          </Button>
          <Button variant="contained" type="button" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      ) : (<Box justifyContent="flex-end" display='flex'>
        <Button variant="contained" color="primary" type="submit">
        Save
        </Button>
      </Box>)}

    </form>
  )
}

export default CalendarEvent
