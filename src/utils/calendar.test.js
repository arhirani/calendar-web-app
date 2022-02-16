import CalendarUtils from './calendar'

const calendar = new CalendarUtils()

test('Test for non-negative days in the calendar', () => {
  const today = 'Tue Apr 01 2020 20:00:00 GMT-0300 (Argentina Standard Time)'
  const { monthDaysByWeek } = calendar.getCurrentCalendar(new Date(today))
  for (const week of monthDaysByWeek) {
    for (const weekDay of week) {
      expect(weekDay.day).toBeGreaterThan(0)
    }
  }
})

test('Test for current day', () => {
  const todayString = 'Tue Apr 01 2020 20:00:00 GMT-0300 (Argentina Standard Time)'
  const today = new Date(todayString)
  const { monthDaysByWeek } = calendar.getCurrentCalendar(today)
  const firstWeek = monthDaysByWeek[0]
  expect(firstWeek[0].day).toBe(29)
  expect(firstWeek[0].month).toBe(2)
  expect(firstWeek[0].isCurrentDay).toBeFalsy()
  const aprilFirst = firstWeek[3]
  expect(aprilFirst.day).toBe(1)
  expect(aprilFirst.month).toBe(3)
})

test('May 1st after April 30th', () => {
  const todayString = 'Tue Apr 01 2020 20:00:00 GMT-0300 (Argentina Standard Time)'
  const today = new Date(todayString)
  const { monthDaysByWeek } = calendar.getCurrentCalendar(today)
  const mayFirst = monthDaysByWeek[4][5]
  expect(mayFirst.day).toBe(1)
})

test('May 31st - June 1st ', () => {
  const todayString = 'Tue Jun 01 2020 20:00:00 GMT-0300 (Argentina Standard Time)'
  const juneFirst = new Date(todayString)
  const { monthDaysByWeek } = calendar.getCurrentCalendar(juneFirst)
  const May31st = monthDaysByWeek[0][0]
  expect(May31st.day).toBe(31)
})
