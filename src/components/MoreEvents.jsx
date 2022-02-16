import React from 'react'
import styled from 'styled-components'
import Event from './common/Event'

const WhiteEvent = styled(Event)`
  color: #3c4043;
  background-color: transparent;
  &:hover  {
    background-color: rgba(32,33,36,0.039);
  }
`

const MoreEvents = ({ eventCount }) => {
  const showMoreEventsPopover = (e) => {
    e.stopPropagation()
    console.log('show more events')
  }

  return (
    <WhiteEvent onClick={showMoreEventsPopover}>
      {eventCount} more events
    </WhiteEvent>
  )
}

export default MoreEvents
