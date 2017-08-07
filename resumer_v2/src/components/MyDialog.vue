<template>
    <div class="dialogwrapper" v-show="visible">
        <div id="MyDialog">
            <header>
                <span class="close" @click="close">X</span>
            </header>
            <main>
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>


export default {
  name: 'MyDialog',
  props: ['visible'],
  methods: {
    close(){
      this.$emit('close')
    },
  }
}
</script>

<style scoped lang="scss">
.dialogwrapper {
    position: fixed;
    background-color: #ece1e1;
    background: url("../assets/login.jpg") no-repeat center center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    padding-top: 10%;
    z-index: 10;
}
#MyDialog {
    padding-top: 5px;
    width: 330px;
    margin: 0 auto;
    text-align: center;
    > header{
        padding-left: 280px;
        .close{
            cursor: pointer;
        }
    }
}

</style>