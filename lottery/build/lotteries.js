const _ = require('lodash')

exports.toLlottoNavList = (data) => {
  return data.types.map(({ content: { infos, ...props } }) => {
    return {
      infos: infos.map(({ content: { identifier: i, name: n, is_new: ne, is_hot: h, description: d, id,max_bet_prize_group:mp,max_trace_issue_count:ic } }) => {
        return {
          id,
          i,
          n,
          ne,
          h,
          d,
          mp,
          ic
        }
      }),
      ...props
    }
  }).filter(_ => _.infos.length)
}

exports.toLottoInfo = (data,typeName) => {
  // return data.big_ways.map(({content:{identifier:i,name:a,show_name:sa},small_ways}) => {
  //   return {
  //     c:{i,a,sa},
  //     s:small_ways.map(({content:{identifier:i,name:a,show_name:sa},bets}) => {
  //       return {
  //         c:{i,a,sa},
  //         b:bets.map(({content:{unique_count:un,min_repeat_time:min,max_repeat_time:max,offset:o,position:p,digital_count:num,name,show_name:sa,note:i,short_note:si,buy_length:b,cal_prize_base:c,id,identifier:idf,max_bet_prize_group:mp}}) => {
  //           return _.pickBy({
  //             un,
  //             // o,p,
  //             a:name.replace(typeName,''),
  //             // i,si,
  //             sa,c,id,idf,mp
  //             // tid,gid,sgid,b,num,min,max,
  //             // ...props
  //           },_ => _ || _ === 0)
  //         })
  //       }
  //     })
  //   }
  // })

  const transformBets = ({content:{unique_count:un,min_repeat_time:min,max_repeat_time:max,offset:o,position:p,digital_count:num,name,show_name:sa,note:i,short_note:si,buy_length:b,cal_prize_base:c,id,identifier:idf,max_bet_prize_group:mp,singled_out_max_prize,all_bet_count
    :ac,singled_out_max_prize:sp,bet_prize}}) => {
    return _.pickBy({
      // un,
      // o,p,
      a:name.replace(typeName,''),
      // i,si,id,
      sa,c,idf,mp,ac,sp,
      bp:Number(bet_prize),
      // tid,gid,sgid,b,num,min,max,
      // ...props
    },_ => _ || _ === 0)
  }

  const lotto = data ? data.big_ways.map(({content:{identifier:i,name:a,show_name:sa},small_ways}) => ({
    c:{
      // i,
      a,sa},
    s:small_ways.map(({content:{identifier:i,name:a,show_name:sa},bets}) => {
      return {
        c:{
          // i,
          a,sa},
        b:bets
      }
    })
  })) : []

  const playInfo = lotto.map(({c,s}) => ({
    c,
    s:s.map(({c,b}) => ({
      c,
      b:b.map(transformBets)
    }))
  }))

  const playHelp = lotto.map(({s}) => s.map(({b}) => b.map(({content:{note:i,short_note:si,identifier:idf}}) => (/renxuan_renxuan|dantuo_dantuo_dt/.test(idf) ? {si,idf} : {//11x5 renxuan
    i,
    si,
    idf
  }))))
  return {playInfo,playHelp}
}

const reposalBetInfo = (bets,isSingleBet) => bets.map(({content:{id,bet_prize,identifier:idf,max_bet_prize_group:mp,show_name:si,layout:[{odds}]}}) => ({
  // bp:Number(bet_prize),
  // id,
  idf,
  mp,
  o:odds.map(_ => eval(_)),
  ...isSingleBet ? {si} : {}
}))


exports.toReposalInfo = (data,type) => {
  if(type === 'pk10') {
    let big_ways = [].concat(...data ? data.big_ways.map(_ => _.small_ways) : [])

    return big_ways.map(({content:{show_name:sa,identifier:i},bets}) => {
      let s = reposalBetInfo(bets)

      return {
        c:{sa,i},
        s
      }
    })

  }else{
    return data ? data.big_ways.map(({content:{show_name:sa,identifier:i},small_ways}) => {
      const isSingleBet = small_ways.length === 1 && small_ways[0].bets.length > 1

      let s = small_ways.map(({bets}) => {
        return reposalBetInfo(bets,isSingleBet)
      })

      if(isSingleBet) {
        s = s[0]
      }

      if(s.every(_ => _.length === 1)) {
        s = s.map(_ => _[0])
      }

      return {
        c:{sa,i},
        s
      }
    }) : []
  }

}
