<template src="../templates/admin/index.html"> </template>
<style lang="scss">
  @import "../assets/scss/admin/index.scss";
  @import "../assets/c8css/manager.css";
  .manager {
    display: flex;
    width: 1100px;
    margin: 0 auto;
    .members-nav {
      width: 70px;
      & ul {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        @for $i from 1 through 5 {
          & li:nth-child(#{$i}) {
            display: flex;
            justify-content: center;
            margin-bottom: 1px;
            position: relative;
            cursor: pointer;
            @include Bg(#FFD100, 'nav'+$i+'.jpg', 70px, 70px, 10px, 8px);
            & span {
              position: absolute;
              bottom: 8px;
              font-size: 12px;
              color: #444;
            }
          }
          & .members-accounting {
            display: flex;
            flex-direction: column;
            position: absolute;
            right: -154px;
            padding: 12px 12px 9px 12px;
            background: #444;
            display: none;
            & a {
              display: flex;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              border-bottom: 1px dashed #2D2D2D;
              height: 35px;
              cursor: pointer;
              & p {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                width: 130px;
                height: 29px;
                font-size: 14px;
              }
              & p:hover {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #444;
                width: 130px;
                height: 29px;
                background: #FFD100;
                font-size: 14px;
              }
              & p.active {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #444;
                width: 130px;
                height: 29px;
                background: #FFD100;
                font-size: 14px;
              }
            }
          }
          & li:nth-child(#{$i}):hover {
            display: flex;
            justify-content: center;
            margin-bottom: 1px;
            position: relative;
            @include Bg(#444, 'navs'+$i+'.jpg', 70px, 70px, 10px, 8px);
            & span {
              position: absolute;
              bottom: 8px;
              font-size: 12px;
              color: #fff;
            }
            @if $i == 2 {
            	.members-accounting{
            		display: block;
            		z-index: 101;
            	}
            }
          }
          & li:nth-child(#{$i}).active {
            display: flex;
            justify-content: center;
            margin-bottom: 1px;
            position: relative;
            @include Bg(#444, 'navs'+$i+'.jpg', 70px, 70px, 10px, 8px);
            & span {
              position: absolute;
              bottom: 8px;
              font-size: 12px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'admin',
    fetch({
      redirect,
      route: {
        matched
      }
    }) {
      if(matched.length <= 1) {
        redirect('/admin/user')
      }
    },
    data() {
      return {
//      isShow: false,
      }
    },
    computed: {
      isAgent() {
        return this.$store.getters.isAgent
      }
    }
  }
</script>