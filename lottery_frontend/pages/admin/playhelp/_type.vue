<template>
  <div class="m_center WanFaJieShao">
    <div class="x_header">
      <nuxt-link v-for="(type,index) in types" :key="type.type" :to="`/admin/playhelp/${type.type}`" v-if="index !== 0">{{type.name}}</nuxt-link>
    </div>
    <div class="x_con lotto-play-help">
      <h2>{{isSSC && types && types.length ? lottos[1].name : lottos.name}}玩法</h2>
      <ul v-if="isSSC && types && types.length" class="lotto-play-list lotto-ssc-list">
        <li v-for="(item,index) in ['全天彩','时时彩']">
          <h3>{{item}}</h3>
          <ul>
            <li v-for="lotto in lottos[index].infos" :key="lotto.id">
              {{lotto.name}}
            </li>
          </ul>
        </li>
      </ul>
      <ul class="lotto-play-list" v-else>
        <li v-for="lotto in lottos.infos" :key="lotto.id">
          {{lotto.name}}
        </li>
      </ul>
      <el-table :data="tableData" border :span-method="spanMethod" height="600" style="width: 100%;margin-top:20px">
        <el-table-column label="玩法组" width="160">
          <template slot-scope="{row}">
            <div>
              {{row.small_ways_name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="玩法" width="160">
          <template slot-scope="{row}">
            <div>
              {{row.show_name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="玩法说明">
        </el-table-column>
        <el-table-column prop="short_note" label="中奖举例">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss">
.lotto-play-list {
  &,
  ul {
    display: flex;
  }
  &.lotto-ssc-list {
    display: block;
    > li {
      display: flex;
      align-items: center;
    }
  }
  li {
    padding: 0 5px;
  }
}
.lotto-play-help {
  th {
    text-align: center;
  }
  td {
    .cell div {
      text-align: center;
    }
  }
}
</style>


<script>
import { mapGetters } from 'vuex'
import { flatten } from 'lodash'
import { initLottoPlays } from '~/util/lotto/transform-plays'
import { delayAjax } from '~/plugins/ajax'
import cache from '~/util/cache'

const renderTable = async (type, store, context, error) => {
  const types = store.state.lotto.types
  if (types.findIndex(_ => _.type === type) === -1)
    return error({ message: types.length ? '无此彩系！' : '此页面不支持地址栏直接访问！' })
  if (types.length == 0) {
    return {
      // [Vue warn]: Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.
      // type,
      tableData: []
    }
  }
  const typeInfos = Object.keys(types.slice(1).find(_ => _.type === type).infos)
  let playList = cache[typeInfos.find(lottoName => cache[lottoName])]
  if (!playList) {
    playList = (await initLottoPlays(
      store,
      //types.slice(1) filters days lotto
      typeInfos[0],
      context,
      error
    )).playList
  }
  return playList.reduce(
    (prev, next) =>
      prev.concat(
        flatten(
          next.small_ways.map(group =>
            group.bets.map((bet, index, array) => {
              const [note, short_note] = cache.helps[bet.identifier]
              return {
                ...bet,
                small_ways_name: next.content.show_name + group.content.name,
                note,
                short_note,
                ...(index === 0 ? { bet_length: array.length } : {})
              }
            })
          )
        )
      ),
    []
  )
}

export default {
  name: 'lotto-play-help',
  async asyncData({ app, store, params, redirect, error }) {
    if (!params.type) return redirect('/admin/playhelp/ssc')
    if (!cache.helps) {
      cache.helps = (await import(/* webpackChunkName: "play-help" */ '~/assets/config/play-helps')).default
    }
    // if (process.server) return { tableData: [] }
    return {
      tableData: await renderTable(params.type, store, app, error)
    }
  },
  created() {
    // if (!this.tableData.length) {
    //   // await store.dispatch('lotto/getTypes')
    // }
  },
  methods: {
    spanMethod({ row, columnIndex }) {
      if (columnIndex === 0) {
        if (row.bet_length) {
          return [row.bet_length, 1]
        } else {
          return [0, 0]
        }
      }
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    isSSC() {
      return this.type === 'ssc'
    },
    lottos() {
      if (!this.types || !this.types.length) return { name: '', infos: [] }
      if (this.isSSC) {
        // return this.types.slice(0, 2).reduce(
        //   (prev, next) => ({
        //     ...prev,
        //     ...next.infos
        //   }),
        //   {}
        // )
        return this.types.filter(_ => _.type === 'ssc')
      }
      return this.types.find(_ => _.type === this.type)
    },
    ...mapGetters({
      types: 'lotto/types'
    })
  }
}
</script>
