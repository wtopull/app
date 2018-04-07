<template>
  <div class="setQuestion">
    <div class="setQuestion-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>设置密保问题</p>
    </div>
    <div class="setQuestion-input">
      <div>
        <p>安全密码</p>
        <el-select v-model="value8" filterable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div>
        <p>确认密码</p>
        <input type="password" placeholder="请再次输入密码" /> </div>
    </div>
    <div class="setQuestion-but">
      <button @click="setQuestion">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '点击选择密保问题'
        }, {
          value: '选项2',
          label: '你的小学班主任是谁？'
        }, {
          value: '选项3',
          label: '你的初中班主任是谁？'
        }, {
          value: '选项4',
          label: '你的高中班主任是谁？'
        }, 
        {
          value: '选项5',
          label: '你最喜欢的人是谁？'
        },
        {
          value: '选项6',
          label: '你的爸爸名字叫什么？'
        },
        {
          value: '选项7',
          label: '你的妈妈名字叫什么？'
        },
        {
          value: '选项8',
          label: '你的配偶名字叫什么？'
        },
        ],
        value8: '选项1'
      }
    },
    methods: {
      setQuestion() {
        this.$router.push({
          path: '/safety'
        });
      }
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/safety/setQuestion.scss';
</style>