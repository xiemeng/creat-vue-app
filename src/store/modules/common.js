const state = {
  direction: '',
  isLoading: false
}

// getters
const getters = {
  direction: state => state.direction,
  
}

const actions = {}
// mutations
const mutations = {
  updateDirectionStatus (state, payload) {  //页面切换效果
    state.direction = payload.direction
  },
  updateLoadingStatus (state, payload) {    //页面加载效果
      state.isLoading = payload.isLoading
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}
