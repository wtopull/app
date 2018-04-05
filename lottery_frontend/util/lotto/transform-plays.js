import cache from '../cache'

export const initLottoPlays = (store, lottoName, context, error) => {
  if (cache[lottoName]) {
    return {
      playList: cache[lottoName]
    }
  }
  if (!store.getters['lotto/listMap'].hasOwnProperty(lottoName)) {
    return error
      ? error({ message: '无此彩种！' })
      : context.$router.push('/home')
  }
  return context.$getJson(lottoName).then(({ data }) => {
    cache[lottoName] = data.map(
      ({ c: { i: big_group_identifier, a: name, sa: show_name }, s }) => {
        return {
          content: { big_group_identifier, name, show_name },
          small_ways: s.map(
            ({
              c: { i: small_group_identifier, a: name, sa: show_name },
              b
            }) => {
              return {
                content: {
                  //  small_group_identifier,
                  name,
                  show_name
                },
                bets: b.map(
                  ({
                    // un: unique_count, min: min_repeat_time, max: max_repeat_time, o: offset, p: position, num: digital_count, b: buy_length,i: note, si: short_note,id,
                    mp: max_bet_prize_group,
                    a: name,
                    sa: show_name,
                    c: cal_prize_base,
                    idf: identifier,
                    bp: bet_prize,
                    ac: all_bet_count,
                    sp: singled_out_max_prize,
                    ...props
                  }) => {
                    return {
                      // unique_count,
                      // min_repeat_time,
                      // max_repeat_time,
                      // offset,
                      // position,
                      // digital_count,
                      name,
                      show_name,
                      // note,
                      // short_note,
                      // buy_length,
                      cal_prize_base,
                      max_bet_prize_group,
                      // id,
                      identifier,
                      // small_group_identifier,
                      // big_group_identifier,
                      all_bet_count,
                      bet_prize,
                      singled_out_max_prize,
                      ...props
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
    return {
      playList: cache[lottoName]
    }
  })
  // .catch((e) => {
  //   // error({ statusCode: 404, message: 'User not found' })
  // })
}

export const initReposalPlays = (store, lottoName, context, error) => {
  if (cache[`${lottoName}.reposal`]) {
    return {
      playList: cache[`${lottoName}.reposal`]
    }
  }
  if (!store.getters['lotto/listMap'].hasOwnProperty(lottoName)) {
    return error
      ? error({ message: '無此彩種！' })
      : context.$router.push('/home')
  }
  return context.$getJson(`${lottoName}.reposal`).then(({ data }) => {
    cache[`${lottoName}.reposal`] = data.map(
      ({ s, c: { sa: show_name, i: identifier } }) => {
        return {
          content: { show_name, identifier },
          bets: s.map(
            ({
              id,
              idf: identifier,
              mp: max_bet_prize_group,
              o: odds,
              si
            }) => ({
              // id,
              identifier,
              max_bet_prize_group,
              odds,
              ...(si ? { show_name: si } : {})
            })
          )
        }
      }
    )
    return {
      playList: cache[`${lottoName}.reposal`]
    }
  })
}
