<template>
  <div class="slot-container">
    <div class="query-tabs">
      <el-button-group>
        <el-button :class="{active: activeTabPosition === index}" type="primary" v-for="(tab, index) in queryTabs" @click="queryGames(tab.platform_id, index)" :key="tab.platform_id">
          {{tab.prefix}}
        </el-button>
      </el-button-group>
    </div>
    <!-- 目前后端接口无query 选项可用，先隐藏 -->

    <!-- <div class="query-options-container">
      <div class="query-options">
        <div class="label">游戏奖池</div>
        <el-button>是</el-button>
        <el-button>否</el-button>
      </div>
      <div class="query-options">
        <div class="label">游戏类型</div>
        <el-button>老虎机</el-button>
        <el-button>桌游</el-button>
        <el-button>赛车</el-button>
        <el-button>纸牌</el-button>
        <el-button>其他</el-button>
      </div>
      <div class="query-options">
        <div class="label">游戏风格</div>
        <el-button>是</el-button>
        <el-button>否</el-button>
      </div>
      <div class="query-options">
        <div class="label">陪付线数</div>
        <el-button>是</el-button>
        <el-button>否</el-button>
      </div>
    </div> -->
    <div class="game-container" v-loading="loading" element-loading-text="拼命加载中">
      <div class="row" v-for="chunk in queryResult">
        <div class="item" v-for="item in chunk">
          <div class="item-title">
            {{item.name}}
          </div>
          <div class="item-content">
            <img :src="item.web_img_url" alt="">
            <el-button round @click="enterGame(item.platform_id, item.name)" v-loading="enterGameLoading">进入游戏</el-button>
            <div class="mask"></div>
          </div>
          <div class="item-footer">{{getPlatformPrefix(item.platform_id)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { isMobile } from '~/plugins/UA'
import { chunk, find, filter } from 'lodash/fp'
export default {
  data() {
    return {
      loading: true,
      enterGameLoading: false,
      activeTabPosition: 0,
      queryTabs: [
        {
          prefix: '全部游戏',
          platform_id: ''
        },
        {
          prefix: 'AGIN',
          platform_id: 'TPGP32OMCT355V1TO7Q7MCCU'
        },
        {
          prefix: 'GG',
          platform_id: 'TPGP095PAVP427WDISJBGR9B'
        },
        {
          prefix: 'AMEBA',
          platform_id: 'TPGP11T7RZ1SEOU2SIP7GDC4'
        },
        {
          prefix: 'CQ',
          platform_id: 'TPGP135QWYWJQC9QMCEPGDOV'
        }
      ],

      queryResult: []
    }
  },

  created() {
    this.initData()
  },

  methods: {
    initData() {
      this.get3rdGamePlatform(() => {
        this.get3rdGameList(() => {
          this.queryResult = this.formatGameList(this.gameList)
          this.loading = false
        })
      })
    },

    ...mapActions(['get3rdGamePlatform', 'get3rdGameList', 'setUser']),
    ...mapMutations(['setUser']),

    getPlatformPrefix(platform_id) {
      return find({ id: platform_id })(this.platformList).prefix
    },

    queryGames(platform_id, index) {
      this.activeTabPosition = index
      if (platform_id === '') {
        this.queryResult = this.formatGameList(this.gameList)
      } else {
        this.queryResult = this.formatGameList(
          filter(game => game.platform_id === platform_id)(this.gameList)
        )
      }
      this.loading = false
    },

    formatGameList(gameList) {
      return chunk(5, gameList)
    },

    enterGame(platform_id, name) {
      this.enterGameLoading = true
      // 1 启用 2 停用
      const status = find({ id: platform_id })(this.platformList)[
        `${isMobile ? 'mobile' : 'web'}_status`
      ]
      const prefix = find({ id: platform_id })(this.platformList)['prefix']
      const gamecode = find({ name })(this.gameList)['code']

      if (status === 1) {
        if (
          this._3rdPlatformPrefix.includes(prefix) &&
          prefix !== 'NVR'
          // 判断使用者是否注册了该第三方平台
        ) {
          this.$axiosPlus(
            `third-party-game/login`,
            { platform: prefix, gamecode },
            data => {
              window.open(data.url)
              this.enterGameLoading = false
            }
          )
        } else {
          this.$axiosPlus(
            `third-party-game/register`,
            { platform: prefix },
            _ => {
              this.$axiosPlus(
                `third-party-game/login`,
                { platform: prefix, gamecode },
                data => {
                  window.open(data.url)
                }
              )
              this.enterGameLoading = false
            }
          )
          this.setUser({
            ...this.userModel,
            third_party_game_platform_prefix:
              this._3rdPlatformPrefix + `,${prefix}`
          })
        }
      } else {
        this.$message({
          message: `游戏未开放`,
          type: 'error',
          duration: 1500
        })
        this.enterGameLoading = false
      }
    }
  },

  computed: {
    ...mapState({
      platformList: '_3rdPlatform',
      gameList: '_3rdGameList',
      userModel: 'user'
    }),
    ...mapGetters(['_3rdPlatformPrefix'])
  }
}
</script>
<style lang="scss" scoped>
.slot-container {
  width: 1100px;
  min-height: 731px;
  margin: 0 auto;
  background: white;
  margin-top: 35px;
  border: 1px solid #e1e1e1;
}

.query-tabs {
  background: $--color-primary;
  height: 42px;
  line-height: 42px;

  .el-button-group {
    margin-top: -1px;
  }

  .el-button {
    font-size: 14px;
    background: $--color-primary;
    color: #787878;
    border: none;
    width: 110px;
    height: 42px;
    transition: all 0.3s;

    &:hover,
    &:active {
      background: lighten($--color-primary, 10%);
    }

    &.active {
      background: white;
      color: #e88620;
    }
  }
}

/* 目前后端接口无query 选项可用，先隐藏
.query-options-container {
  padding: 18px 35px;
  background: #f9f9f9;

  .query-options {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;

    .label {
      font-size: 12px;
      line-height: 26px;
      color: #555;
      margin-right: 10px;
    }
    .el-button {
      font-size: 12px;
      width: 75px;
      height: 26px;
      line-height: 26px;
      padding: 0;
      color: #7b7b7b;
    }
  }
}
*/

.game-container {
  padding: 35px;
  min-height: 687px;

  .row {
    display: flex;
    justify-content: flex-start;
    margin: 0 -16px 40px;
  }
}

.item {
  box-shadow: 0 0 3px 1px #999;
  background: #f9f9f9;
  height: 210px;
  min-width: 185px;
  margin: 0 11px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 3px 3px 5px 2px #999;
    transform: scale(1.02);
    .item-content > img {
      transform: scale(1.1);
    }

    .item-content > .el-button {
      opacity: 1;
      margin-top: 0px;
    }

    .item-title {
      top: -40px;
    }

    .mask {
      opacity: 1;
    }
  }

  .item-title {
    background: #f9f9f9;
    width: 100%;
    height: 40px;
    font-size: 16px;
    color: #555;
    line-height: 40px;
    padding: 0 10px;
    position: absolute;
    z-index: 2;
    top: 0;
    transition: all 0.3s;
  }

  .item-footer {
    background: $--color-primary;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: right;
    color: #dd6800;
    font-size: 12px;
    padding: 0 10px;
    position: absolute;
    bottom: 0;
  }

  .item-content {
    width: 190px;
    height: 190px;
    margin-top: 0px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    > img {
      width: 100%;
      height: auto;
      transition: all 0.3s;
    }
    > .el-button {
      background: transparent;
      border: 1px solid $--color-primary;
      color: $--color-primary;
      font-size: 16px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
      width: 120px;
      height: 35px;
      line-height: 35px;
      padding: 0;
      opacity: 0;
      margin-top: 30px;
      transition: all 0.3s;
      z-index: 3;

      &:hover,
      &:active {
        background: $--color-primary;
        border: 1px solid $--color-primary;
        color: #555;
      }
    }

    /deep/ .el-loading-mask {
      background-color: transparent !important;
    }

    /deep/ .el-loading-spinner .path {
      stroke: white;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: all 0.3s;
  }
}
</style>

