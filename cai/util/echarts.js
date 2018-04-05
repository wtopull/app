import {round,each,zipObject} from 'lodash'
import echarts from 'echarts/lib/echarts'
// require('echarts/theme/shine')
// 直接require会引入echarts所有组件
import macaron from './macarons'

echarts.registerTheme('custom', macaron);

import 'echarts/lib/chart/line'
import   'echarts/lib/chart/bar'
//import  'echarts/lib/component/grid',
//import  'echarts/lib/component/title',
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
//import  'echarts/lib/component/markLine'
import  'echarts/lib/component/markPoint'

let chart
export const getChart = () => chart

const largeNum = value => {
  let valueW
  if(value >= 10000) {
    valueW = value / 1e4
    return round(valueW, valueW >= 100 ? 0 : 2) + '万'
  }else{
    return parseInt(value)
  }
}

const getMarkPoint = (date,i) => ({
  markPoint:{
    symbol:'path://<path d="M512 0C264.512 0 64 200.512 64 448c0 234.688 213.312 426.688 448 426.688V1024c270.912-132.288 448-349.888 448-576 0-247.488-200.512-448-448-448zM298.688 512h106.624v106.688c46.976 0 85.376-46.976 85.376-106.688V320h-192v192z m256-192v192h106.624v106.688c46.976 0 85.376-46.976 85.376-106.688V320h-192z" fill="" p-id="609"></path>',
    symbolSize:[50,58],
    symbolOffset:[0,'-50%'],
    label:{
      normal:{
        formatter({value}){
          return largeNum(value)
        },
        offset:[0,-3]
      }
    },
    data: date.length > 1 && Math.max(...i.data) > 1000 ? [
      {type: 'max'},
    ] : '',
    itemStyle:{
      normal:{
        opacity:1
      }
    }
  }
})

export function renderTeamView(option, element,legendSelected) {
  var date = option[0].date;

  var colors = ['#ffc235', '#07c9d5', '#6fade1', '#ff5574', '#13d882', '#ff7c42', '#f4e602']

  const selected = zipObject(option.map(v => v.name),option.map(item => legendSelected.includes(item.name) ? true : false))
  let opt = option.slice()
  opt.forEach((v, k) => v.data = v.data.map(i => round(i,3)))
  //page router change,element dom can't find
  if (!element) return
  chart = echarts.init(element, 'custom')

  chart.setOption({
    // title: {
    //   show:date.length > 1 ? true : false,
    //   subtext: '（点击标签 开启/关闭 视图）',
    //   subtextStyle:{
    //     fontSize:12
    //   },
    //   top: -5,
    // },
    tooltip: {
      trigger: "axis",
      axisPointer:{
        type : date.length > 100 ? 'shadow' : 'line',
      }
    },
    toolbox: {
      show: true,
      top: -5,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        // dataView: {
        //   readOnly: false
        // },
        magicType: {
          type: ['line', 'bar'],
        },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      left: 'left', top: 0,
      data: opt.map(function (i) {
        return {
          name:i.name,
          icon:'path://<path d="M471,261.4L471,261.4C471,261.4,471,261.4,471,261.4L260.9,49.8c0,0,0,0,0,0l-1.5-1.5c0,0-0.4,0-0.4,0   c-8.3-7.9-17.9-12-29.9-12.3v0l-99.7-3.7l-4.4-0.2c-11.2,0.2-22.2,4.5-30.7,13.1L45.1,94.3c-9,9-13.1,20.9-13.1,32.7c0,0,0,0,0,0.1   l0.3,4.2l6.7,97.3c0,0.1,0,0.2,0,0.2v1.9c0,0,0,0,0,0c1,8.7,4.5,17.3,10.4,24.4l5.5,5.4l206.3,208.8l3.1,3.1   c11.9,10.5,30,10,41.3-1.4l165.4-166.6C482.8,292.6,483,273.3,471,261.4z M144,192c-26.5,0-48-21.5-48-48s21.5-48,48-48   s48,21.5,48,48S170.5,192,144,192z"/>'
        }
      }),
      selectedMode: date.length > 1 ? 'multiple' : true,
      selected,
    },
    grid: {
      left: '1%',
      right: '4.5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: "category",
      boundaryGap: false,
      data: date
    }],
    yAxis: [{
      type: "value",
      boundaryGap: [0, 0.1]
    }],
    series: //   [{
    //   "name": "充值",
    //   "type": "line",
    //   "data": [0],
    //   "markLine": {
    //     "data": [{
    //       "type": "average",
    //     }]
    //   }
    // }]
      opt.map(function (i, k) {
        return {
          name: i.name,
          type: 'line',
          data: i.data,
          ...getMarkPoint(date,i),
          // "markLine": {
          //   "data": date.length > 1 && date.length < 8 ? [{
          //     "type": "average",
          //     name:'平均值'
          //   }] : '',
          //   label:{
          //     normal:{
          //       position:'middle'
          //     }
          //   }
          // },
          // label: {
          //   "normal": {
          //     // show: true,
          //     show:date.length > 7 || Math.max(...i.data) === 0  ? false : true,
          //     // position: ['100%', '-300%'],
          //   }
          // },
          // itemStyle: {
          //   normal: {
          //     color: colors[k]
          //   }
          // },
        }
      })
  })

  // date.length > 1 && chart.on('legendselectchanged',({selected,name}) => {
  //   each(selected,(v,k) => {
  //     k != name &&
  //     chart.dispatchAction({type:'legendUnSelect',name:k})
  //   })
  // })
  chart.on('magictypechanged',({currentType}) => {
    chart.setOption({
      series:opt.map((i, k) => (currentType ==='bar' ? {
        markPoint:{
          itemStyle:{
            normal:{
              opacity:0
            }
          },
        },
        label: {
          normal: {
            // show: true,
            show:date.length > 7 || Math.max(...i.data) === 0  ? false : true,
            // position: ['100%', '-300%'],
            formatter({value}){
              return largeNum(value)
            }
          }
        },
      }: {
        label:{
          normal:{
            show:false
          }  
        },
        ...getMarkPoint(date,i)
      }))
    })
  })
}

