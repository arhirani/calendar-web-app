import { configureStore } from '@reduxjs/toolkit'
import eventsByDayReducer from '../features/events/eventsSlice'

export default configureStore({
  reducer: {
    events: eventsByDayReducer
  }
})
