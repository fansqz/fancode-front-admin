import request from '@/utils/request';
import type { ProblemListResponseDate } from './type';

enum API {
  //获取题目列表
  LISTPROBLEM_URL = '/problem/list/',
}

// 获取题目列表
export const reqProblemList = (page: number, limit: number) => {
  return request.get<any, ProblemListResponseDate>(API.LISTPROBLEM_URL + `${page}/+${limit}`);
};
