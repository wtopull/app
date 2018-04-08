<template>
  <el-scrollbar tag="ul">
    <li v-for="(item,index) in news" :key="item.id">
      <div v-if="detail" :class="['nr',{active:active === index}]" @click="change(item.id)">
        <div class="title">{{item.title}}</div>
        <div class="time">{{item.created_at}}</div>
        <i class="icon iconfont"></i>
      </div>

      <nuxt-link :to="`/news/${item.id}`" v-else>
        <span>{{index === 0 ? '最新' : '往期'}}</span>
        <div class="title">
          {{item.title}}
        </div>
        <div class="content">{{item.created_at}}</div>
      </nuxt-link>

    </li>
  </el-scrollbar>
</template>

<style lang="scss">
.notice_list {
  a {
    color: $--color-text-primary;
  }
  .el-scrollbar__wrap {
    max-height: 700px;
  }
}
</style>

<script>
export default {
  name: 'news-list',
  props: ['change', 'detail','id'],
  computed: {
    news() {
      return this.$store.state.news
    },
    active(){
      return this.id ? this.news.findIndex(_ => _.id === this.id) : 0
    }
  }
}
</script>
