import { descriptions } from '@/constants/description';

export type VisualDocumentDirectoryResponse = BaseResponse & {
  data: VisualDocumentDirectory[];
};

export type VisualDocumentDirectory = {
  // 可视化节点
  id: number;
  parentID: number;
  title: string;
  enable: boolean;
  order: number;
  chidren: VisualDocumentDirectory[];
};

export type VisualDocumentResponse = BaseResponse & {
  data: VisualDocument;
};

export type VisualDocument = {
  id: number;
  parentID: number;
  title: string;
  content: string;
  creatorID: number;
  enable: boolean;
  codeList: VisualDocumentCode[];
};

export type InsertVisualDocumentRequest = {
  parentID: number;
  title: string;
  content: string;
  enable: boolean;
};

export type InsertVisualDocumentResponse = BaseResponse & {
  data: number;
};

export type UpdateVisualDocumentRequest = {
  id: number;
  parentID: number;
  title: string;
  content: string;
  enable: boolean;
  codeList: VisualDocumentCode[];
};

export type VisualDocumentCode = {
  code: string;
  language: string;
  breakpoints: number[];
  visualSetting: string;
};

export type UpdateVisualDocumentResponse = BaseResponse & {
  data: string;
};

export type UpdateVisualDocumentParentResponse = BaseResponse & {
  data: string;
};

export type DeleteVisualDocumentResponse = BaseResponse & {
  data: string;
};

export type VisualSetting = {
  type: descriptions;
  description: VisualDescription;
};

// 可视化描述类型
export type VisualDescription =
  | ArrayDescription
  | BinaryTreeDescription
  | LinkListDescription
  | GraphDescription
  | any;

// 数组可视化描述
export type ArrayDescription = {
  arrayName: string;
  pointNames: string[];
};

// 二叉树可视化描述
export type BinaryTreeDescription = {
  // 二叉树节点结构体名称
  treeNode: string;
  // 数据域
  data: string;
  // 左子树和右边子树属性名称
  left: string;
  right: string;
};

// 图的可视化描述
export type GraphDescription = {
  // 二叉树节点结构体名称
  graphNode: string;
  // 数据域
  data: string;
  nexts: string[];
};

// 链表的可视化描述
export type LinkListDescription = {
  // 链表节点
  linkNode: string;
  // 数据域
  data: string;
  next: string;
  prev?: string;
};
