<template src="../templates/admin/index.html">
</template>
<style lang="scss" src="../assets/scss/admin/index.scss">
</style>
<script>
import '~/assets/c8css/manager.css'
export default {
    fetch({redirect,route:{matched}}){
        if(matched.length <= 1) {
            redirect('/admin/user')
        }
    },
    data(){
        return {
            
        }
    },
    created(){
        
    }
  
}
</script>
