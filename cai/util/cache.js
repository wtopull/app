import { addSeconds } from 'date-fns'

let cache = {
  memberInfo: {
    expires: 0,
    value: {
      member_count: [],
      proxy_count: [],
      no_proxy_count: [],
      team_total_balance: 0
    }
  },
  news: {
    
  },
  message:{
    
  }
}



export default cache

export const setExpires = (seconds, key) => cache[key].expires = +addSeconds(new Date, seconds)