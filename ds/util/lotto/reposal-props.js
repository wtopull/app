export default {
  playList:{
    type:Array,
    default:[{bets:[]}]
  },
  playMaxGroup:Number,
  checkOrder:Function,
  lottoType:String,
  size:{
    type:Array,
    //[Vue warn]: Invalid default value for prop "size": Props with type Object/Array must use a factory function to return the default value.
    // default:['大', '小', '单', '双']
    default:() => ['大', '小', '单', '双','和']
  }
}