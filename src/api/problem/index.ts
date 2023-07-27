import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  //获取题目列表
  LIST_PROBLEM_URL = '/problem/list/',
  //创建题目
  CREATE_PROBLEM_URL = '/problem/insert',
  //获取题目
  GET_PROBLEM_URL = '/problem/get',
  // 更新题目
  UPDATE_PROBLEM_URL = '/problem/update',
  // 删除题目
  DELETE_PROBLEM_URL = '/problem/delete',
  // 下载题目编程文件
  DOWNLOAD_PROBLEM_FILE_URL = '/problem/file/download',
  // 下载题目编程文件的模板文件
  DOWNLOAD_PROBLEM_TEMPLATE_FILE = '/problem/file/download/template',
  // 设置题目可用
  UPDATE_PROBLEM_ENABLE = '/problem/enable',
}

// 获取题目列表
export const reqProblemList = (page: number, limit: number) => {
  return request.get<any, any>(API.LIST_PROBLEM_URL + `${page}/+${limit}`);
};

// 创建题目
export const reqCreateProblem = () => {
  return request.post<any, any>(API.CREATE_PROBLEM_URL);
};

// 根据id获取题目信息
export const reqGetProblem = (id: string) => {
  return request.get<any, any>(API.GET_PROBLEM_URL + '/' + id);
};

// 修改题目
export const reqUpdateProblem = (data: any): Promise<any> => {
  return request({
    method: 'put',
    url: API.UPDATE_PROBLEM_URL,
    data: toFormData(data),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除题目
export const reqDeleteProblem = (id: number) => {
  return request.delete<any, any>(API.DELETE_PROBLEM_URL + '/' + id);
};

// 下载题目的编程文件
export const reqDownloadProblemFile = (id: number) => {
  return request.get<any, any>(API.DOWNLOAD_PROBLEM_FILE_URL + '/' + id, { responseType: 'blob' });
};

// 下载题目的编程文件
export const reqDownloadProblemTemplateFile = () => {
  return request.get<any, any>(API.DOWNLOAD_PROBLEM_TEMPLATE_FILE, { responseType: 'blob' });
};

// 设置题目可用
export const reqUpdateProblemEnable = (id: number, enable: boolean): Promise<any> => {
  return request({
    method: 'post',
    url: API.UPDATE_PROBLEM_ENABLE,
    data: toFormData({
      problemID: id,
      enable: enable,
    }),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
