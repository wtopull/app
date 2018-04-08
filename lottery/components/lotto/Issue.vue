<template>
  <div class="d-flex">
    <div class="lottery_clock_container">
      <div class="lottery_index">第 <span>{{issue}}</span> 期 投注截止时间</div>
      <div class="lottery_clock">
        <div class="clock" ref="clock"></div>
      </div>
    </div>
    <div class="t_m">
      <div class="lottery_index">
        第 <span>{{opened.issue_no}}</span> 期
        开奖号码为
      </div>
      <div class="m_r">
        <transition name="el-zoom-in-center">
          <ul v-show="showCode" v-if="isPk10" :class="['lotto-code-pk10',`lotto-code-${lottoName}`]">
            <li :class="`lotto-pk10-${num < 10 ? num.replace('0','') : num}`" v-for="(num,index) in code" :key="index">
              <a>{{num}}</a>
            </li>
          </ul>
          <ul v-show="showCode" v-else>
            <li v-for="(num,index) in code" :key="index">
              <div ref="code">
                <a v-for="num in 20" :key="num">{{num
                  < 11 ? num - 1 : num - 11}}</a>
              </div>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>

</template>

<script>
import { addSeconds, isSameSecond } from 'date-fns'
import anime from 'animejs'
import Push from 'push.js'

export const exampleIssue = () =>
  new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '') + '000'

const issue_no = exampleIssue()

export default {
  name: 'lotto-issue',
  inject: ['lottoRoot'],
  // the provide and inject bindings are NOT reactive.
  // props:{
  //   issue:{
  //     default (){
  //       return this.lottoRoot.issue
  //     }
  //   }
  // },
  data() {
    return {
      showCode: false
    }
  },
  watch: {
    issue(val, oldVal) {
      if (oldVal !== issue_no) {
        clearTimeout(this.timer)
      }
      this.start()
      //first time has getIssueList
      oldVal !== issue_no && this.lottoRoot.getIssueList()
    },
    code(val, oldVal) {
      const oldCodeStr = oldVal.join('')
      if (oldCodeStr === val.join('')) return
      this.showCode = true
      this.$styleLog(val, 'getWin', { issue: this.opened.issue_no })
      const vm = this
      const hidden = document.hidden
      hidden &&
        Push.create('开奖啦！', {
          body: `${this.lottoRoot.lottoShowName} 第${this.opened.issue_no}期已開獎`,
          timeout: 4000,
          onClick: function() {
            window.focus()
            this.close()
            vm.winNoty()
          }
        })
      !this.isPk10 &&
        this.$refs.code.forEach((targets, k) => {
          const num = val[k]
          const lg = Math.abs(num - oldVal[k]) > 4
          anime({
            targets,
            translateY: (lg ? num : +num + 10) * -53,
            easing: 'linear',
            duration: 900,
            complete: anim => {
              anime({ targets, duration: 0, translateY: num * -53 })
              ;+oldCodeStr && !hidden && this.winNoty()
            }
          })
        })
    }
  },
  created() {},
  methods: {
    loop() {
      clearTimeout(this.timer)
      this.lottoRoot.getIssue(() => {
        if (process.env.NODE_ENV === 'development') {
          this.$nextTick(() => {
            const { issue, code, countdown } = this
            this.$styleLog(issue, 'issue', { code: code.join(''), countdown })
          })
        }
        this.timer = setTimeout(this.loop, 1e4)
      })
    },
    start() {
      this.clock.setTime(this.countdown)
      this.clock.start()
    },
    winNoty() {
      this.$message({
        message: `您好，第${this.opened.issue_no}期已开奖，开奖号码 ${this.code.join(' ')}`,
        type: 'success',
        duration: 2000
      })
    }
  },
  computed: {
    issue() {
      return this.lottoRoot.issue
    },
    newest() {
      const { no_open_newest } = this.lottoRoot.issueData
      return no_open_newest ? no_open_newest : { issue_no }
    },
    opened() {
      const { opened_newest } = this.lottoRoot.issueData
      return opened_newest ? opened_newest : { issue_no, win_number: '' }
    },
    code() {
      const code = this.opened.win_number.split(',')
      return code.length < 5 ? [...Array(5)].map(_ => 0) : code
    },
    isPk10() {
      // return this.lottoRoot.lottoType === 'pk10' it makes code div reflow
      return this.code.length === 10
    },
    lottoName() {
      return this.$store.getters.lottoName
    },
    countdown() {
      return this.newest.countdown_time || 0
    }
  },
  mounted() {
    if (process.browser) {
      const FlipClock = require('~/assets/plugin/flipclock').default
      this.clock = new FlipClock(this.$refs.clock, this.countdown, {
        clockFace: 'HourlyCounter',
        autoStart: false,
        countdown: true,
        callbacks: {
          interval: () => {
            // Date.now() === addSeconds(this.newest.expect_opened_at,10).getTime() && this.loop()
            //Milliseconds different
            isSameSecond(
              new Date(),
              addSeconds(this.newest.expect_opened_at, 10)
            ) && this.loop()
          },
          stop: () => {
            // setTimeout(this.loop, 1000)
            setTimeout(() => {
              this.$message({
                message: `您好，第${this.issue}期已截止，投注时请确认您选择的期号。`,
                type: 'warning',
                duration: 2000
              })
              this.lottoRoot.getIssue(() => {
                if (process.env.NODE_ENV === 'development') {
                  this.$nextTick(() => {
                    const { issue, code, countdown } = this
                    this.$styleLog('first countdown ' + issue, 'issue', {
                      code: code.join(''),
                      countdown
                    })
                  })
                }
              })
              //set 1500 not 1000 may be filp delay
            }, 1500)
          }
        }
      })
      //Notification API require https in new Chrome
      !Push.Permission.has() &&
        Push.create('通知启用成功！', {
          body: '浏览其他标签网页可收到开奖提醒。',
          timeout: 4000,
          onClick: function() {
            window.focus()
            this.close()
            vm.winNoty()
          }
        })
    }
  },
  destroyed() {
    //this.clock && ,avoid getIssue fail
    this.clock && this.clock.timer._destroyTimer()
  }
}
</script>
