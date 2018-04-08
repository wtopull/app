<template>
  <div class="bannerAdv">
    <div class="bannerAdvC">
      <div class="bannerAdvConL">
        <img src="../assets/img/indexHome/adv.png" />最新公告： </div>
      <div class="bannerAdvConR" id="bannerAdvConR">
        <div class="scroll_begin" id="scroll_begin">申博太阳城即日起公司入款享受1%返利优惠，线上支付享受0.6%返利，优惠无上限，全天24小时不限次数提款0手续费!&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="scroll_end" id="scroll_end"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      scrollImgLeft() {
        var MyMar = null
        var scroll_begin = document.getElementById('scroll_begin')
        var scroll_end = document.getElementById('scroll_end')
        var bannerAdvConR = document.getElementById('bannerAdvConR')
        console.log(scroll_end.innerHTML)
        scroll_end.innerHTML = scroll_begin.innerHTML
        scroll_begin.innerHTML += scroll_begin.innerHTML

        function Marquee() {
          if(scroll_end.offsetWidth - bannerAdvConR.scrollLeft <= 0) {
            bannerAdvConR.scrollLeft -= scroll_begin.offsetWidth
          } else {
            bannerAdvConR.scrollLeft++
          }
        }
        MyMar = setInterval(Marquee, 100)
        bannerAdvConR.onmouseover = function() {
          clearInterval(MyMar)
        }
        bannerAdvConR.onmouseout = function() {
          MyMar = setInterval(Marquee, 100)
        }
      }
    },
    mounted() {
      this.scrollImgLeft()
    }
  }
</script>
<style lang="scss">
.bannerAdv {
    width: 1100px;
    height: 35px;
    background: #F3F3F3;
    .bannerAdvC {
        display: flex;
        align-items: center;
        width: 1100px;
        height: 35px;
        font-weight: bold;
        img {
            margin-right: 12px;
        }
        .bannerAdvConR {
            display: flex;
            align-items: center;
            height: 33px;
            width: 800px;
            white-space: nowrap;
            overflow: hidden;
            font: 12px/33px "微软雅黑";
            color: #8C8C8C;
            .scroll_begin {
                display: inline-block;
                height: 33px;
            }
            .scroll_end {
                display: inline-block;
                height: 33px;
            }
        }
    }
}
</style>
