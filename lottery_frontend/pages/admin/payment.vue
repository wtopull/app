<template>
  <div class="m_center CaiWuZhongXin">
    <div class="members-content-nav">
      <ul>
        <nuxt-link to="/admin/payment" tag="li">充值</nuxt-link>
        <nuxt-link to="/admin/payment/withdraw" tag="li">提现</nuxt-link>
        <nuxt-link to="/admin/payment/third_platform" tag="li">转账</nuxt-link>
        <nuxt-link to="/admin/payment/charge_report" tag="li">充值记录</nuxt-link>
        <nuxt-link to="/admin/payment/withdraw_report" tag="li">提现记录</nuxt-link>
        <nuxt-link to="/admin/payment/platform_report" tag="li">转账记录</nuxt-link>
      </ul>
    </div>
    <div class="x_con">
      <nuxt-child/>
    </div>

  </div>
</template>
<script>
export default {
  name: 'payment'
}
</script>
<style lang="scss">
    @import "../../assets/scss/admin/index.scss";
  .members-content-nav {
    height: 58px;
    width: 100%;
    background: #F9F9F9;
    & ul {
      display: flex;
      flex-direction: row;
      margin: 0;
      padding-left: 30px;
      & li {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #848484;
        width: 107px;
        height: 38px;
        font-size: 14px;
        margin-top: 20px;
        cursor: pointer;
      }
      & li.active {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 28px;
        border: 1px solid #E8E8E8;
        border-top: 4px solid #F08200;
        border-bottom: 0px;
        color: #F08200;
      }
    }
  }
  .members-record, .members-withdraw, .admin-report, .third-platform {
    width: 100%;
    padding: 0px 30px;
    min-height: 650px;
  }
  .members-record-total {
    color: #9A9999;
    font-size: 12px;
    margin: 30px 0px 20px 0px;
  }
  .members-record-show {
    color: #444;
    font-size: 28px;
    margin-bottom: 28px;
  }
  .members-record-title {
    display: flex;
    margin: 0px;
    padding: 0px;
    margin-bottom: 30px;
    @for $i from 1 through 3 {
      & div:nth-child(#{$i}) {
        display: flex;
        @include cBg(#fff, 'n'+$i+'.png', 221px, 44px, 0px, 0px);
      }
      & div:nth-child(#{$i}).active {
        display: flex;
        @include cBg(#fff, 'h'+$i+'.png', 221px, 44px, 0px, 0px);
      }
    }
    @for $i from 1 through 3 {
      & li:nth-child(#{$i}) {
        display: flex;
        @include cBg(#fff, 'n'+$i+'.png', 221px, 44px, 0px, 0px);
      }
      & li:nth-child(#{$i}).active {
        display: flex;
        @include cBg(#fff, 'h'+$i+'.png', 221px, 44px, 0px, 0px);
      }
    }
  }
  .members-record-banks {
    border: 1px solid #E8E8E8;
    .members-record-bank-title {
      border-bottom: 1px solid #E8E8E8;
      background: #F9F9F9;
      height: 41px;
    }
    .members-record-bank-select {
      display: flex;
      flex-direction: column;
      padding: 0px 8px;
      & p {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #3B3B3B;
        height: 32px;
      }
      & ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0px;
        padding: 0px;
        width: 100%;
        @for $i from 1 through 19 {
          & li:nth-child(#{$i}) {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #E0E0E0;
            margin: 0px 17px 8px 0px;
            @include kBg(#fff, 'bank-'+$i+'.jpg', 118px, 38px, 0px, 0px);
            background-size: 100% 100%;
            cursor: pointer;
          }
          & li:nth-child(#{$i}).active {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #FFD100;
            margin: 0px 17px 8px 0px;
            @include kBg(#fff, 'bank-'+$i+'.jpg', 118px, 38px, 0px, 0px);
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
      }
    }
  }
  .members-record-bank-details {
    display: flex;
    margin-top: 22px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
    }
    ul {
      display: flex;
      flex-direction: column;
      margin: 0px;
      padding: 0px;
      & li {
        display: flex;
        align-items: center;
        height: 28px;
        & span {
          color: #FF0000;
          margin-right: 6px;
        }
      }
    }
  }
  .members-record-bank-operation {
    display: flex;
    flex-direction: column;
    height: 166px;
    margin-top: 38px;
    ul {
      display: flex;
      margin: 0px;
      padding: 0px;
      & li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 37px;
        position: relative;
        & input {
          width: 102px;
          height: 27px;
          border: 1px solid #ECC233;
          outline: none;
          padding: 0px 8px;
          caret-color: #ecc233;
          color: #ecc233;
        }
        & span {
          position: absolute;
          right: 24px;
          cursor: pointer;
        }
        & button {
          width: 134px;
          height: 37px;
          background: #E86F03;
          border: none;
          color: #FCFF14;
          font-size: 14px;
          outline: none;
          margin-left: 24px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
    div {
      position: relative;
      padding-left: 66px;
      & ul {
        position: absolute;
        top: -5px;
        display: flex;
        flex-direction: column;
        margin: 0px;
        padding: 25px 0px 0px 4px;
        @include kBg(#fff, 'amount.png', 111px, 108px, 0px, 0px);
        & li {
          display: flex;
          justify-content: flex-start;
          height: 24px;
          width: 102px;
          padding-left: 14px;
        }
        & li:hover {
          height: 24px;
          background: #F1F1F1;
          width: 102px;
          padding-left: 14px;
        }
      }
    }
  }
  /* members-withdraw 开始 */
  
  .members-withdraw-header {
    display: flex;
    flex-direction: row;
    & div {
      margin-right: 50px;
    }
  }
  .members-record-bank-title, .members-withdraw-bank-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #E8E8E8;
    background: #F9F9F9;
    height: 41px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 130px;
      & img {
        height: 32px;
        width: 32px;
        margin-right: 12px;
      }
    }
    ul {
      display: flex;
      flex-direction: row;
      & li {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        margin-right: 8px;
        & a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 92px;
          height: 32px;
          background: #fff;
          color: #7B7B7B;
          border: 1px solid #E0E0E0;
        }
        & a.active {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 92px;
          height: 32px;
          background: #ECC233;
          color: #fff;
          border: 1px solid #E0E0E0;
        }
      }
    }
  }
  .members-withdraw-bank-select {
  	padding: 0px 8px;
    p {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #3B3B3B;
      height: 32px;
    }
    ul {
    	display: flex;
    	flex-direction: row;
    	margin: 0;
    	padding: 0;
    	& li{
    		display: flex;
    		justify-content: center;
    		align-items: center;
    		width: 209px;
    		height: 45px;
    		margin: 0px 17px 8px 0px;
    		border: 1px solid #E0E0E0;
				background: #EFEFEF;
    	}
    	& li:last-child{
    		border: 1px dashed #E8E8E8;
				background: #fff;
    	}
    }
  }
  .members-withdraw-bank-details{
  	display: flex;
  	justify-content: flex-start;
  	flex-direction: column;
  	align-content: center;
  	margin-top: 16px;
  	& p{
  		display: flex;
  		align-items: center;
  		height: 30px;
  		& span{
  			display: flex;
  			justify-content: space-between;
  			width: 86px;
  			height: 30px;
  			align-items: center;
  		}
  	}
  	.bank-details-message{
  		margin-bottom: 38px;
  	}
  	.bank-details-money{
  		display: flex;
  		> div{
  			height: 60px;
  		}
  		& div{
  			display: flex;
  			& input{
  				width: 102px;
  				height: 27px;
  			}
  		}
  		& input{
  			color: #E07700;
  		}
  		& span{
  			color: red;
  			margin-left: 8px;
  		}
  	}
  }
  .members-withdraw-bank-pw{
  	display: flex;
  	flex-direction: column;
  	> div{
  		display: flex;
  		flex-direction: column;
  	}
  	.recharge_tit{
  		display: flex;
  		flex-direction: row;
  		height: 60px;
  		& input{
  			width: 102px;
  			height: 27px;
  		}
  	}
  	.zjmm{
  		& p{
  			height: 60px;
  			& img{
  				margin-right: 10px;
  			}
  		}
  		& button{
  			width: 134px;
  		height: 37px;
  		}
  		
  		
  	}
  }
</style>