<template>
    <div>
        <div id="app">
            <div id="header">
                <Topbar/>
            </div>
            <div id="main">
                <ResumeEditor/>
                <ResumePreview/>
            </div>
        </div>
    </div>
</template>



<script>
import './assets/reset.css'

import icons from './assets/iconfont.js'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

import store from './store/index'
import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'


export default {
  name: 'app',
  data: function(){
    return {
        test: 'hello'
    }
  },
  store,
  components: {Topbar,ResumeEditor,ResumePreview},
  created(){
    let state = localStorage.getItem('state')
    if(state){
      state = JSON.parse(state)
    }
    this.$store.commit('initState',state)
    this.$store.commit('setUser',getAVUser())
    //this.$store.commit('initState',state)
  }
}
</script>

<style>
.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1em; height: 1em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
     normalize.css 中也包含这行 */
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app{
    height: 100vh;
    display: flex;
    flex-direction: column;
}

#header {
    background: #99a9bf;
}
#main {
    min-width: 1024px;
    max-width: 1440px;
    min-height: 480px;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
}

#editor{
    min-width: 35%;
    background: #444;
}

#preview{
    min-width: 61.66667%;
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
}
</style>
