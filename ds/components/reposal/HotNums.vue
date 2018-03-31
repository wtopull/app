<template>
  <el-dialog custom-class="reposal-hot-nums" title="快选金额" :visible.sync="visible" @close="reset" @open="get" :modal="false">
            <small>注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。可設置最小值1元，最大值100000元</small>
            <transition-group tag="ul" :css="false" @leave="leave">
              <!--https://stackoverflow.com/questions/43598308/vue-js-wrong-transition-group-animation-position-->
                <li v-for="(item,index) in fixTransitionGroup" :key="item" :class="`a${index}`">
                    <el-input-number v-model="nums[index]" controls-position="right" :min="1" :max="100000" :step="10"></el-input-number>
                    <button class="el-button el-button--info" v-show="nums.length > 1" @click="remove(index)" tabIndex="-1">删除</button>
                </li>
            </transition-group>
            <div v-show="nums.length < 5" >
                <el-input-number controls-position="right" v-model="newNum" :min="1" :max="100000" @keyup.native.enter="addDelay" />
                <el-button type="danger" @click="add">增加</el-button>
            </div>
            <div slot="footer">
                <el-switch
                        v-model="enabled"
                        active-text="已启用"
                        inactive-text="已禁用"
                        >
                </el-switch>
                <el-button @click="save" type="primary" size="mini">保存</el-button>
            </div>
        </el-dialog>
</template>
<style lang="scss" src="../../assets/scss/reposal/hot-nums.scss">
</style>

<script>
  import Vue from 'vue'
  import {Switch} from 'element-ui'
  import { mapGetters, mapMutations } from 'vuex'
  Vue.use(Switch)
  export default {
    props:['removeItem','itemLeave'],
    data(){
      return {
        leaveable:false,
        newNum:'100',
        visible:true,
        enabled:true,
        //todos times must be an integer
        nums:[],
        isSave:false,
        fixTransitionGroup:[]
      }
    },
    created(){
      //before @open run,first visible true not  emit @open
      this.get()
    },
    methods:{
      add(){
        this.leaveable = false //fix remove mult items after add a needless anime
        this.nums.push(this.newNum)
        this.fixTransitionGroup = this.nums.map((v,k) => `a${k}`)
        this.newNum = '1'
      },
      addDelay(){
        //debounce 300 http://element.eleme.io/#/zh-CN/component/input-number
        setTimeout(this.add,300)
      },
      remove(index){
        this.removeItem(index,'nums',1,this)
        this.fixTransitionGroup.splice(index,1)
      },
      leave(el,done){
        this.itemLeave(el,done,this)
      },
      save(){
        this.isSave = true
        this.toggle(this.enabled)
        this.saveNums(this.nums)
        this.visible = false
      },
      get(){
        this.enabled = this.hotable
        this.nums = this.hotNums.slice()
        this.fixTransitionGroup = this.nums.map((v,k) => `a${k}`)
      },
      reset(){
        setTimeout(() => {
          !this.isSave && this.get()
          this.isSave = false
          this.leaveable = false
          this.newNum = '100'
        },300) //element-ui dialog-fade-enter-active animation-duration 300ms
      },
      ...mapMutations({
        toggle:'reposal/toggleHot',
        saveNums:'reposal/setNums'
      })
    },
    computed:{
      hotNums(){
        return this.$store.state.reposal.nums
      },
      ...mapGetters({
        hotable:'reposal/hotable'
      })
    }
  }
</script>