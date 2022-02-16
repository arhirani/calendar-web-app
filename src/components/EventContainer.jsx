import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eventsByDay } from '../features/events/eventsSlice'
import CompactEventList from './CompactEventList'
import MoreEvents from './MoreEvents'

const compareEvents = (a, b) => {
  const eventA = new Date(a.event.start)
  const eventB = new Date(b.event.start)
  if (a.event.start === b.event.start) {
    return a.event.title - b.event.title
  }
  return eventA - eventB
}

const EventContainer = ({ day, month, parentDimensions }) => {
  const { events } = useSelector(eventsByDay)
  const target = useRef(null)
  const [todayEvents, setTodayEvents] = useState([])
  const [overflow, setOverflow] = useState(false)

  useEffect(() => {
    if (events.length === 0) {
      setTodayEvents([])
    } else if (events.length > 0) {
      const r = events.filter(evt => evt.day === day && evt.month === month)
      if (r.length > 0) {
        const todayEvents = r[0].events
        const sortedEvents = todayEvents.slice().sort(compareEvents)
        setTodayEvents(sortedEvents)
      }
    }
  }, [events])

  useLayoutEffect(() => {
    if (target.current && target.current.offsetHeight) {
      setOverflow(target.current.offsetHeight + 30 > parentDimensions)
    }
  }, [todayEvents])

  const printEventList = events => (
    events.map(evt => (
      <CompactEventList
        event={evt.event}
        key={evt.id}
        evtId={evt.id}
        day={day}
        month={month}
      />
    ))
  )

  return (
    <div ref={target}>
      { overflow ? (
        <React.Fragment>
          { printEventList(todayEvents.slice(0, 4)) }
          <MoreEvents eventCount={todayEvents.length - 4}/>
        </React.Fragment>
      )
        : printEventList(todayEvents)
      }
    </div>
  )
}

export default EventContainer
