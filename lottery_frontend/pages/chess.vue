<template>
  <div>
    <div class="banner">
      <div class="banner-container">
        <div class="banner-light"></div>
        <div class="banner-slogan"></div>
        <div class="banner-girl"></div>
      </div>
    </div>
    <!-- <third-party-nav></third-party-nav> -->
    <div class="chess-container">
      <div class="chess-bg-1">
        <div class="chess-bg-container">
          <div class="chess-bg">
            <div class="chess-logo"></div>
            <div class="chess-desc">《炸金花》是流传的一种民间纸牌游戏。具有独特的比牌规则。玩家以手中的三张牌比输赢，玩家可以在自己操作时与其他最多一位玩家比牌，比牌费用等于当前单注的两倍。当只剩两名玩家时，无论是第几轮都可以比牌。游戏过程中需要考验玩家的胆略和智慧。</div>
            <div class="chess-shadow"></div>
            <div class="chess-entry">
              <div class="entry-item" v-for="entry in entryList">
                <div :class="`entry-${entry.id}`" @click="enterGame('KY', entry.name)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chess-bg-2">
        <div class="chess-girl"></div>
        <div class="chess-slogan"></div>
      </div>
      <div class="chess-something"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.banner {
  background: url('~assets/img/chess/banner.png');
  width: 100%;
  height: 250px;
  background-position-x: center;
}

.chess-bg-1 {
  position: absolute;
  z-index: 5;
  left: 0;
  top: 0;
  width: 1041px;
  height: 650px;
  overflow: hidden;
}

.chess-container {
  position: relative;
  margin-bottom: 30px;
  background: white;
}

.chess-bg-container {
  position: relative;
  width: 100%;
  height: 100%;
  animation: fade-4 1.2s ease 1s forwards;
  opacity: 0;
}

.chess-logo {
  background: url('~assets/img/chess/chess-logo.png');
  width: 262px;
  height: 100px;
  position: absolute;
  top: 50px;
  left: 100px;
  z-index: 3;
}

.chess-desc {
  width: 760px;
  position: absolute;
  left: 100px;
  top: 180px;
  z-index: 3;
  font-size: 14px;
  color: #6b6b6b;
  line-height: 30px;
}

.chess-shadow {
  background: url('~assets/img/chess/chess-shadow.png');
  width: 641px;
  height: 273px;
  position: absolute;
  top: 200px;
  left: 100px;
}

.chess-entry {
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: absolute;
  left: 100px;
  bottom: 30px;
  z-index: 1;
  .entry-item {
    margin-right: 30px;
    @for $i from 1 to 5 {
      .entry-#{$i} {
        background: url('~assets/img/chess/entry-#{$i}.png');
        margin: 0 auto;
        width: 198px;
        height: 218px;
        transition: all .3s;
        cursor: pointer;
        &:hover, &:active {
          transform: scale(1.1)
        }
      }
    }
  }
}

.chess-bg-2 {
  width: 100%;
  height: 650px;
  overflow: hidden;
  position: relative;
  right: 0;

  & > div {
    position: absolute;
  }

  .chess-girl {
    background: url('~assets/img/chess/chess-girl.png');
    width: 916px;
    height: 854px;
    right: 0px;
    z-index: 3;
    opacity: 0;
    animation: fade-1 1s ease 0.5s forwards;
  }

  .chess-slogan {
    background: url('~assets/img/chess/chess-slogan.png');
    width: 420px;
    height: 185px;
    right: 470px;
    top: 100px;
    z-index: 2;
    opacity: 0;
    animation: fade-2 0.5s ease .3s forwards;
  }
}

.chess-something {
  background: url('~assets/img/chess/chess-something.png');
  width: 501px;
  height: 384px;
  position: absolute;
  right: 580px;
  top: 300px;
  z-index: 4;
  opacity: 0;
  animation: fade-2 0.5s ease 1.5s forwards;
}

@media screen and (max-width: 1650px) {
  .chess-slogan {
    display: none;
  }

  .chess-shadow {
    display: none;
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
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>

<script>
// import ThirdPartyNav from '~/components/ThirdPartyNav'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { isMobile } from '~/plugins/UA'
import { find } from 'lodash/fp'

export default {
  name: 'chess',
  // components: {
  //   ThirdPartyNav
  // },

  data() {
    return {
      loading: false,
      entryList: [
        { id: 1, name: '抢庄牛牛' },
        { id: 2, name: '二八杠' },
        { id: 3, name: '德州扑克' },
        { id: 4, name: '炸金花' }
      ]
    }
  },


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
      this.$axiosPlus('static-data/third-party-game-platform', {}, data => {

        const status = find({ prefix })(data)[
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
      })
    },
    ...mapMutations(['setUser'])
  }
}
</script>



