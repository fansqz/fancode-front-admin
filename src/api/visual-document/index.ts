import request from '@/utils/request';

enum API {
  //获取用户列表
  VISUAL_DOCUMENT_URL = '/manage/visual/document',
  VISUAL_DOCUMENT_DIRECTORY_URL = '/manage/visual/document/directory',
  VISUAL_DOCUMENT_CODE_URL = '/manage/visual/document/code',
}

// 获取可视化文档目录
export const reqVisualDocumentDirectory = (): Promise<VisualDocumentDirectoryResponse> => {
  return request.get(API.VISUAL_DOCUMENT_DIRECTORY_URL);
};

// 获取可视化文档
export const reqVisualDocument = (id: number): Promise<VisualDocument> => {
  return request.get(`${API.VISUAL_DOCUMENT_URL}/${id}`);
};

// 添加可视化文档
export const reqInsertVisualDocument = (req: InsertVisualDocumentRequest): Promise<InsertVisualDocumentResponse> => {
  return request.post(API.VISUAL_DOCUMENT_URL, req);
};

// 更新可视化文档
export const reqUpdateVisualDocument = (req: UpdateVisualDocumentRequest): Promise<UpdateVisualDocumentResponse> => {
  return request.put(API.VISUAL_DOCUMENT_URL, req);
};

// 更新可视化文档的父节点
export const reqUpdateVisualDocumentParent = (id: number, parentID: number): Promise<UpdateVisualDocumentParentResponse> => {
  return request.post(API.VISUAL_DOCUMENT_URL + '/parent', {
    id: id,
    parentID: parentID,
  });
};

// 删除可视化文档
export const reqDeleteVisualDocument = (id: number): Promise<DeleteVisualDocumentResponse> => {
  return request.delete(`${API.VISUAL_DOCUMENT_URL}/${id}`);
};

// 获取可视化文档支持的代码语言列表
export const reqVisualDocumentCodeLanaguage = (id: number): Promise<VisualDocumentCodeLanguageResponse> => {
  return request.get(`${API.VISUAL_DOCUMENT_URL}/code/languages/${id}`);
};

// 获取可视化文档代码
export const reqVisualDocumentCode = (documentID: number, language: string): Promise<VisaulDocumentCodeResponse> => {
  return request.get(`${API.VISUAL_DOCUMENT_CODE_URL}/${documentID}/${language}`);
};

// 给可视化文档添加样例代码
export const reqInsertVisualDocumentCode = (req: InsertVisualDocumentCodeRequest): Promise<InsertVisualDocumentCodeResponse> => {
  return request.post(API.VISUAL_DOCUMENT_CODE_URL, req);
};

// 更新可视化文档样例代码
export const reqUpdateVisualDocumentCode = (req: UpdateVisualDocumentCodeRequest): Promise<UpdateVisualDocumentCodeResponse> => {
  return request.put(API.VISUAL_DOCUMENT_CODE_URL, req);
};

// 删除可视化文档样例代码
export const reqDeleteVisualDocumentCode = (id: number): Promise<DeleteVisualDocumentCodeResponse> => {
  return request.delete(`${API.VISUAL_DOCUMENT_CODE_URL}/${id}`);
};
