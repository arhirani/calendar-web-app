import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const slice = createSlice({
  name: 'eventsByDay',
  initialState: {
    isEditing: false,
    currentSelectedDate: {
      day: -1,
      month: -1
    },
    events: []
  },
  reducers: {
    editEvent: state => {
      state.isEditing = true
    },
    endEditing: state => {
      state.isEditing = false
    },
    updateEvent: (state, action) => {
      const { payload: { day, month, event: { eventId }, event } } = action
      for (let index = 0; index < state.events.length; index++) {
        const element = state.events[index]
        if (element.day === day && element.month === month) {
          const r = element.events.map(e => {
            if (e.id === eventId) {
              return {
                event: event,
                id: e.id
              }
            }
            return e
          })
          state.events[index].events = r
          break
        }
      }
      state.isEditing = false
    },

    deleteEvent: (state, action) => {
      const { payload: { day, month, eventId } } = action
      for (let index = 0; index < state.events.length; index++) {
        const element = state.events[index]
        if (element.day === day && element.month === month) {
          const r = element.events.filter(e => e.id !== eventId)
          state.events[index].events = r
          break
        }
      }
      state.isEditing = false
    },
    setCurrentSelectedDay: (state, action) => {
      const { payload: { day, month } } = action
      state.currentSelectedDate = {
        day: day,
        month: month
      }
    },
    createNewEvent: (state, action) => {
      const { payload: { day, month, event } } = action
      const newEvent = {
        event: event,
        id: uuidv4()
      }
      const existingEvents = state.events.filter(evt => evt.day === day && evt.month === month)[0]
      if (existingEvents !== undefined) {
        debugger
        existingEvents.events.push(newEvent)
      } else {
        state.events.push({ day, month, events: [newEvent] })
      }
    }
  }
})

export const {
  createNewEvent,
  editEvent,
  endEditing,
  deleteEvent,
  updateEvent,
  setCurrentSelectedDay
} = slice.actions

export const eventsByDay = state => state.events

export default slice.reducer
