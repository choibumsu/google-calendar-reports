import { getTimeSize } from '@/utils/time'

function calendarEvents(state) {
  return state.originEvents.map((originEvent) => ({
    ...originEvent,
    timeSize: getTimeSize(originEvent),
  }))
}

function calendarEventGroup(state, getters) {
  return getters.calendarEvents.reduce((calendarEventGroup, calendarEvent) => {
    const summary = calendarEvent.summary
    if (summary in calendarEventGroup) {
      calendarEventGroup[summary].push(calendarEvent)
    } else {
      calendarEventGroup[summary] = [calendarEvent]
    }
    return calendarEventGroup
  }, {})
}

function eventsTimeSizes(state, getters) {
  const timeSizes = Object.entries(getters.calendarEventGroup).reduce(
    (eventsTimeSizes, eventGroup) => {
      const summary = eventGroup[0]

      const timeSize = eventGroup[1].reduce((timeSize, calendarEvent) => {
        return timeSize + calendarEvent.timeSize
      }, 0)

      if (summary in eventsTimeSizes) {
        eventsTimeSizes[summary] += timeSize
      } else {
        eventsTimeSizes[summary] = timeSize
      }
      return eventsTimeSizes
    },
    {}
  )

  return Object.fromEntries(
    Object.entries(timeSizes).sort((a, b) => {
      return a[1] < b[1] ? 1 : -1
    })
  )
}

export default {
  calendarEvents,
  calendarEventGroup,
  eventsTimeSizes,
}
