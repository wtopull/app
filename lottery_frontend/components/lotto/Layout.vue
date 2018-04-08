<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import playConfig from '~/assets/config/play-config'
import arithmetic from '~/util/lotto/arithmetic'
import { flatten } from 'lodash'
import { select2Code, textFilter, getFirstNum } from '~/util/lotto/code'
import aesDecrypt from '~/util/aesDecrypt'
//remove jsx-vue-functional since it's buggy and hard to get right
//https://github.com/vuejs/babel-preset-vue/commit/376804c7f22bff8e7395c76ee597433ebacc4783
//jsx-vue-functional not camelCase,first word must capitalize.eg:BallList
const BallList = ({ props: { layout, selected, row }, listeners }) => {
  return (
    <ul class="play-ball-list">
      {layout.map((ball, col) => (
        <li
          onClick={() =>
            listeners.click(...(row !== undefined ? [row, col] : [col]))
          }
          class={{
            selected:
              row !== undefined
                ? selected[row] && selected[row][col]
                : selected[col]
          }}
        >
          {ball}
        </li>
      ))}
    </ul>
  )
}

const BallTool = ({ props: { row, tool }, listeners }) => {
  const buttons =
    tool === false ? [] : tool || ['全', '大', '小', '奇', '偶', '清']
  return (
    <ul class="play-ball-tool">
      {buttons.map((buttonText, index) => {
        return (
          <li
            onClick={() =>
              listeners.click(...(row !== undefined ? [index, row] : [index]))
            }
          >
            {buttonText}
          </li>
        )
      })}
    </ul>
  )
}

const Textarea = Vue.component('play-text', {
  name: 'play-text',
  props: ['playText', 'identifier', 'textArray', 'isDouble'],
  methods: {
    clean() {
      this.playText[this.identifier] = ''
    },
    uniq() {
      this.playText[this.identifier] = this.textArray.join()
    },
    sort() {
      //not sort a > b
      this.playText[this.identifier] = this.textArray
        .sort((a, b) => a - b)
        .join()
    },
    buffer() {
      const { playText, identifier } = this
      if (
        this.textArray.length > 10000 ||
        (playText[identifier] && playText[identifier].length > 10000 * 5)
      ) {
        playText[identifier] = ''
        this.$message.warning({
          duration: 2000,
          message: '內容過多，未保留上次號碼記錄！'
        })
        // UI lock?
        // this.spin()
        // setTimeout(() => this.spin({on:false}),1500)
      }
    }
    // ...mapMutations([
    //   'spin'
    // ])
  },
  created() {
    this.buffer()
  },
  watch: {
    identifier(val) {
      this.buffer()
    }
  },
  render() {
    // h will be injected
    const { playText, identifier, isDouble } = this
    return (
      <div class="play-textarea">
        <textarea v-model={playText[identifier]} />
        <div>
          <el-button type="primary" plain size="mini" onClick={this.uniq}>
            删除无效号
          </el-button>
          <el-button type="primary" plain size="mini" onClick={this.sort}>
            排序
          </el-button>
          <el-button type="primary" plain size="mini" onClick={this.clean}>
            清空
          </el-button>
          {`请在下方的输入框内输入或粘贴投注内容，每注请使用逗号','${
            isDouble ? '' : '或空格'
          }或分号';'分隔开${isDouble ? ',号码之间用空格隔开' : ''}。`}
        </div>
      </div>
    )
  }
})

export default {
  name: 'play-layout',
  props: ['identifier', 'playText', 'type'],
  data() {
    return {
      code: []
    }
  },
  watch: {
    selected(val, oldVal) {
      const { layout, identifier } = this
      this.setCount(
        val.length === 0
          ? 0
          : arithmetic(
              identifier,
              (this.code = select2Code(val, this.isDouble,identifier)),
              layout
            )
      )
    },
    textCount(val) {
      this.setCount(val)
    }
  },
  methods: {
    select(row, col) {
      // [vuex] Do not mutate vuex store state outside mutation handlers
      // const {selected} = this
      let selected
      let danmaIndex

      if (col !== undefined) {
        selected = { ...this.selected }
        const { dantuoNum } = this
        if (!selected[row]) {
          selected[row] = []
        }
        if (
          dantuoNum &&
          row === 0 &&
          selected[0] &&
          col !== (danmaIndex = selected[0].findIndex(_ => _))
        ) {
          if (dantuoNum === 2) {
            selected[0] = []
          } else if (
            dantuoNum - 1 === selected[0].filter(_ => _ || _ === 0).length &&
            !selected[0][col]
          ) {
            selected[0][danmaIndex] = false
          }
        }
        if (dantuoNum && !selected[1]) {
          selected[1] = []
        }
        selected[row][col] = !selected[row][col]
        if (this.limit(selected) !== true)
          //before css class bind but can be calc
          return (selected[row][col] = !selected[row][col]) //unselect last ball
        if (dantuoNum) {
          selected[row === 0 ? 1 : 0] && [
            (selected[row === 0 ? 1 : 0][col] = false)
          ]
        }
      } else {
        selected = [...this.selected]
        selected[row] = !selected[row]
        if (this.limit(selected) !== true)
          return (selected[row] = !selected[row])
      }
      this.selectBall(selected)
    },
    selectMult(index, row) {
      let selected
      const { options } = this
      if (row !== undefined) {
        selected = { ...this.selected }
        if (
          index === 5 ||
          (options &&
            options[row] &&
            options[row].tool &&
            options[row].tool[index] === '清')
        ) {
          selected[row] = []
        } else {
          selected[row] = this.toggle(index, selected)
        }
      } else {
        selected = [...this.selected]
        selected = this.toggle(
          options && options.tool && options.tool[index] === '清' ? 5 : index
        )
      }
      this.selectBall(selected)
    },
    toggle(index, selected) {
      const length = this.layout[1].length
      return this.layout[1].map((v, k) => {
        let result
        let isLengthOdd = length % 2 === 0
        let isOdd = (this.type === 'pk10' || this.identifier === 'hezhi_hezhi_hz' ? k + 1 : k) % 2 === 0
        switch (index) {
          //全
          case 0:
            result = true
            break
          //大
          case 1:
            result = k >= length / 2
            break
          //小
          case 2:
            result = k < length / 2
            break
          //奇
          case 3:
            result = isLengthOdd ? !isOdd : isOdd
            break
          //偶
          case 4:
            result = isLengthOdd ? isOdd : !isOdd
            break
        }
        // case 5,result = undefined
        result && this.dantuoNum && selected[0] && (selected[0][k] = false)
        return result
      })
    },
    limit(selected) {
      let limit
      // const opt = this.options && this.options[this.layout[0].length]
      // limit = opt && opt.limit
      const betNumber = this.sysConfigs.find(_ => _.identify === 'lottery_kl8_renxuan_bet_number')
      if (betNumber && this.type === 'kl8' && +getFirstNum(this.identifier) > 1) limit = aesDecrypt(betNumber.value)
      // don't:return limit && flatten(this.code).length > limit
      // this code maybe reactive nextTick
      return limit && flatten(select2Code(selected)).length > limit
        ? this.$msgbox(`最多只能选择${limit}个号码`, '注意')
        : true
    },
    ...mapMutations({
      selectBall: 'lotto/_ballSet',
      setCount: 'lotto/setBetCount'
    })
  },
  computed: {
    layout() {
      return playConfig[this.identifier]
    },
    ...mapGetters({
      selected: 'lotto/ballSet',
      sysConfigs:'sysConfigs'
    }),
    textArray() {
      const { playText, identifier, layout, isDouble } = this
      return textFilter(playText[identifier], layout, isDouble)
    },
    textCount() {
      return this.textArray.length
    },
    options() {
      return this.layout ? this.layout[2] : {}
    },
    isDouble() {
      // return ['11x5','pk10'].some(type => this.type === type)
      let result = false
      switch (this.type) {
        case '11x5':
          result = 11
          break
        case 'pk10':
          result = 10
          break
      }
      return result
    },
    dantuoNum() {
      const { identifier } = this
      if (identifier.includes('zuxuandt')) {
        return 2
      } else if (identifier.includes('dantuo_dantuo_dt')) {
        return +getFirstNum(identifier)
      }else if(identifier === 'ertonghao_ertonghao_ethdx'){
        return 6
      }
      return 0
    }
  },
  render(h) {
    const {
      layout,
      selected,
      select,
      selectMult,
      identifier,
      playText,
      textArray,
      isDouble,
      options
    } = this
    //don't direct : return Array.isArray(layout) ? (typeof layout[0] === 'string' ? (<ul class="play-layout"></ul>)) : (<Textarea />)
    //it will f5 refresh ssr error
    //The client-side rendered virtual DOM tree is not matching server-rendered content.
    if (Array.isArray(layout)) {
      if (typeof layout[0] === 'string') {
        return (
          //just class not className
          <ul class={['play-layout', options && options.className,{'play-ball-text':/san_qita|sthtx/.test(identifier)}]}>
            <li>
              <label>{layout[0]}</label>
              <BallList
                layout={layout[1]}
                selected={selected}
                onClick={select}
              />
              <BallTool onClick={selectMult} tool={options && options.tool} />
            </li>
          </ul>
        )
      } else {
        return (
          <ul class="play-layout">
            {layout[0].map((position, row) => {
              return (
                <li class={options && options[row] && options[row].className}>
                  <label>{position}</label>
                  <BallList
                    layout={
                      Array.isArray(layout[1][0]) ? layout[1][row] : layout[1]
                    }
                    row={row}
                    selected={selected}
                    onClick={select}
                  />
                  <BallTool
                    onClick={selectMult}
                    row={row}
                    tool={options && options[row] && options[row].tool}
                  />
                </li>
              )
            })}
          </ul>
        )
      }
    } else if (typeof layout === 'number') {
      return (
        <Textarea
          {...{ props: { identifier, playText, textArray, isDouble } }}
        />
      )
    }
  }
}
</script>
