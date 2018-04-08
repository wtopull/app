<template src="../templates/sidebar.html">
	
</template>

<script>
	import lineDomains from '~/pages/domains.vue'
	export default{
		data() {
			return{
				show:true,
				hide:false,
				icon:true,
				icons:false
			}
		},
		methods:{
			isshow(){
				this.show = !this.show;
				this.hide = !this.hide
			},
			isicon(){
				this.icon = !this.icon;
				this.icons = !this.icons
			}
		},
		components:{
			lineDomains
		}
	}
</script>

<style lang="scss" scoped>
@mixin Bg($pic, $width, $height) {
    background: url('~/assets/img/indexHome/'+$pic) no-repeat;
    height: $height;
    width: $width;
}
.sidebar-round{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: fixed;
	right: 0px;
	top: 50%;
	width: 112px;
	height: 269px;
	margin-top: -125px;
	z-index: 10001;
	padding-left: 24px;
	background: url(~/assets/img/indexHome/sidebar.png) no-repeat;
	cursor: pointer;
	& p{
		display: flex;
		color: #2D0700;
		font-size: 18px;
		width: 18px;
		margin-left: 6px;
	}
}
.sidebar.active{
	display: none;
}
.sidebar{
	display: flex;
	width: 154px;
	background: url(~/assets/img/indexHome/pop.jpg) no-repeat;
	position: fixed;
	right: 15px;
	top: 50%;
	margin-top: -120px;
	z-index: 999;
	padding: 12px 8px 0px 11px;
	& ul{
		& li{
			display: flex;
			cursor: pointer;
			width: 154px;
			margin-bottom: 1px;
		}
		& li:nth-child(1){
			background: url(../assets/img/indexHome/fixpr1.jpg) no-repeat;
			height: 55px;
		}
		& li:nth-child(2){
			display: flex;
			padding: 11px 0px;
			> div{
				& p:nth-child(1){
					margin: 7px 0px 22px;
				}
				@for $i from 1 through 2 {
        			& p:nth-child(#{$i}) {
        				@include Bg('iphoe'+$i+'.png',26px,32px);
        			}
        			& p.active:nth-child(#{$i}){
        				@include Bg('iphoe-active'+$i+'.png',26px,32px);
        			}
        		}
			}
			> div:nth-child(2){
				background: url(~/assets/img/indexHome/fixpr2.jpg) no-repeat;
				width: 96px;
				height: 96px;
				margin-left: 9px;
				display: none;
			}
			> div.active:nth-child(2){
				display: block;
			}
			> div:nth-child(3){
				background: url(~/assets/img/indexHome/fixpr22.jpg) no-repeat;
				width: 96px;
				height: 96px;
				margin-left: 9px;
				display: none;
			}
			> div.active:nth-child(3){
				display: block;
			}
		}
		& li:nth-child(3){
			background: url(~/assets/img/indexHome/fixpr3.jpg) no-repeat;
			height: 55px;
		}
		& li:nth-child(4){
			background: url(~/assets/img/indexHome/fixpr4.jpg) no-repeat;
			height: 48px;
			margin-top: 2px;
		}
		& li:nth-child(5){
			background: url(~/assets/img/indexHome/fixpr5.jpg) no-repeat;
			height: 30px;
			margin-top: 8px;
		}
	}
}
</style>