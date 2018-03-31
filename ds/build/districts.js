// https://github.com/perfectworks/china-province-city-district

module.exports = (data,cb) => {
  //after gzip 66k,use 'l-v-c' 65k 
  // return data.provinces.map(({content:{name:l,id:v},cities}) => ({
  //   v,
  //   l,
  //   c:cities.map(({content:{name:l,id:v},areas}) => ({
  //     v,
  //     l,
  //     c:areas.map(({content:{name:l,id:v}}) => ({
  //       v,
  //       l
  //     }))
  //   }))
  // }))

  return data.provinces.map(({content:{name:label,id:value},cities}) => ({
    value,
    label,
    children:cities.map(({content:{name:label,id:value},areas}) => ({
      value,
      label,
      children:areas.map(({content:{name:label,id:value}}) => ({
        value,
        label
      }))
    }))
  }))
}