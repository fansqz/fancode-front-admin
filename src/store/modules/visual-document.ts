import { defineStore } from 'pinia';
import { VisualSetting } from '@/api/visual-document/type.ts';

export type VisualDocument = {
  id: number;
  parentID: number;
  title: string;
  content: string;
  enable: boolean;
  codeList: VisualDocumentCode[];
};

const useVisualDocumentStore = defineStore('visual-document', {
  state: (): VisualDocument => ({
    id: 0,
    parentID: 0,
    title: '',
    content: '',
    enable: false,
    codeList: [],
  }),
});

export type VisualDocumentCode = {
  code: string;
  language: string;
  breakpoints: number[];
  visualSetting: string;
  visualSettingObj: VisualSetting;
};

export default useVisualDocumentStore;
