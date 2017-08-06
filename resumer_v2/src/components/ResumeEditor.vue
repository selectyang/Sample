<template>
    <div v-if="editorShow" id="editor">
        <nav>
            <ol>
                <li v-for="(item,index) in resumeConfig"
                    :class="{active: item.field === selected}"
                    @click="selected = item.field">
                    <svg  class="icon" aria-hidden="true">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                    </svg>
                    <div class="gk_gl"></div>
                </li>
            </ol>
            <div :class="{hover: buttonShow}"
                 class="seting"
                  @click="isHover">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-seting"></use>
                </svg>
                <ul class="child-class">
                    <li><el-button  @click="preview" type="danger">预览</el-button></li>
                    <li><el-button  @click="save" type="danger">保存</el-button></li>
                </ul>
            </div>
        </nav>
        <ol class="panels">
            <li v-for="item in resumeConfig" v-show="item.field === selected">
                <div v-if="item.type === 'array'">
                    <h3>{{$t(`resume.${item.field}._`)}}</h3>
                    <div class="subitem" v-for="(subitem,i) in resume[item.field]">
                        <el-button class="remove" @click="removeResumeSubfield(item.field, i)" size="mini">删除</el-button>
                        <div class="resumeField" v-for="(value,key) in subitem">
                            <label> {{$t(`resume.${item.field}.${key}`)}} </label>
                            <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`,$event.target.value)"/>
                        </div>
                        <hr/>
                    </div>
                    <el-button class="add" @click="addResumeSubfield(item.field)" type="primary" size="mini">新增</el-button>
                </div>
                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label> {{$t(`resume.profile.${key}`)}}</label>
                    <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)"/>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
      name: 'ResumeEidtor',
      data(){
        return {
          buttonShow: false,

        }
      },
      computed: {
        selected:{
          get () {
            return this.$store.state.selected
          },
          set(value){
            return this.$store.commit('switchTab',value)
          }
        },
        resume (){
          return this.$store.state.resume
        },
        resumeConfig(){
          return this.$store.state.resumeConfig
        },
        editorShow(){
          return this.$store.state.editorShow
        }
      },
      methods: {
        changeResumeField(path,value){
          this.$store.commit('updateResume',{
            path,
            value
          })
        },
        addResumeSubfield(field){
          this.$store.commit('addResumeSubfield',{field})
        },
        removeResumeSubfield(field,index){
          this.$store.commit('removeResumeSubfield',{field, index})
        },
        isHover(){
          this.buttonShow = !this.buttonShow
        },
        save(){
          this.$store.dispatch('saveResume')
        },
        preview(){
          this.$store.commit('PreviewResumerHide')
        }
      }
    }
</script>

<style scoped lang="scss">
#editor {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    > nav {
        position: relative;
        width: 60px;
        background: #363636;
        color: white;
        .icon {
            font-size: 28px;
        }
        > ol {
            >li {
                position: relative;
                height: 48px;
                display: flex;
                justify-content: center;
                margin-top: 20px;
                &.active {
                    color: #4cc036;
                }
                &.active .gk_gl {
                    border-color: transparent;
                    border-right-color: #fff;
                    border-style: solid;
                    border-width: 8.5px 8.5px 8.5px 0;
                    position: absolute;
                    right: -1px;
                    top: 5px;
                    z-index: 1;
                    height: 0;
                    width: 0;
                }
            }
        }
        .seting {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%,-50%);
            .child-class {
                position: absolute;
                left: 50px;
                top: -55px;
                width: 60px;
                text-align: center;
                display: none;
                 li {
                    width: 50px;
                    font-size: 14px;
                    padding: 5px 10px;
                }
            }

        }
        .seting.hover .child-class {
            display: block;
        }
    }
    .panels {
        flex-grow: 1;
        >li {
            padding: 18px;
            h3 {
                text-align: center;
                margin-bottom: 20px;
            }
            .add {
                margin-left: 42%;
            }
            .remove {
                float: right;
            }
            .resumeField {
                > label {
                    display: block;
                }
                input[type=text]{
                    margin: 16px 0;
                    border: 1px solid #ddd;
                    box-shadow : inset 0 1px 3px 0 rgba(0,0,0,0.25);
                    width: 100%;
                    height: 40px;
                    padding: 0 8px;
                }
            }
            hr {
                border: none;
                border-top: 2px solid #4cc036;
                margin: 24px 0;
            }
        }
    }

}
</style>