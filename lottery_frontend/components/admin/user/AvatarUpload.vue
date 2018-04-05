<template>
  <div :class="['header',{'upload-success':uploadSuccess}]" @mouseenter="uploadSuccess = true" @mouseleave="uploadSuccess = false">
            <el-upload class="avatar-upload" action="" :auto-upload="false" :on-change="upload" :show-file-list="false" ref="avatar-upload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <img :src="avatar" alt="">
        </div>
</template>

<style lang="scss">
.userinfo .header {
  .avatar-upload {
    position: absolute;
    display: none;
    background: rgba(0, 0, 0, 0.75);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
  }
  .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  .el-icon-plus {
    color: white;
    font-size: 4em;
    &:focus {
      outline: none;
    }
  }
  &.upload-success {
    .avatar-upload {
      display: block;
    }
  }
}
</style>

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Upload } from 'element-ui'
import { imageCompress } from '~/plugins/common'
Vue.use(Upload)

export default {
  name: 'avatar-upload',
  data() {
    return {
      uploadSuccess: false
    }
  },
  methods: {
    upload(file) {
      if (file.size > 1024 * 500) {
        return this.$message.error({
          duration: 2000,
          message: '头像文件不能大于500k！'
        })
      }
      const [image, ext] = file.raw.type.split('/')
      if (image !== 'image' && !/png|jpe?g|gif|svg|webp/.test(ext)) {
        return this.$message.error({
          duration: 2000,
          message: '头像文件必须为图片！'
        })
      }
      const { url } = file
      // blobToDataURL(file.raw, chat_avatar => {
      imageCompress(url, file.raw.type, chat_avatar => {
        this.$axiosPlus('user/set-chat-avatar', { chat_avatar }, _ => {
          this.setUser({ ...this.userModel, avatar: chat_avatar })
          this.$avatarUpload.clearFiles()
          this.uploadSuccess = false
          //file.url = URL.createObjectURL(rawFile);
          // node_modules\element-ui\packages\upload\src\index.vue
          URL.revokeObjectURL(url)
        })
      })
    },
    ...mapMutations(['setUser'])
  },
  computed: {
    ...mapState({
      userModel: 'user'
    }),
    ...mapGetters(['avatar'])
  },
  mounted() {
    this.$avatarUpload = this.$refs['avatar-upload']
  }
}
</script>
