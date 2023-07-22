import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
// 引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 配置element-plus国际化
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// svg配置
import 'virtual:svg-icons-register';
// 全局组件
import gloalComponent from '@/components';
// 路由
import router from '@/router';
import '@/styles/index.scss';

const app = createApp(App);

app.use(ElementPlus, {
  //element-plus国际化
  locale: zhCn,
});
app.use(gloalComponent);
app.use(router);
app.mount('#app');
