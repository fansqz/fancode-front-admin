import SvgIcon from './Svgicon/index.vue';
import { App } from 'vue';

// 对外暴露插件对象
export default {
  install(app: App){
    app.component("SvgIcon", SvgIcon)
  }
}