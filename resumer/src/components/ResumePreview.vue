<template>
  <div id="resumePreview">
      {{resume}}
  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  computed: {
    resume () {
      return this.$store.state.resume
    }
  }
}
</script>

<style>
#resumePreview{
    color: blue;
    background: #fff;
    box-shadow: 1 1px 3px 0 rgba(0,0,0,0.25);
}
</style>



