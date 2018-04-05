<template>
  <div class="avatar-list">
    <ul>
      <li v-for="item in 15" @click="activeIndex = item">
        <img :src="`/img/avatar/${item}.jpg`" :class="{active:activeIndex === item}" alt="">
      </li>
    </ul>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.avatar-list {
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
  }
  li {
    margin: 3px;
    img {
      max-width: 100%;
      border: 2px solid #fff;
      cursor: pointer;
      &.active {
        cursor: default;
        border-color: $--color-success;
      }
    }
  }
}
</style>


<script>
import { getImageDataURl } from '~/plugins/common'

export default {
  name: 'avatar',
  props: ['visible', 'userModel', 'setUser'],
  data() {
    return {
      activeIndex: 1
    }
  },
  methods: {
    submit() {
      const avatar = getImageDataURl(
        this.$el.querySelectorAll('img')[this.activeIndex - 1]
      )
      this.$axiosPlus(
        'user/set-chat-avatar',
        {
          chat_avatar: avatar
        },
        _ => {
          this.setUser({ ...this.userModel, avatar })
          this.close()
        }
      )
    },
    close() {
      this.$emit('update:visible', false)
    },
    reset() {}
  }
}
</script>
