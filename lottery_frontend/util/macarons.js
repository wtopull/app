var colorPalette = [
  '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
  '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
  '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
  '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
];


var theme = {
  color: colorPalette,

  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#2ba7e7'
    }
  },

  visualMap: {
    itemWidth: 15,
    color: ['#5ab1ef','#e0ffff']
  },

  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#999'
      },
      emphasis:{
        borderColor:'#2ba7e7'
      }
    }
  },

  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    axisPointer : {
      lineStyle : {
        color: 'rgba(213, 213, 213,.75)'
      },
      crossStyle: {
        color: '#2ba7e7'
      },
      shadowStyle : {
        color: 'rgba(220,220,220,0.2)'
      }
    },
    padding:20,
    extraCssText:'box-shadow: rgba(0, 0, 0, 0.05) 4px 4px 10px;color: #666'
  },

  dataZoom: {
    dataBackgroundColor: '#efefff',
    fillerColor: 'rgba(182,162,222,0.2)',
    handleColor: '#2ba7e7'
  },

  grid: {
    borderColor: '#eee'
  },

  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#d5d5d5',
        // width:1,
      }
    },
    axisLabel:{
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      lineStyle: {
        color: ['#eee']
      }
    }
  },

  valueAxis: {
    axisLine: {
      lineStyle: {
        color: 'rgba(0,0,0,0)',
        width:2
      }
    },
    axisLabel:{
      textStyle: {
        color: '#333'
      }
    },
    splitArea : {
      show : true,
      areaStyle : {
        color: ['rgba(0,0,0,0)','rgba(0,0,0,0)']
      }
    },
    splitLine: {
      lineStyle: {
        color: ['rgba(213, 213, 213,.75)'],
        type:'dashed'
      }
    }
  },

  // timeline : {
  //   lineStyle : {
  //     color : '#2ba7e7'
  //   },
  //   controlStyle : {
  //     normal : { color : '#2ba7e7'},
  //     emphasis : { color : '#2ba7e7'}
  //   },
  //   symbol : 'emptyCircle',
  //   symbolSize : 3
  // },

  line: {
    smooth : true,
    symbol: 'circle',
    symbolSize: 3
  },

  candlestick: {
    itemStyle: {
      normal: {
        color: '#d87a80',
        color0: '#2ec7c9',
        lineStyle: {
          color: '#d87a80',
          color0: '#2ec7c9'
        }
      }
    }
  },

  scatter: {
    symbol: 'circle',
    symbolSize: 4
  },

  map: {
    label: {
      normal: {
        textStyle: {
          color: '#d87a80'
        }
      }
    },
    itemStyle: {
      normal: {
        borderColor: '#eee',
        areaColor: '#ddd'
      },
      emphasis: {
        areaColor: '#fe994e'
      }
    }
  },

  graph: {
    color: colorPalette
  },

  gauge : {
    axisLine: {
      lineStyle: {
        color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
        width: 10
      }
    },
    axisTick: {
      splitNumber: 10,
      length :15,
      lineStyle: {
        color: 'auto'
      }
    },
    splitLine: {
      length :22,
      lineStyle: {
        color: 'auto'
      }
    },
    pointer : {
      width : 5
    }
  }
};

export default theme