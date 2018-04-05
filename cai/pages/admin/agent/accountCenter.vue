<template>
  <div class="x_con-li account-center">
    <el-tabs v-model="view" @tab-click="handleClick">
      <el-tab-pane v-for="(label,index) in ['普通开户','链接开户']" :label="label" :name="views[index]" :key="label">
      </el-tab-pane>
    </el-tabs>
    <div class="khzx_list">
      <transition name="el-fade-in-linear" mode="out-in">
        <keep-alive>
            <component :is="view" v-bind="{min,max,quota}"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<style lang="scss" src="../../../assets/scss/admin/account-center.scss">
</style>
<script>
  import NewAccount from '~/components/admin/agent/NewAccount'
  import LinkNewAccount from '~/components/admin/agent/LinkNewAccount'

  export default {
    name:'account-center',
    fetch({store,app}){
      return store.dispatch('getUser')
    },
    data(){
      const views = ['NewAccount','LinkNewAccount']
      return {
        views,
        view:views[0]
      }
    },
    components:{
      NewAccount,
      LinkNewAccount,
    },
    methods:{
      handleClick(view){
        this.view = view.name
      },
    },
    computed:{
      userModel(){
        return this.$store.state.user
      },
      quota(){
        return this.userModel.quota
      },
      min(){
        return this.userModel.child_mini_prize_group
      },
      max(){
        return this.userModel.child_max_prize_group
      },
    }
    
  }  
</script>