import {levels} from '~/util/mixins/data-tables'
import {getChildren} from '~/plugins/common'
export {getChildren}

const format = ({total_balance:amount,level,return_point:point,logined_at:loginTime,register_at:registerTime,online_status,max_return_point:max,mini_return_point:min,...props}) => ({
  amount,
  point,
  level:levels[level - 1],
  loginTime,
  registerTime,
  status:online_status ? 1 : 2,
  max,min,
  ...props
})

export default {
  computed:{
    tableData(){
      return this.users.map(_ => format(_.content))
    },
  }
}