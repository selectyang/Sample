<template>
    <div id="editor">
        <nav>
            <ol>
                <li v-for="(item,index) in resume.config"
                    :class="{active: item.field === selected}"
                    @click="selected = item.field">
                    <svg  class="icon" aria-hidden="true">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                    </svg>
                    <div class="gk_gl"></div>
                </li>
            </ol>
            <div class="seting">
                <svg  class="icon" aria-hidden="true">
                    <use xlink:href="#icon-seting"></use>
                </svg>
            </div>
        </nav>
        <ol class="panels">
            <li v-for="item in resume.config" v-show="item.field === selected">
                <h3>{{item.field}}</h3>
                <div v-if="resume[item.field] instanceof Array">
                    <div class="subitem" v-for="subitem in resume[item.field]">
                        <div class="resumeField" v-for="(value,key) in subitem">
                            <lable>{{key}}</lable>
                            <input type="text" :value="value"/>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <lable>{{key}}</lable>
                    <input type="text" v-model="resume[item.field][key]"/>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
      name: 'ResumeEidtor',
      data() {
        return {
          selected: 'profile',
          resume: {
            config: [
                {field: 'profile', icon: 'mingpian'},
                {field: 'workHistory', icon: 'work'},
                {field: 'education', icon: 'book'},
                {field: 'projects', icon: 'projects'},
                {field: 'awards', icon: 'cup'},
                {field: 'contacts', icon: 'phone'}
            ],
            profile:{
              name: '',
              city: '',
              title: ''
            },
            workHistory: [
              {company: 'AL', content: '我的第二份工作是'},
              {company: 'TX', content: '我的第一份工作是'},
            ],
            education: [
              {school: 'AL', content: '文字'},
              {school: 'TX', content: '文字'},
            ],
            projects: [
              {name: 'project A', content: '文字'},
              {name: 'project B', content: '文字'},
            ],
            awards: [
              {name: 'awards A', content: '文字'},
              {name: 'awards B', content: '文字'},
            ],
            contacts: [
              {contact: 'phone', content: '13812345678'},
              {contact: 'qq', content: '12345678'},
            ],
          }
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
            .resumeField {
                >lable {
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