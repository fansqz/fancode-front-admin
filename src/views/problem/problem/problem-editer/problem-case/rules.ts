import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { caseData, validateCaseName } from './case-editer.vue';

// 表单校验
export const rules = reactive<FormRules<typeof caseData>>({
  name: [
    { required: true, message: '请输入用例名', trigger: 'blur' },
    { validator: validateCaseName, trigger: 'blur' },
  ],
  input: [
    {
      required: true,
      message: '输入数据不能为空',
      trigger: 'change',
    },
  ],
  output: [
    {
      required: true,
      message: '输出数据不能为空',
      trigger: 'change',
    },
  ],
});
