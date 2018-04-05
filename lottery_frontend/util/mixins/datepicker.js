import { mapGetters } from 'vuex'
import {format,addDays,subMonths
  ,isDate // new Date('') instanceof Date === true,but Invalid Date
  // ,isSameMonth
} from 'date-fns'


export const getNewDate = () => {
  let start = new Date
//      start.setHours(0,0,0,0)
  let end = addDays(start,1)
//      end.setHours(23,59,59)
  return [start,end]
}

const formatDate= (date) => {
  return format(date, 'YYYY-MM-DD')
}

export const getDaysRange = (picker,size = 3,month) => {
  const end = addDays(new Date(),1);
  let start = addDays(new Date(),1);
  if(month) {
    start = subMonths(start,month)
  }else{
    start.setTime(start.getTime() - 3600 * 1000 * 24 * size);
  }
//              start.setHours(0,0,0,0)
  if(picker) {
    picker.$emit('pick', [start, end])
  }else{
    return [start, end]
  }
}

//report date must before on today
// export const disabledDate = (time,date = +end) => time.getTime() > date
export const disabledDate = (time,registerTime,date = +getNewDate()[1]) => time.getTime() > date 
|| registerTime  && time.getTime() < +new Date(registerTime)

export const correctValue = $datepicker => {
  !$datepicker.isValidValue($datepicker.parseString($datepicker.displayValue)) && ($datepicker.userInput = null)

}

export const dateParam = (displayValue) => {
  let value = displayValue
  if(isDate(displayValue[0])) {
    value = displayValue.map(_ => formatDate(_))
  }
  const [date_start,date_end] = value
  return {date_start,date_end}
}

export const checkDateFormat = (context,dateKey = 'date') => {
  return context[dateKey] ? true : context.$msgbox('日期范围格式有误！', '错误')
}

export default {
  data(){
    const {register_at} = this.$store.state.user
    const date = getNewDate()
    return {
      // defaultDate:new Date,
      date,
      rangeSeparator:'至',
      pickerOptions:{
        // disabledDate,
        disabledDate(time){
          return disabledDate(time,register_at)
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const start = new Date();
            const end = addDays(start,1);
//              start.setHours(0,0,0,0)
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三天',
          onClick(picker) {
            getDaysRange(picker,3)
          }
        }, {
          text: '最近七天',
          onClick(picker) {
            getDaysRange(picker,7)
        }
        }]
      },
    }
  },
  methods:{
    dateParam(){
      if(this.$datepicker) {
        correctValue(this.$datepicker)
      }
      return dateParam(this.$datepicker ? this.$datepicker.displayValue : getNewDate())
    },
    handleFocus(){
      //todo: first render this month,two panel el-date-range-picker display same month,next different
      this.linkPanels()
    },
    handlePicker(val){
      // DatePicker only emits change event when value is truly changed
      // https://github.com/ElemeFE/element/releases/tag/v2.0.10
      
      // if(this.$datepicker) {
      //   correctValue(this.$datepicker)
      // }
      //clear button emit handlePicker
      if(!val) return
      this.pick && this.pick(val)
    },
    linkPanels(link = true){
      if(this.$datepicker && this.$datepicker.picker){
        this.$datepicker.picker.unlinkPanels = link
      }
    },
    checkDateFormat(){
      return checkDateFormat(this)
    },
    resetDate(){
      this.date = getNewDate()
    }
  },
  computed:{
    //vm unlinkPanels canb't observe $refs.datepicker.picker.unlinkPanels 
    // element-ui/packages/date-picker/src/picker.vue:716
    // unlinkPanels(){
    //   return this.date && !isSameMonth(...this.date)
    // }
    ...mapGetters({

    })
  },
  mounted(){
    this.$datepicker = this.$refs.datepicker
  }

}