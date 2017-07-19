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
        { field: 'work history',icon: 'work'},
        { field: 'education',icon: 'Book'},
        { field: 'projects',icon: 'project'},
        { field: 'awards',icon: 'awards'},
        { field: 'contacts',icon: 'phone'},
      ],
      profile: {
        name: '',
        city: '',
        title: ''
      },
      'work history': [
        {company: 'AL',content: '这是我的第二份工作'},
        {company: 'TX',contenr: '这是我的第一份工作'}
      ],
      education: [
        {school: 'A',content: '文字'},
        {school: 'B',content: '文字'},
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
        {contacts: 'phone',content: '777777911'},
        {name: 'QQ',content: '3838998'},
      ],
    }
  },
  mutations: {
     increment (state) {
          state.count++
     },
    switchTab (state,payload){
       state.selected = payload
    }
  }
})
