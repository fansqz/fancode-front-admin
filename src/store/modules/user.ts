import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/auth';
import type { loginForm } from '@/api/auth/type';
import type { UserState } from './types/type';
// 引入路由
import { constantRoute } from '@/router/routers';

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constantRoute,
      email: '',
      phone: '',
      sex: '',
      username: '',
      loginName: '',
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      const result = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.data;
        // 本地存一份
        localStorage.setItem('TOKEN', result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userInfo() {
      const result = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.username;
        this.email = result.data.email;
        this.sex = result.data.email;
        this.phone = result.data.phone;
        this.loginName = result.data.loginName;
      }
    },
    userLogout() {
      this.token = '';
      this.username = '';
      this.email = '';
      this.sex = '';
      this.phone = '';
      this.loginName = '';
      localStorage.removeItem('TOKEN');
    },
  },
  getters: {},
});

export default useUserStore;
