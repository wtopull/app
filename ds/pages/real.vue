<template>
  <div>
    <div class="banner"></div>
    <!-- <third-party-nav></third-party-nav> -->
    <div class="real-container">
      <div class="real-bg-container">
        <div class="real-girl"></div>
        <div class="real-slogan"></div>
        <!-- <div class="real-ag-light"></div> -->
        <div class="real-logo"></div>
        <div class="real-ag-entry">
          <div :class="`entry-item ${loading ? 'disabled': ''}`" @click="enterGame('AGIN', entry.name)" v-for="entry in entryAgList">
            <div class="entry-item-border">
              <div :class="`entry-ag-${entry.id}`"></div>
              <span>{{entry.name}}</span>
            </div>

          </div>
        </div>
      </div>
      <div class="real-shadow"></div>
      <div class="real-something"></div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  background: url('~assets/img/real/banner.png');
  width: 100%;
  height: 250px;
  background-position-x: center;
}

.real-container {
  background: white;
  width: 100%;
  height: 650px;
  position: relative;

  .real-bg-container {
    width: 1140px;
    height: 650px;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    // animation: fade-4 1.2s ease 1s forwards;
    opacity: 1;
    z-index: 2;

    & > div {
      position: absolute;
    }

    .real-girl {
      background: url('~assets/img/real/real-girl.png');
      width: 1037px;
      height: 847px;
      left: 0px;
      z-index: 3;
      opacity: 0;
      animation: fade-1 1s ease 0.5s forwards;
    }

    .real-slogan {
      background: url('~assets/img/real/real-slogan.png');
      width: 383px;
      height: 187px;
      left: 320px;
      top: 115px;
      z-index: 2;
      opacity: 0;
      animation: fade-2 0.5s ease .3s forwards;
    }

    .real-logo {
      background: url('~assets/img/real/real-logo.png');
      width: 409px;
      height: 93px;
      position: absolute;
      right: 0px;
      top: 115px;
      z-index: 1;
      opacity: 0;
      animation: fade-1 1s ease 0.5s forwards;
    }

    .real-ag-light {
      background: url('~assets/img/real/real-ag-light.png');
      width: 610px;
      height: 169px;
      position: absolute;
      left: 115px;
      top: 190px;
      z-index: 3;
      opacity: 0;
      animation: fade-5 2.5s ease 2s forwards;
    }

    .real-ag-entry {
      margin: 0 auto;
      display: flex;
      align-items: center;
      position: absolute;
      right: -40px;
      top: 240px;
      z-index: 5;
      width: 450px;
      flex-wrap: wrap;
      opacity: 0;
      animation: fade-1 1s ease 0.5s forwards;
    }
  }
}
.real-shadow {
  background: url('~assets/img/real/real-shadow.png');
  width: 1867px;
  height: 650px;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 0;
  opacity: 0;
  background-position-y: 0;
  animation: fade-3 1s ease forwards;
  position: absolute;
  z-index: 1;
}
.real-something {
  background: url('~assets/img/real/real-something.png');
  width: 284px;
  height: 273px;
  position: absolute;
  left: 580px;
  top: 420px;
  z-index: 4;
  opacity: 0;
  animation: fade-2 0.5s ease 1.5s forwards;
}

.entry-item {
  width: 109px;
  height: 116px;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  color: white;
  margin: 0 40px 30px 0;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  .entry-item-border {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid white;
    > div {
      margin-top: -10px;
    }
  }

  &:hover,
  &:active {
    background: #d06905;
    transform: scale(1.05);
  }

  &.disabled {
    cursor: not-allowed;
  }

  span {
    position: absolute;
    bottom: 15px;
  }
}

@keyframes fade-1 {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes fade-2 {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-3 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-4 {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes fade-5 {
  from {
    opacity: 0;
    transform: scale(0);
    margin-left: -40px;
  }
  to {
    opacity: 1;
    transform: scale(1);
    margin-left: 0px;
  }
}

@for $i from 1 to 6 {
  .entry-ag-#{$i} {
    background: url('~assets/img/real/entry-ag-#{$i}.png');
    margin: 0 auto;
  }
}

.entry-ag-1 {
  width: 45px;
  height: 32px;
}
.entry-ag-2 {
  width: 39px;
  height: 39px;
}
.entry-ag-3 {
  width: 42px;
  height: 42px;
}
.entry-ag-4 {
  width: 35px;
  height: 41px;
}
.entry-ag-5 {
  width: 41px;
  height: 37px;
}

@for $i from 1 to 2 {
  .entry-hy-#{$i} {
    background: url('~assets/img/real/entry-ag-#{$i}.png');
    margin: 0 auto;
  }
}

.entry-hy-1 {
  width: 40px;
  height: 35px;
}

.entry-hy-2 {
  width: 37px;
  height: 35px;
}
</style>

<script>
// import ThirdPartyNav from '~/components/ThirdPartyNav'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { isMobile } from '~/plugins/UA'
import { find } from 'lodash/fp'

export default {
  name: 'real',

  async asyncData({ app, store }) {
    const { data: list } = await app.$axios.$post(
      'static-data/third-party-game-platform'
    )
    const { data: gameList } = await app.$axios.$post(
      'static-data/third-party-game'
    )
    return {
      list,
      gameList
    }
  },
  // components: {
  //   ThirdPartyNav
  // },
  data() {
    return {
      loading: false,
      entryAgList: [
        { id: 1, name: '快速厅', platform: 'AGIN' },
        { id: 2, name: '国际厅', platform: 'AGIN' },
        { id: 3, name: '旗舰厅', platform: 'AGIN' },
        { id: 4, name: '竟眯厅', platform: 'AGIN' },
        { id: 5, name: '包桌厅', platform: 'AGIN' }
      ],
      entryHyList: [{ id: 1, name: '尊贵厅' }, { id: 2, name: '经典厅' }]
    }
  },

  computed: {
    ...mapGetters(['_3rdPlatformPrefix']),
    ...mapState({
      userModel: 'user'
    })
  },

  methods: {
    enterGame(prefix, name) {
      if (this.loading) {
        return
      }
      this.loading = true
      // 1 启用 2 停用
      const status = find({ prefix })(this.list)[
        `${isMobile ? 'mobile' : 'web'}_status`
      ]

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
              this.loading = false
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
              this.loading = false
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
        this.loading = false
      }
    },
    ...mapMutations(['setUser'])
  }
}
</script>


