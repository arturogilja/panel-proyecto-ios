import axios from 'axios'
import router from '../../router'

const token = localStorage.getItem('token')

const state = token ? { status: { loggedIn: true }, token, error: null } : { status: {}, token: null, error: null }

const actions = {
  login({ commit }, { identifier, password }) {
    commit('loginRequest')
    axios
      .post('https://arturogil.com.mx/api/auth/local', {
        identifier,
        password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.jwt)
        if (res.data.user.role.name !== 'cocinero') commit('loginFailure', 'Credenciales no validas')
        else {
          commit('loginSuccess', res.data.jwt)
          router.push('/pedidos')
        }
      })
      .catch((err) => {
        commit('loginFailure', 'Credenciales no validas')
      })
  },

  logout({ commit }) {
    localStorage.removeItem('token')
    commit('logout')
    router.push('/')
  },
}

const mutations = {
  loginRequest(state) {
    state.status = { loggingIn: true }
    state.token = null
    state.error = null
  },

  loginSuccess(state, token) {
    state.status = { loggedIn: true }
    state.token = token
    state.error = null
  },

  loginFailure(state, error) {
    state.status = {}
    state.token = null
    state.error = error
  },

  logout(state) {
    state.status = {}
    state.token = null
  },
}

export const login = {
  namespaced: true,
  state,
  actions,
  mutations,
}
