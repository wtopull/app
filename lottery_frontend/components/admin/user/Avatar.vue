<template>
  <div class="avatar-list">
  	<div class="avatar-title">更换头像</div>
  	<p>选择头像更换</p>
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
	> p{
		background: url(../../../assets/img/members/warning.png) no-repeat left center;
		padding-left: 20px;
	}
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
  > div{
  	display: flex;
  	justify-content: center;
  	margin-top: 22px;
  	& button{
  		width: 136px;
  		height: 46px;
  		border-radius: 8px;
  		margin-right: 20px;
  	}
  }
}
.el-dialog__header{
	height: 52px;
}
.avatar-title{
	width: 200px;
	height: 52px; 
	position: absolute;
	top: 0px;
	left: 0px;
	font-size: 22px;
	color: #fff;
	text-align: left;
	align-items: center;
	justify-content: flex-start !important;
	margin: 0 !important;
	padding-left:38px ;
	background: url(../../../assets/img/indexHome/change.png) no-repeat 14px center;
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
