import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import EventContainer from './EventContainer'
import { mount } from 'enzyme'

const mockStore = configureStore()

test('Display reminders on the calendar view in the correct time order.', () => {
  const store = mockStore({
    events: {
      isEditing: false,
      currentSelectedDate: {
        day: 2,
        month: 3
      },
      events: [
        {
          day: 2,
          month: 3,
          events: [
            {
              event: {
                title: 'Dinner',
                color: '#FF0000',
                start: 'Thu Apr 02 2020 17:00:00 GMT-0300 (Argentina Standard Time)',
                end: 'Thu Apr 02 2020 17:30:00 GMT-0300 (Argentina Standard Time)'
              },
              id: '073f2061-3b64-425b-a570-6795bb019f8a'
            },
            {
              event: {
                title: 'Watch the game with my in laws',
                color: '#FF0000',
                start: 'Thu Apr 02 2020 18:00:00 GMT-0300 (Argentina Standard Time)',
                end: 'Thu Apr 02 2020 19:30:00 GMT-0300 (Argentina Standard Time)'
              },
              id: '073f2061-3b64-425b-a570-6795bb019f8b'
            },
            {
              event: {
                title: 'Meet my in laws',
                color: '#FF0000',
                start: 'Thu Apr 02 2020 17:00:00 GMT-0300 (Argentina Standard Time)',
                end: 'Thu Apr 02 2020 17:30:00 GMT-0300 (Argentina Standard Time)'
              },
              id: '38d60257-a077-47ac-a812-e24f08ce64e4'
            }
          ]
        }
      ]
    }
  })
  const wrapper = mount(
    <Provider store={store}>
      <EventContainer day={2} month={3} />
    </Provider>
  )
  expect(wrapper.find('CompactEventList').length).toBe(3)
  expect(wrapper.find('CompactEventList').first().text()).toBe('5:00 pm  Dinner')
  expect(wrapper.find('CompactEventList').last().text()).toBe('6:00 pm  Watch the game with my in laws')
})

test('Tests that Events created on April 1st and May 1st appear on separated cells', () => {
  const store = mockStore({
    events: {
      isEditing: false,
      currentSelectedDate: {
        day: 1,
        month: 4
      },
      events: [
        {
          day: 1,
          month: 3,
          events: [
            {
              event: {
                title: 'sasas',
                color: '#FF0000',
                start: 'Wed Apr 01 2020 16:00:00 GMT-0300 (Argentina Standard Time)',
                end: 'Wed Apr 01 2020 16:30:00 GMT-0300 (Argentina Standard Time)'
              },
              id: 'c7c963d0-b105-4971-9935-0c4f707f7ac6'
            }
          ]
        },
        {
          day: 1,
          month: 4,
          events: [
            {
              event: {
                title: 'Hola',
                color: '#FF0000',
                start: 'Fri May 01 2020 16:00:00 GMT-0300 (Argentina Standard Time)',
                end: 'Fri May 01 2020 16:30:00 GMT-0300 (Argentina Standard Time)'
              },
              id: '3c615340-7560-4e8e-9ff1-b72c1eb2f614'
            }
          ]
        }
      ]
    }
  })
  // Day April 1st
  const wrapper1 = mount(
    <Provider store={store}>
      <EventContainer day={1} month={3} />
    </Provider>
  )
  expect(wrapper1.find('CompactEventList').length).toBe(1)
  // Day May 1st
  const wrapper2 = mount(
    <Provider store={store}>
      <EventContainer day={1} month={4} />
    </Provider>
  )
  expect(wrapper2.find('CompactEventList').length).toBe(1)
})
