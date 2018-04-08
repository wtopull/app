export default {
  scrollToTop: true,
  methods:{
    _blank(){
      [...this.$el.querySelectorAll('a')].forEach(_ =>  _.href && _.getAttribute('href').includes('http') && (_.target = '_blank'))
    }
  },
  mounted(){
    this._blank()
  }
}