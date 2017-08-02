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
                </li>
            </ol>
            <div class="seting">
                <svg  class="icon" aria-hidden="true">
                    <use xlink:href="#icon-seting"></use>
                </svg>
            </div>
        </nav>
        <ol class="panels">
            <li v-for="item in resume.visibleItems" v-show="item === selected">{{resume[item]}}</li>
        </ol>
    </div>
</template>

<script>
    export default {
      name: 'ResumeEidtor',
      data() {
        return {
          selected: 'bio',
          resume: {
            visibleItems: ['profile','workHistory','education','projects','awards','contacts'],
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
            workHistory: [],
            education: [],
            prijects: [],
            awards: [],
            contacts: []
          }
        }
      }
    }
</script>

<style lang="scss">
#editor {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    > nav {
        position: relative;
        width: 80px;
        background: #363636;
        color: white;
        .icon {
            font-size: 28px;
        }
        > ol {
            >li {
                height: 48px;
                display: flex;
                justify-content: center;
                margin-top: 20px;
                &.active {
                    color: #4cc036;
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
}
</style>