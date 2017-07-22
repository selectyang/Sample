import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    selected: 'profile',
    resume: {
      config: [
        { field: 'profile',icon: 'visiting'},
        { field: 'workHistory',icon: 'work'},
        { field: 'education',icon: 'Book'},
        { field: 'projects',icon: 'project'},
        { field: 'awards',icon: 'awards'},
        { field: 'contacts',icon: 'phone'},
      ],
      profile: {
        name: 'Select',
        city: 'shenz',
        title: 'farmer',
        birthday: '1988-02-02'
      },
      'workHistory': [
        {company: 'xxx公司',content: `公司成立于1997年12月20日，总部设在深圳。专注PC xxx，主要产品xxxx。
        我的主要工作如下:
         完成既定产品需求。
         修复 bug。`},
        {company: 'yyy公司',content: `公司成立于1998年12月20日，总部设在上海。专注PC xxx，主要产品xxxx。
        我的主要工作如下:
         完成既定产品需求。
         修复 bug。`}
      ],
      education: [
        {school: 'XXX城市管理学院',content: '专科'},
        {school: 'XXX高级中学'},
      ],
      projects: [
        {name: 'project A',content: '文字'},
        {name: 'porject B',content: '文字'},
      ],
      awards: [
        {name: 'awards A',content: '文字'},
        {name: 'awards B',content: '文字'},
      ],
      contacts: [
        {contact: 'phone',content: '777777911'},
        {contact: 'QQ',content: '3838998'},
      ],
    }
  },
  mutations: {
     increment (state) {
          state.count++
     },
    switchTab(state,payload) {
       state.selected = payload
    }
  }
})
