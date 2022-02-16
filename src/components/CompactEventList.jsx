import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Popover from '@material-ui/core/Popover'
import EditableCalendarItem from './EditableCalendarItem'
import Event from './common/Event'

const formatTime = time => {
  return new Intl.DateTimeFormat('default',
    {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    }).format(time).toLocaleLowerCase()
}

const CompactEventList = ({ event, day, month, evtId, parentRef, preview = false }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const eventDetails = (event) => {
    event.stopPropagation()
    // dispatch(editEvent())
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const startDate = new Date(event.start)

  return (
    <React.Fragment>
      <Event onClick={eventDetails} ref={parentRef} color={event.color}>
        {!preview && formatTime(startDate)}  {event.title}
      </Event>
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
        <EditableCalendarItem
          dismiss={handleClose}
          event={event}
          eventId={evtId}
          day={day}
          month={month}
        />
      </Popover>
    </React.Fragment>
  )
}

export default CompactEventList
