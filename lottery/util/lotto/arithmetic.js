import { flatten } from 'lodash'
// import Combinatorics from 'js-combinatorics'
import { getFirstNum
  // ,num,beginNum,repeatNum 
} from '~/util/lotto/code'
// import game from './game'

//Combinatorics.P https://github.com/dankogai/js-combinatorics#arithmetic-functions
var P = function(m, n) {
  var p = 1
  while (n--) p *= m--
  return p
}
var C = function(m, n) {
  if (n > m) {
    return 0
  }
  return P(m, n) / P(n, n)
}

//*
const times = (a, b) => a * b
//plus
const plus = (a, b) => a + b

const operator = (code, layout, operator = times, identifier) => {
  if (layout[0].length > code.length && identifier !== 'dingweidan') return 0
  return code.map(_ => _.length).reduce(operator)
}

// const permutation = (code,length) => uniq(Combinatorics.baseN(code, length).toArray().map(i => uniq(i)).filter(i => i.length == length).map(i => i.sort((a,b) => a-b)).map(i => i.join())).length

const cartesianGroupMultRow = (code, singleLength,multipleLength = 1) => {
  const [multiple, single] = code
  if (!multiple || !single || multiple.length < multipleLength || single.length < singleLength)
    return 0
  let result = C(multiple.length, multipleLength) * C(single.length, singleLength)
  const repeat = multiple.filter(_ => single.includes(_)).length
  if (repeat)
    result -= multipleLength > 1 ? C(repeat, multipleLength) * C(multipleLength, singleLength) : C(repeat, 1) * (singleLength > 1 ? C(single.length - 1, singleLength - 1) : 1)
  if(multipleLength > 1 && multiple.length - repeat > 0) {
    result -= C(repeat, singleLength) * C(multiple.length - repeat, 1)
  }
  return result
}

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
// function cartesianProductOf() {
//   return _.reduce(arguments, function(a, b) {
//       return _.flatten(_.map(a, function(x) {
//           return _.map(b, function(y) {
//               return x.concat([y]);
//           });
//       }), true);
//   }, [ [] ]);
// };

// cartesianProductOf([1, 2], [3, 4], ['a', 'b'])

const cartesianProductUniq = (code, length) =>
  code.length < length
    ? 0
    : code
        .reduce(
          (prev, next) =>
            [].concat(
              ...prev.map(i =>
                next.map(j => (i !== j && !i.includes(j) ? i.concat(j) : i))
              )
            ),
          [[]]
        )
        .filter(_ => _.length === length).length

// const erTongHao = repeatNum(6,2)
// const erBuTongHao = num(6,beginNum)

// const tonghaoDantuo = (code,length) => {
//   if (code.filter(_ => _.length).length < 2) return 0
//   const [t,b] = code
//   const tongHao = t.map(num => erTongHao[num])
//   const buTongHao = b.map(num => erBuTongHao[num])
//   if(buTongHao.some(code => tongHao.join().includes(code))) return 0
//   return cartesianProductUniq(code,length)
// }
        
const DanTuo = (code, max) => {
  if (code.length < 2) return 0
  const [danma, tuoma] = code
  const danmaLength = danma.length
  const tuomaLength = tuoma.length
  if (danmaLength < 1 || danmaLength + tuomaLength < max) return 0
  if (danmaLength === 1) return tuomaLength
  return C(tuomaLength, max - danmaLength)
}

export default (identifier, code, layout) => {
  let count = 0
  switch (identifier) {
    case 'wuxing_zhixuan_fs':
    case 'qiansi_zhixuan_fs':
    case 'housi_zhixuan_fs':
    case 'qiansan_zhixuan_fs':
    case 'zhongsan_zhixuan_fs':
    case 'housan_zhixuan_fs':
    case 'erxing_zhixuan_qianerfs':
    case 'erxing_zhixuan_houerfs':
      count = operator(code, layout)
      break
    case 'wuxing_zuxuan_120':
      count = C(code.length, 5)
      break
    case 'wuxing_zuxuan_60':
      count = cartesianGroupMultRow(code,3)
      break
    case 'wuxing_zuxuan_30':
      count = cartesianGroupMultRow(code,1,2)
      break
    case 'wuxing_zuxuan_20':
    case 'qiansi_zuxuan_12':
    case 'housi_zuxuan_12':
      count = cartesianGroupMultRow(code,2)
      break
    case 'wuxing_zuxuan_10':
    case 'qiansi_zuxuan_4':
    case 'housi_zuxuan_4':
    case 'wuxing_zuxuan_5':
      count = cartesianGroupMultRow(code,1)
      break
    case 'qiansi_zuxuan_24':
    case 'housi_zuxuan_24':
      count = C(code.length, 4)
      break
    case 'qiansi_zuxuan_6':
    case 'housi_zuxuan_6':
    case 'erxing_zuxuan_qianerzxfs':
    case 'erxing_zuxuan_houerzxfs':
    case 'budingwei_sanxingbudingwei_qiansanermabdw':
    case 'budingwei_sixingbudingwei_qiansiermabdw':
    case 'budingwei_wuxingbudingwei_wuxingermabdw':
    case 'erma_zuxuan_qianerzuxuanfs':
    case 'erma_zuxuan_houerzuxuanfs':
    case 'erbutonghao_erbutonghao_ebth':
      count = code.length * (code.length - 1) / 2
      break
    case 'qiansan_zuxuan_zux3':
    case 'zhongsan_zuxuan_zux3':
    case 'housan_zuxuan_zux3':
    case 'erxing_zuxuan_qianerzxfs':
      count = P(code.length, 2)
      break
    case 'qiansan_zuxuan_zux6':
    case 'zhongsan_zuxuan_zux6':
    case 'housan_zuxuan_zux6':
    case 'budingwei_wuxingbudingwei_wuxingsanmabdw':
    case 'sanma_zuxuan_qiansanzuxuanfs':
    case 'sanma_zuxuan_zhongsanzuxuanfs':
    case 'sanma_zuxuan_housanzuxuanfs':
    case 'sanbutonghao_sanbutonghao_sbthds':
      count = C(code.length, 3)
      break
    case 'qiansan_qita_hezhiwz':
    case 'zhongsan_qita_hezhiwz':
    case 'housan_qita_hezhiwz':
    case 'qiansan_qita_bz':
    case 'zhongsan_qita_bz':
    case 'housan_qita_bz':
    case 'qiansan_qita_sz':
    case 'zhongsan_qita_sz':
    case 'housan_qita_sz':
    case 'qiansan_qita_dz':
    case 'zhongsan_qita_dz':
    case 'housan_qita_dz':
    case 'budingwei_sanxingbudingwei_qiansanyimabdw':
    case 'budingwei_sanxingbudingwei_zhongsanyimabdw':
    case 'budingwei_sanxingbudingwei_housanyimabdw':
    case 'budingwei_sixingbudingwei_qiansiyimabdw':
    case 'budingwei_wuxingbudingwei_wuxingyimabdw':
    case 'budingwei_budingwei_qiansanbdw':
    case 'budingwei_budingwei_zhongsanbdw':
    case 'budingwei_budingwei_housanbdw':
    case 'hezhi_hezhi_hz':
    case 'yixing_qianyi_fs':
    case 'santonghao_santonghao_sthdx':
    case 'santonghao_santonghao_sthtx':
    case 'ertonghao_ertonghao_ethfx':
    case 'daxiaodanshuang_daxiao_dx':
    case 'daxiaodanshuang_danshuang_ds':
      count = code.length
      break
    case 'dingweidan_dingweidan_dwq':
    case 'dingweidan_dingweidan_dwd':
      count = operator(code, layout, plus, 'dingweidan')
      break
    case 'sanma_zhixuan_qiansanzhixuanfs':
    case 'sanma_zhixuan_zhongsanzhixuanfs':
    case 'sanma_zhixuan_housanzhixuanfs':
    case 'sanxing_qiansan_fs':
    case 'sanxing_housan_fs':
      count = cartesianProductUniq(code, 3)
      break
    case 'erma_zhixuan_qianerzhixuanfs':
    case 'erma_zhixuan_houerzhixuanfs':
    case 'erxing_qianer_fs':
      count = cartesianProductUniq(code, 2)
      break
    case 'erma_zuxuan_qianerzuxuandt':
    case 'erma_zuxuan_houerzuxuandt':
      // case 'dantuo_dantuo_dt2z2':
      count = DanTuo(code)
      break
    // case 'dantuo_dantuo_dt3z3':
    //   count = DanTuo(code,3)
    //   break;
    // case 'dantuo_dantuo_dt4z4':
    //   count = DanTuo(code,4)
    //   break;
    // case 'dantuo_dantuo_dt5z5':
    //   count = DanTuo(code,5)
    //   break;
    // case 'dantuo_dantuo_dt6z5':
    //   count = DanTuo(code,6)
    //   break;
    // case 'dantuo_dantuo_dt7z5':
    //   count = DanTuo(code,7)
    //   break;
    // case 'dantuo_dantuo_dt8z5':
    //   count = DanTuo(code,8)
    //   break;
    case 'sixing_qiansi_fs':
    case 'sixing_housi_fs':
      count = cartesianProductUniq(code, 4)
      break
    case 'ertonghao_ertonghao_ethdx':
      count = cartesianProductUniq(code,2)
      break
  }
  if (identifier.includes('dantuo_dantuo_dt')) {
    count = DanTuo(code, getFirstNum(identifier))
  }
  if (identifier.includes('renxuan_renxuanfs')) {
    count = C(code.length, getFirstNum(identifier))
  }
  if (identifier.includes('renxuan_renxuan_rx')) {
    count = C(flatten(code).length, getFirstNum(identifier))
  }
  if (identifier.includes('quwei_quwei')) {
    count = code.length
  }
  return count
}
