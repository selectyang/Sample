import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from "object-path"
import AV from '../lib/leancloud'
import getAVUser from '../lib/getAVUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
      { field: 'profile',icon: 'visiting',keys: ['name','city','title','birthday']},
      { field: 'workHistory',icon: 'work',type: 'array',keys: ['company','details']},
      { field: 'education',icon: 'Book',type: 'array',keys: ['school','details']},
      { field: 'projects',icon: 'project',type: 'array',keys: ['name','details']},
      { field: 'awards',icon: 'awards',type: 'array',keys: ['name','details']},
      { field: 'contacts',icon: 'phone',type: 'array',keys: ['contact','content']},
    ],
    resume: {
    }
  },
  mutations: {
     increment (state) {
          state.count++
     },
    initState(state,payload){
       state.resumeConfig.map((item)=>{
         if(item.type === 'array'){
           Vue.set(state.resume,item.field,[])
         }else {
           Vue.set(state.resume,item.field,{})
           item.keys.map((key)=> {
             Vue.set(state.resume[item.field],key,'')//state.resume[item.field][key] = '' // 这样写 Vue 无法监听属性变化
           })
         }
       })
       Object.assign(state,payload)
    },
    switchTab(state,payload) {
       state.selected = payload
       localStorage.setItem('state',JSON.stringify(state))
    },
    updateValue(state,{path,value}){
        objectPath.set(state.resume,path,value)
        localStorage.setItem('state',JSON.stringify(state))
      },
    setUser(state,payload){
        Object.assign(state.user,payload)
    },
    removerUser(state){
      state.user.id = ''
    },
    addResumeSubfield(state,{field}){
      let empty = {}
      //?
      state.resume[field].push(empty)
      state.resumeConfig.filter((i)=>i.field === field)[0].keys.map((key)=>{
        Vue.set(empty,key,'')
      })
    },
    removeResumeSubfield(state,{field,index}){
      state.resume[field].splice(index,1)
    },
    setResumeId(state,{id}){
      state.resume.id = id
    }
  },
  actions: {
    saveResume({state,commit},payload){
      var Resume = AV.Object.extend('Resume')
      if(state.resume.id){

      }else {
        var resume = new Resume()
        resume.set('profile',state.resume.profile)
        resume.set('workHistory',state.resume.workHistory)
        resume.set('education',state.resume.education)
        resume.set('projects',state.resume.projects)
        resume.set('awards',state.resume.awards)
        resume.set('comtacts',state.resume.contacts)
        resume.set('owner_id',getAVUser().id)

        var acl = new AV.ACL()
        acl.setPublicReadAccess(true)
        acl.setWriteAccess(AV.User.current(),true)

        resume.setACL(acl)
        resume.save().then(function (response){
          commit('setResumeId',{id: response.id})
        }).catch(function(error){
          console.log(error)
        })
      }
    }
  }
})
