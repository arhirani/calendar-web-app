import React from 'react'
import PropTypes from 'prop-types'
import WeekDay from './WeekDay'
import { v4 as uuidv4 } from 'uuid'

const Week = ({ weekDays }) => {
  return (
    <div className="row">
      {weekDays.map(weekDay => (
        <WeekDay
          day={weekDay.day}
          month={weekDay.month}
          isCurrentMonth={weekDay.isCurrentMonth}
          isHoliday={false} events={[]}
          key={uuidv4()} />
      ))}
    </div>
  )
}

Week.propTypes = {
  weekDays: PropTypes.array.isRequired,
  isCurrentDay: PropTypes.bool,
  currentSelectedDate: PropTypes.number
}

export default Week
