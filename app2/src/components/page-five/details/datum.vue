<template>
  <div class="datum">
    <ul class="datum-top">
      <li @click="show = !show">
        <p>头像</p>
        <div>
          <img :src="userImg ? userImg : imgsrc" alt="" />
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>昵称</p>
        <div>
          <input type="text" placeholder="请设置昵称" :class="{'active': input ===true}" @click="input = true" />
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>账号</p>
        <div>
          <p>haaaa</p>
        </div>
      </li>
    </ul>
    <van-actionsheet v-model="show" title="修改头像">
		  <div class="datum-img">
		  	<p>预览</p>
		  	<img :src="imgUrl ? imgUrl : imgsrc"/>
		  	<p>{{imgName ? imgName : '阿黄'}}</p>
		  </div>
		  <div class="datum-img-box">
		  	<div class="datum-hide">
		  		<ul class="datum-imgs">
				  	<li v-for="(img,index) in imgs" :key="index"><img :src="img.paths" @click="nickname(img,$event,index)"/></li>
				  </ul>
		  	</div>
		  </div>
		  <div class="datum-but">
		  	<button @click="saveImg">保存头像</button><button @click="show = !show">取消</button>
		  </div>
		</van-actionsheet>
    <ul class="datum-btn">
      <li>
        <p>手机</p>
        <div>
          <p>未设置</p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>邮箱</p>
        <div>
          <p>未设置</p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>性别</p>
        <div>
          <select name="">
          	<option value="">保密</option>
          	<option value="">男</option>
          	<option value="">女</option>
          </select>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <p>生日</p>
        <div>
          <p>haaaa</p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: false,
        show:false,
        imgName:'',
        userImg:"",
        imgUrl:"",
        imgsrc:require('../../../assets/img/five/kkkk.jpg'),
        imgs:[
        	{name:'不三不四',paths: require('../../../assets/img/five/timg.jpg')},
        	{name:'李四',paths: require('../../../assets/img/five/tims.jpg')},
        	{name:'张三',paths: require('../../../assets/img/five/imgase.jpg')},
        	{name:'阿黄',paths: require('../../../assets/img/five/kkkk.jpg')},
        	{name:'不三不四',paths: require('../../../assets/img/five/timg.jpg')},
        	{name:'李四',paths: require('../../../assets/img/five/tims.jpg')},
        	{name:'张三',paths: require('../../../assets/img/five/imgase.jpg')},
        	{name:'阿黄',paths: require('../../../assets/img/five/kkkk.jpg')},
        	{name:'不三不四',paths: require('../../../assets/img/five/timg.jpg')},
        	{name:'李四',paths: require('../../../assets/img/five/tims.jpg')},
        	{name:'张三',paths: require('../../../assets/img/five/imgase.jpg')},
        	{name:'阿黄',paths: require('../../../assets/img/five/kkkk.jpg')},
        	{name:'不三不四',paths: require('../../../assets/img/five/timg.jpg')},
        	{name:'李四',paths: require('../../../assets/img/five/tims.jpg')},
        	{name:'张三',paths: require('../../../assets/img/five/imgase.jpg')},
        	{name:'阿黄',paths: require('../../../assets/img/five/kkkk.jpg')},
        	{name:'不三不四',paths: require('../../../assets/img/five/timg.jpg')},
        	{name:'李四',paths: require('../../../assets/img/five/tims.jpg')},
        	{name:'张三',paths: require('../../../assets/img/five/imgase.jpg')},
        	{name:'阿黄',paths: require('../../../assets/img/five/kkkk.jpg')}
        ]
      }
    },
    methods:{
    	nickname(img,event,index){
    		this.imgName = img.name;
    		this.imgUrl = img.paths;
    	},
    	saveImg(){
    		this.userImg = this.imgUrl;
    		this.show = !this.show;
    	}
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/details/datum.scss';
</style>