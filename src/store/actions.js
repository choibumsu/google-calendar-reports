export default {
  setIsSignedIn({ commit }, isSignedIn) {
    commit('setIsSignedIn', isSignedIn)
  },
  setOriginEvents({ commit }, originEvents) {
    commit('setOriginEvents', originEvents)
  },
}
