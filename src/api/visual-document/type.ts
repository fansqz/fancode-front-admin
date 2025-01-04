
type VisualDocumentDirectoryResponse = BaseResponse & {
  data: VisualDocumentDirectory;
};

type VisualDocumentDirectory = {
  // 可视化节点
  id: number;
  parent: number;
  title: string;
  enable: boolean;
  chidren: VisualDocumentDirectory[];
};

type VisualDocumentResponse = BaseResponse & {
  data: VisualDocument;
};

type VisualDocument = {
  id: number;
  parent: number;
  titile: string;
  content: string;
  creatorID: number;
  enable: boolean;
};

type InsertVisualDocumentRequest = {
  parent: number;
  titile: string;
  content: string;
  enable: boolean;
};

type InsertVisualDocumentResponse = BaseResponse & {
  data: number;
};

type UpdateVisualDocumentRequest = {
  id: number;
  parent: number;
  titile: string;
  content: string;
  enable: boolean;
};

type UpdateVisualDocumentResponse = BaseResponse & {
  data: string;
};

type UpdateVisualDocumentParentResponse = BaseResponse & {
  data: string;
};

type DeleteVisualDocumentResponse = BaseResponse & {
  data: string;
};

type VisualDocumentCodeLanguageResponse = BaseResponse & {
  data: string[];
};

type VisaulDocumentCodeResponse = BaseResponse & {
  data: VisualDocumentCode;
};

type VisualDocumentCode = {
  id: number;
  documentID: number;
  code: string;
  language: string;
  breakpoints: number[];
  visualSetting: string;
};

type InsertVisualDocumentCodeRequest = {
  documentID: number;
  code: string;
  language: string;
  breakpoints: number[];
  visualSetting: string;
};

type InsertVisualDocumentCodeResponse = BaseResponse & {
  data: number;
};


type UpdateVisualDocumentCodeRequest = {
  id: number;
  code: string;
  breakpoints: number[];
  visualSetting: string;
};

type UpdateVisualDocumentCodeResponse = BaseResponse & {
  data: string;
};

type DeleteVisualDocumentCodeResponse = BaseResponse & {
  data: string;
};