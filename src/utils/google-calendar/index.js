import store from '@/store'

const gapi = window.gapi
const CLIENT_ID = ''
const API_KEY = ''
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
]
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

export function handleClientLoad() {
  gapi.load('client:auth2', initClient)
}

export function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn()
}

export function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut()
}

function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        updateSigninStatus(isSignedIn)
      },
      function (error) {
        console.log(error)
      }
    )
}

function updateSigninStatus(isSignedIn) {
  store.dispatch('setIsSignedIn', isSignedIn)

  if (isSignedIn) {
    signinStateCallback()
  } else {
    signoutStateCallback()
  }
}

function signinStateCallback() {
  listUpcomingEvents()
  console.log('signin')
}

function signoutStateCallback() {
  console.log('signout')
}

function listUpcomingEvents() {
  gapi.client.calendar.events
    .list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 20,
      orderBy: 'startTime',
    })
    .then(function (response) {
      const originEvents = response.result.items
      store.dispatch('setOriginEvents', originEvents)
    })
}
