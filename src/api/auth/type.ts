// 登录接口需要携带的ts类型
export interface loginForm {
  loginName: string;
  password: string;
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number;
  message: string;
  data: any;
}

// 获取用户信息返回相关数据类型
interface user {
  username: string;
  email: string;
  phone: string;
  sex: number;
  role: string;
  loginName: string;
}

export interface userResponseData {
  code: number;
  message: string;
  data: user;
}