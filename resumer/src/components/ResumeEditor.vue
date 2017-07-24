<template>
  <div id="resumeEditor">
      <nav>
          <ol>
              <li v-for="(item,index) in resumeConfig"
                  :class="{active: item.field === selected}"
                  @click="selected = item.field">
                  <svg class="icon">
                      <use :xlink:href="`#icon-${item.icon}`"></use>
                  </svg>
              </li>
          </ol>
      </nav>
      <ol class="panels">
          <li v-for="item in resumeConfig" v-show="item.field === selected">
              <div v-if="item.type === 'array'">
                <h2>{{$t(`resume.${item.field}._`)}}</h2>
                <div class="subitem" v-for="(subitem,index) in resume[item.field]">
                  <el-button type="primary" icon="delete" @click="removeResumeSubfield(item.field,index)"></el-button>
                  <div class="resumeField" v-for="(value,key) in subitem">
                    <label >{{$t(`resume.${item.field}.${key}`)}}</label>
                    <input type="text" :value="value" @input="updateResume($event.target.value,`${item.field}.${index}.${key}`)"/>
                  </div>
                  <hr/>
                </div>
                <el-button type="primary" icon="plus" @click="addResumeSubfield(item.field)">新增</el-button>
              </div>
              <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                <label >{{$t(`resume.profile.${key}`)}}</label>
                <input type="text" :value="value" @input="updateResume($event.target.value,`${item.field}.${key}`)"/>
             </div>
           </li>
      </ol>
  </div>
</template>


<script>
export default {
  name: 'resumeEditor',
  computed: {
    selected:{
      get (){
        return this.$store.state.selected
      },
      set (value){
        return this.$store.commit('switchTab',value)
      }
    },
    resume (){
      return this.$store.state.resume
    },
    resumeConfig(){
      return this.$store.state.resumeConfig
    }
  },
  methods: {
    add (){
      this.$store.commit('increment')
    },
    updateResume (value,path) {
      this.$store.commit('updateValue', {
        path,
        value,
      })
    },
    addResumeSubfield(field){
      this.$store.commit('addResumeSubfield',{field})
    },
    removeResumeSubfield(field,index){
      this.$store.commit('removeResumeSubfield',{field,index})
    }
  }
}
</script>

<style scoped lang="scss">
#resumeEditor{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    > .panels {
        flex-grow: 1;
        > li{
            padding: 24px;
            hr {
                border: none;
                border-top: 1px solid #ddd;
                margin: 24px 0;
            }
        }
    }
    > nav {
        width: 80px;
        background: black;
        color: white;
        > ol {
            > li {
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
                margin-bottom: 16px;
                color: white;
                &.active {
                    background: white;
                    color: black;
                }
            }
        }
    }
}
svg.icon{
    width: 24px;
    height: 24px;
}
ol {
    list-style: none;
}
.resumeField {
    > label {
        display: block;
    }
    > input[type=text]{
        margin: 16px 0;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.25);
        width: 100%;
        height: 40px;
        padding: 16px 0;
    }
}


</style>

