export interface ResponseData {
  code: number;
  message: string;
}

export interface ProblemForList {
  id?: number;
  name: string;
  number: string;
  createdAt: string;
  title: string;
}

// 获取题目列表的类型
export interface ProblemListResponseDate extends ResponseData {
  data: {
    size: number;
    total: number;
    list: ProblemForList[];
  };
}
