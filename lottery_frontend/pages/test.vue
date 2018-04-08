<template>
  <div class="test">
    <router-link to="/lottery/asdasda">無效彩種測試</router-link>
    <br>
    <input type="text" v-model="req.name">
    <input type="password" v-model="req.password">
    <button @click="login">login</button>
    <div>{{errorMsg}}餘額{{bal}} expires {{testExpires | time}} 返點{{point}}</div>
    <br>
    <input type="text" v-model="apiUri" style="width:300px">
    <br>
    <label>Parameters</label>
    <textarea v-model="param" style="width: 400px;height: 200px;white-space: pre;"></textarea>
    <button @click="testApi">testApi</button>
    <div>Responses:{{apiRes}}</div>
    <h3>開戶</h3>
    <input type="text" placeholder="下级帐号" v-model="newAccount.name">
    <input type="text" placeholder="下级密碼" v-model="newAccount.password">
    <input type="text" placeholder="下级真实名字" v-model="newAccount.real_name">
    <input type="text" placeholder="下级暱稱" v-model="newAccount.nick_name">
    <input type="text" placeholder="下级奖金组" v-model="newAccount.prize_group">
    <button @click="openAccount">開戶</button>
    <br>
    <button @click="checkDomains">域名检测</button>
    <el-upload class="upload-demo" drag action="" :auto-upload="false" :on-change="preview">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
    </el-upload>
  </div>

</template>

<style>
.test {
  color: #000;
}
</style>


<script>
import axios from 'axios'
import { zipObject } from 'lodash/fp'
import { DeviceType } from '~/plugins/UA'
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import { Upload } from 'element-ui'
import { supportWebp } from '~/plugins/common'
import NP from 'number-precision'
import logout from '~/util/logout'

Vue.use(Upload)

export default {
  name: 'test',
  created() {
    // this.login()
    this.$styleLog(supportWebp, 'supportWebp')
    this.$styleLog(process.env.NODE_ENV, 'env')
    this.$styleLog(NP.minus(1.0, 0.9), 'number-precision')
  },
  data() {
    return {
      req: {
        name: 'frank01',
        password: '1234',
        device_type: DeviceType
      },
      errorMsg: '',
      apiUri: 'static-data/lottery-infos',
      apiRes: '',
      param: '',
      newAccount: {
        name: '',
        password: '1234',
        real_name: '快速开户',
        nick_name: '快速开户',
        prize_group: 1952
      },
      testObj: {},
      testValue: '',
      imageUrl: ''
    }
  },
  methods: {
    login() {
      const { ip } = this
      this.$axiosPlus(
        '/user/login',
        { ip, ...this.req },
        data => {
          if (data.message) {
            //errorCode 100102 不存在的用户
            // 100131 密码错误
            this.errorMsg = data.message
          } else if (data.user_token) {
            const {
              user_token: { token, expired_at: expires },
              user,
              user_balance_account: bal,
              user_role: role
            } = data
            this.$axios.setHeader('Token', token)
            this.setUser({ token, expires, role, ...user })
            this.setBal(bal)
            this.errorMsg =
              this.username + '已登录' + new Date().toLocaleString()
          }
        },
        { errCb: true, showError: false }
      )
    },
    testApi() {
      const { apiUri, param } = this
      this.$axiosPlus(
        apiUri,
        param ? JSON.parse(param.replace(/\s/g, '')) : {},
        data => (this.apiRes = JSON.stringify(data))
      )

      this.testObj = zipObject(['a', 'b'])(['sss', 'bbb'])
      // this.testObj = zipObject(['a','b'],['sss','bbb'])
    },
    async openAccount() {
      const {
        data: { mini_prize_group, max_prize_group }
      } = await this.$axios.$post('user/find-child-prize-group-range')
      this.newAccount.prize_group =
        mini_prize_group + Math.floor(Math.random() * 10)
      // this.$axiosPlus('user/open-account', this.newAccount, () => logout(this))
      const { name } = this.newAccount
      const { index } = name.match(/\d/)
      const str = name.slice(0, index)
      let num = name.slice(index)
      Promise.all(
        [...Array(10)].map((v, k) =>
          this.$axiosPlus('user/open-account', {
            ...this.newAccount,
            name: `${str}${+num++}`
          })
        )
      ).then(() => {
        this.$message({
          message: `开户${name}-${str}${+num - 1}成功！`,
          type: 'success'
        })
      })
    },
    ...mapMutations({
      setUser: 'setUser',
      setBal: 'pay/setBal'
    }),
    checkDomains() {
      axios.get('/sys-report', {
        params: {
          identify: 'alpha',
          page: 0,
          limit_type: 1
        }
      })
    },
    preview(file) {
      this.imageUrl = URL.createObjectURL(file.raw)

      blobToDataURL(file.raw, chat_avatar =>
        this.$axiosPlus('user/set-chat-avatar', { chat_avatar })
      )
    }
  },
  computed: {
    ...mapGetters(['username', 'expires', 'point', 'ip']),
    ...mapGetters({
      bal: 'pay/bal'
    }),
    testExpires() {
      return new Date(this.expires)
    }
  },
  mounted() {}
}

function blobToDataURL(blob, callback) {
  var a = new FileReader()
  a.onload = function(e) {
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}
</script>
