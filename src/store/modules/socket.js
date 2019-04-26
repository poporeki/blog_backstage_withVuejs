const state = {
  isConnected: false,
  hardware: {
    cpuUsage: 0,
    memUsage: 0
  }
}

const mutations = {
  /* 更新硬件使用信息 */
  updateHardware(state, data) {
    for (let item in data) {
      state.hardware[item] = parseFloat(data[item]);
    }
  },
  updateConnectStatus(state, data) {
    state.isConnected = data
  }
}

export default {
  state,
  mutations
}