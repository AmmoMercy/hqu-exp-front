const student = {
  state: {
    stuid: '',
    entid: '',
    expid: ''
  },
  mutations: {
    SET_STU_ID: (state, id) => {
      state.stuid = id
    },
    SET_ENT_ID: (state, id) => {
      state.entid = id
    },
    SET_EXP_ID: (state, id) => {
      state.expid = id
    }
  },
  actions: {}
}
export default student
