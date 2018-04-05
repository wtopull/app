// import 'operative'

export const getFirstNum = identifier => {
  let index = identifier.match(/\d/).index
  return identifier.slice(index, index + 1)
}

export const num = (n, decade) => [...Array(n)].map((v, k) => (decade ? decade(k) : k))
export const beginNum = (num,increment = 1) => num + increment
export const repeatNum = (length,count) => num(length).map(num => `${num + 1}`.repeat(count))

const isDouble = lottoType => ['11x5', 'pk10'].some(type => lottoType === type)

const REG_SPECIAL = /豹子|顺子|对子/

const sanTongHao = repeatNum(6,3)
const erTongHao = repeatNum(6,2)

export const transformCode = (code, method, type, identifier) => {
  if (method.includes('单式')) {
    return simpleUnCompress(code, isDouble(type))
  } else if (method.includes('定位胆')) {
    return code
      .split('|')
      .filter(_ => _.length)
      .join('|')
  } else if (method.match(REG_SPECIAL)) {
    return method.match(REG_SPECIAL)[0]
  } else if (method.includes('通选')) {
    return '通选'
  }else if(method.includes('三同号单选')){
    return code.split(',').map(num => sanTongHao[num - 1]).join()
  }
  else if(method.includes('二同号')){
    let t,b
    [t,b] = code.split('|')
    const tonghao = t.split(',').map(num => erTongHao[num - 1]).join() 
    return b ? tonghao + '|' + b : tonghao
  }
  else if(method.match(/大小|单双/)){
    return code.split(',').map(num => method.match(/大小|单双/)[0].split('')[num]).join()
  }
  return code
}

const filterSelected = (selected, isDouble, identifier) =>
  selected
    .map((value, index) => {
      if (value) {
        let result
        switch (identifier) {
          case 'hezhi_hezhi_hz':
            result = index + 3
        }
        if(identifier.includes('tonghao')) result = index + 1
        if (result) return result
        return isDouble ? `${index + 1}` : index
      }
    })
    .filter(_ => _ || _ === 0)

export const select2Code = (selected, isDouble, identifier) =>
  Array.isArray(selected)
    ? filterSelected(selected, isDouble, identifier)
    : Object.values(selected).map(selected =>
        filterSelected(selected, isDouble, identifier)
      )
//lodash uniq uniqBy slow!
//https://stackoverflow.com/questions/1890203/unique-for-arrays-in-javascript
export const textFilter = (value, length, isDouble) => {
  return value
    ? [
        ...new Set(
          value.split(isDouble ? /[，,;；]/g : /[，,;；\s]/g).filter(_ => {
            if (isDouble) {
              const array = _.split(/\s/g)
              if (array.some(num => num > isDouble || Number.isNaN(+num))) {
                return false
              }
              if ([...new Set(array)].length !== array.length) {
                return false
              }
            } else if (Number.isNaN(+_)) {
              return false
            }

            return !_.includes('.') && _.trim().length == length //11x5 len:String
          })
        )
      ]
    : []
}

export const simpleCompress = (array, length, isDouble) => {
  //please view php file
  let iLenght = isDouble ? (length + 1) / 3 : length
  let iLevel = length
  let aSets = array
    .map(_ => {
      let result = _.split(isDouble ? ' ' : '')
      return (isDouble
        ? result.map(num => (+num < 10 ? num.replace('0', '') : num))
        : result
      ).join('|')
    })
    .sort((a, b) => a - b)
  let aNewSets = {}
  let sSet
  let aNumbs
  let sLastNum
  let sKey

  for (let i = 0; i < iLenght; i++) {
    aSets.forEach(sSet => {
      if (sSet) {
        aNumbs = sSet.split('|')
        if (aNumbs.length === iLenght) {
          sLastNum = aNumbs.pop()
          sKey = aNumbs.join('|')
          if (aNewSets[sKey]) {
            aNewSets[sKey].push(sLastNum)
          } else {
            aNewSets[sKey] = [sLastNum]
          }
        }
      }
    })
    aSets = []
    for (var key in aNewSets) {
      if (aNewSets.hasOwnProperty(key)) {
        aSets.push(aNewSets[key].join(',') + '|' + key)
      }
    }
    aNewSets = []
  }

  return aSets.join(';')
}

// export const myWorker = operative({
//   simpleCompress
// });
//util/lotto/simpleUnCompress.php
const addZero = (num, isDouble) => (isDouble && num < 10 ? `0${num}` : num)

function simpleUnCompress(str, isDouble) {
  let aResult = []
  let aSets = str.split(';')
  let aSubSets
  let aNums
  let aTempA
  let aTempB
  aSets.forEach(sSet => {
    aNums = sSet.split('|').map(_ => _.split(','))
    aTempA = []
    aNums.forEach(aValue => {
      aTempB = []
      aValue.forEach(value => {
        if (aTempA.length) {
          aTempA.forEach(value2 => {
            aTempB.push(
              addZero(value2, isDouble) +
                `${isDouble ? ' ' : ''}` +
                addZero(value, isDouble)
            )
          })
        } else {
          aTempB.push(value)
        }
      })
      aTempA = aTempB
    })
    aResult.push(aTempA)
  })
  return aResult.join(';')
}
