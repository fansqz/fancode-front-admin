import request from '@/utils/request';
import { toFormData } from '@/utils/format';
import { ProblemGetResponseData, ProblemCreateResponseData, ProblemListResponseData } from './type';
import { ProblemUpdateRequestData, ProblemUpdateResponseData } from './type';

enum API {
  //获取题目列表
  LIST_PROBLEM_URL = '/problem/list/',
  //创建题目
  CREATE_PROBLEM_URL = '/problem/insert',
  //获取题目
  GET_PROBLEM_URL = '/problem/get',
  // 更新题目
  UPDATE_PROBLEM_URL = '/problem/update',
  // 下载题目编程文件
  DOWNLOAD_PROBLEM_FILE_URL = '/problem/file/download',
  // 下载题目编程文件的模板文件
  DOWNLOAD_PROBLEM_TEMPLATE_FILE = '/problem/file/download/template',
}

// 获取题目列表
export const reqProblemList = (page: number, limit: number) => {
  return request.get<any, ProblemListResponseData>(API.LIST_PROBLEM_URL + `${page}/+${limit}`);
};

// 创建题目
export const createProblem = () => {
  return request.post<any, ProblemCreateResponseData>(API.CREATE_PROBLEM_URL);
};

// 根据id获取题目信息
export const getProblem = (id: string) => {
  return request.get<any, ProblemGetResponseData>(API.GET_PROBLEM_URL + '/' + id);
};

// 修改题目
export const updateProblem = (
  data: ProblemUpdateRequestData,
): Promise<ProblemUpdateResponseData> => {
  return request({
    method: 'put',
    url: API.UPDATE_PROBLEM_URL,
    data: toFormData(data),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 下载题目的编程文件
export const reqDownloadProblemFile = (id: number) => {
  return request.get<any, any>(API.DOWNLOAD_PROBLEM_FILE_URL + '/' + id, { responseType: 'blob' });
};

// 下载题目的编程文件
export const reqDownloadProblemTemplateFile = () => {
  return request.get<any, any>(API.DOWNLOAD_PROBLEM_TEMPLATE_FILE, { responseType: 'blob' });
};
