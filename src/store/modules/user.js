import Vue from 'vue'
import { login, logout } from '@/api/login'
import { getEntInfo } from '@/api/enterprise'
import { welcome } from '@/utils/util'
import { USER_ROLE } from '@/store/mutation-types'
import { getStuInfo } from '@/api/student'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    role: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ROLE: (state, role) => {
      state.role = role
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const loginType = userInfo.loginType
        delete userInfo.loginType

        login(userInfo, loginType)
          .then(response => {
            const result = response
            if (result.code === 200) {
              // const accessedRouters = routerMapSelector(loginType)
              // commit('SET_ROUTERS', accessedRouters)
              // router.addRoutes(accessedRouters)
              Vue.ls.set(USER_ROLE, loginType)
              resolve()
            } else {
              reject(result)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        const userRole = Vue.ls.get(USER_ROLE)
        if (userRole) {
          commit('SET_ROLE', userRole)

          if (userRole === 'enterprise') {
            getEntInfo().then(response => {
              commit('SET_INFO', response.data)
              commit('SET_NAME', { name: response.data.name, welcome: welcome() })
            })
          } else if (userRole === 'student') {
            getStuInfo().then(response => {
              commit('SET_INFO', response.data)
              commit('SET_NAME', { name: response.data.name, welcome: welcome() })
            })
          }
          resolve()
        } else {
          reject()
        }
        // getInfo()
        //   .then(response => {
        //     const result = response.result

        //     if (result.role && result.role.permissions.length > 0) {
        //       const role = result.rol
        //       role.permissions = result.role.permissions
        //       role.permissions.map(per => {
        //         if (
        //           per.actionEntitySet != null &&
        //           per.actionEntitySet.length > 0
        //         ) {
        //           const action = per.actionEntitySet.map(action => {
        //             return action.action
        //           })
        //           per.actionList = action
        //         }
        //       })
        //       role.permissionList = role.permissions.map(permission => {
        //         return permission.permissionId
        //       })
        //       commit('SET_ROLES', result.role)
        //       commit('SET_INFO', result)
        //     } else {
        //       reject(new Error('getInfo: roles must be a non-null array !'))
        //     }

        //     commit('SET_NAME', { name: result.name, welcome: welcome() })
        //     commit('SET_AVATAR', result.avatar)

        //     resolve(response)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_ROLE', '')
        if (process.env.NODE_ENV === 'development') {
          window.document.cookie = '_kb_session_id=; expires= ' + new Date(0).toUTCString()
        }
        Vue.ls.remove(USER_ROLE)

        resolve()
      })
    }
  }
}

export default user
