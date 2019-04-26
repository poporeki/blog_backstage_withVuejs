const SHOWLOADING = 'SHOWLOADING';
const HIDELOADING = 'HIDELOADING';

const state = {
  showLoading: false,
  isLogin: false,
  isLoading: false
}

const mutations = {
  SHOWLOADING(state) {
    state.showLoading = true;
  },
  HIDELOADING(state) {
    state.showLoading = false;
  }
}

const actions = {
  showloader: ({
    commit
  }) => {
    commit(SHOWLOADING)
  },
  hideloader: ({
    commit
  }) => {
    commit(HIDELOADING)
  }
}

export default {
  state,
  mutations,
  actions
}