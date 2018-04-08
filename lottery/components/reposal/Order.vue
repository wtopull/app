<template>
  <el-dialog :title="`第【${lottoRoot.issue}】期确认注单`" :visible.sync="visible" custom-class="reposal-order" @open="get" @close="reset" width="490px">
    <el-scrollbar tag="table">
      <thead>
        <tr>
          <th>内容</th>
          <th>赔率</th>
          <th>单注金额</th>
          <th>操作</th>
        </tr>
      </thead>
      <transition-group tag="tbody" :css="false" @leave="leave">
        <tr v-for="(item,index) in order" :key="item[3]">
          <td>{{item[0]}}</td>
          <td>{{item[1]}}</td>
          <td>
            <!-- :ref,https://github.com/vuejs/vue/issues/4952 -->
            <el-input type="number" v-model="item[2]" @input.native="update(index)" :ref="`order-input${index}`" />
          </td>
          <td @click="remove(index)">
            <i class="el-icon-close"></i>
          </td>
        </tr>
      </transition-group>
    </el-scrollbar>
    共
    <strong>{{order.length}}</strong>注，总金额
    <strong>{{sum}}</strong>元
    <div slot="footer" class="text-center">
      <!-- <el-autocomplete @input.native="_validate($orderHotInput)" v-model="lottoRoot.hotNum" v-show="shortcut" :fetch-suggestions="querySearch" :debounce="0" popper-class="reposal-order-suggestions" ref="order-hot-input" /> -->
      <el-button type="primary" @click="lottoRoot.bet" size="mini">确认投注</el-button>
      <el-button @click="visible = false" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>


<script>
import { mapGetters } from 'vuex'
import { round,sumBy } from 'lodash'
import { defaultRound } from '~/plugins/filters'
import mapMethods from '~/util/lotto/reposal-methods'
export default {
  name: 'order',
  inject: ['lottoRoot'],
  data() {
    return {
      visible: false,
      order: [],
      view: null
    }
  },
  methods: {
    get() {
      //deep clone, [vuex] Do not mutate vuex store state outside mutation handlers.
      this.order = this.orderData.map(_ => [..._])
      this.view = this.lottoRoot.getView()
    },
    reset() {
      setTimeout(() => {
        this.leaveable = false
      }, 300)
    },
    leave(el, done) {
      this.lottoRoot.itemLeave(el, done, this)
    },
    remove(index) {
      this.update(index, true)
      this.lottoRoot.removeItem(index, 'order', 0, this)
      if (!this.order.length) {
        setTimeout(() => (this.visible = false), 300)
      }
    },
    update(index, del) {
      // if(!this.shortcut) {
      const input = this.$refs[`order-input${index}`][0]
      if (!input) return //fast del click
      const { currentValue } = input
      //input.value not support firefox etc.
      if (!(currentValue >= 1)) {
        input.setCurrentValue('')
      } else if (!del) {
        input.setCurrentValue(currentValue.replace('.', '')) //replace decimalsx
      }
      // }
      const order = this.order[index]
      if (!order) return //fast del click
      const { view } = this
      const viewInput = view.$refs.input[order[3]]
      const value = order[2]
      viewInput.$emit('input', del ? '' : viewInput.selected ? '' + value : +value)
      view.orderType
        ? (view[view.orderType[order[4]]] = '') //clean & update sumbit data,eg:orderBigSmall -> _getOrder !playView[v]
        : (view[view.orderStr] = '')
      del && (viewInput.selected = false)
    },
    ...mapMethods.methods
  },
  computed: {
    // hotNumFixed() {
    //   return round(this.lottoRoot.hotNum, 5)
    // },
    sum() {
      return defaultRound(sumBy(this.order,_ => +_[2]))
    },
    ...mapGetters({
      orderData: 'reposal/order',
      // shortcut: 'reposal/shortcut',
      hotNums: 'reposal/nums'
    })
  },
  mounted() {
    this.$orderHotInput = this.$refs['order-hot-input']
  }
}
</script>
