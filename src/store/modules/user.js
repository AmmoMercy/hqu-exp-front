import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { welcome } from '@/utils/util'
import { USER_ROLE } from '@/store/mutation-types'

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
            const result = response.result
            if (result.code === 200) {
              window.document.cookie =
                '假的cookie=这是一个用来模拟的cookie 正式上线时请删除'
              // const accessedRouters = routerMapSelector(loginType)
              // commit('SET_ROUTERS', accessedRouters)
              // router.addRoutes(accessedRouters)
              Vue.ls.set(USER_ROLE, loginType)
              resolve()
            } else {
              reject(result.msg)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLE', Vue.ls.get(USER_ROLE))
        commit('SET_NAME', { name: 'nigga', welcome: welcome() })
        resolve()
        // getInfo()
        //   .then(response => {
        //     const result = response.result

        //     if (result.role && result.role.permissions.length > 0) {
        //       const role = result.role
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
        window.document.cookie = '假的cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        Vue.ls.remove(USER_ROLE)

        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    }
  }
}

export default user
