<template src="../templates/admin/index.html">
</template>

<style src="../assets/c8css/manager.css">

</style>

<style lang="scss" src="../assets/scss/admin/index.scss">

</style>



<script>
export default {
  name:'admin',
  fetch({ redirect, route: { matched } }) {
    if (matched.length <= 1) {
      redirect('/admin/user')
    }
  },
  computed: {
    isAgent(){
        return this.$store.getters.isAgent
    }
  }
}
</script>
