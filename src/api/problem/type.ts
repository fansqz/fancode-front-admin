export interface ResponseData {
  code: number;
  message: string;
}

export interface ProblemForList {
  id?: number;
  name: string;
  code: string;
  createdAt: string;
  title: string;
}

export interface ProblemForGet {
  id: number;
  name: string;
  code: string;
  title: string;
  description: string;
  path: string;
}

// 获取题目列表的类型
export interface ProblemListResponseData extends ResponseData {
  data: {
    size: number;
    total: number;
    list: ProblemForList[];
  };
}

// 创建题目返回类型
export interface ProblemCreateResponseData extends ResponseData {
  // 创建成功的题目id
  data: string;
}

// 获取题目返回类型
export interface ProblemGetResponseData extends ResponseData {
  data: ProblemForGet;
}

// 修改题目需要提交的类型
export interface ProblemUpdateRequestData {
  id: number;
  code: string;
  name: string;
  description: string;
  title: string;
  file: File;
}

// 更新题目返回类型
export interface ProblemUpdateResponseData extends ResponseData {
  data: string;
}

// 删除题目返回类型
export interface ProblemDeleteResponseData extends ResponseData {
  data: string;
}