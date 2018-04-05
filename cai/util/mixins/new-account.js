import { mapGetters,mapActions } from 'vuex'

export default {
  props:['min','max','quota'],
  methods:{
    getPoint(val){
      return (val - this.minBonusGroup)/20
    },
    ...mapActions([
      'getUser'
    ]),
  },
  computed:{
    ...mapGetters([
      'minBonusGroup'
    ]),
  },
  mounted(){
    this.$form = this.$refs.form
    this.quotaFields = this.$form  && this.$form.fields.slice(-1)[0]  //cache this.$form validateField
  }
}