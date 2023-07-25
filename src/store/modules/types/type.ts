import type { RouteRecordRaw } from 'vue-router';
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  code: string;
  phone: string;
  email: string;
  sex: string;
  username: string;
}
