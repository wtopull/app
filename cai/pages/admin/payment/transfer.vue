<template src="../../../templates/admin/payment/transfer.html">
</template>
<script>
export default {
  data() {
    return {
      options2: [
        {
          label: '黄金糕',
          disabled: false,
        },
        {
          label: '双皮奶',
          disabled: true,
        },
        {
          label: '蚵仔煎',
          disabled: false,
        },
        {
          label: '龙须面',
          disabled: false,
        },
        {
          label: '北京烤鸭',
          disabled: false,
        },
      ],
      value2: '',
      num8: 50,
      numberValidateForm: {
        age: '',
      },
      jinbis: ['1000', '5000', '10000'],
    };
  },
  methods: {
    jinbiC(index) {
      var _this = this;
      _this.num8 = _this.jinbis[index];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
.transfer,
.transfer .trD {
  width: 100%;
  align-content: center;
}
.transfer .trD {
  margin-top: 10px;
}
.transfer .trD ul {
  display: flex;
  border-left: 1px solid #eee;
}
.transfer .trDa ul li {
  width: 50% !important;
  & h3 span {
    color: #009f86;
    & i {
      font-size: 30px;
      font-style: normal;
    }
  }
}
.transfer .trD ul li {
  display: flex;
  width: 25%;
  height: 64px;
  padding: 20px 10px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eee;
  border-left: 0px solid #eee;
}
.transfer .trD .el-button--primary {
  height: 40px;
  background: #009f86;
}
.transfer .el-button--warning,
.transfer .el-button--warningss,
.transfer .el-button--warningsg {
  width: 110px !important;
  height: 31px;
  padding: 0;
}
.transfer .trFo select {
  width: 200px;
  height: 30px;
}
.trFo .el-input-number{
  width:200px;
}
.el-input-number.is-controls-right .el-input__inner {
  text-align: left;
}
.trFo{
  display: flex;
  width: 100%;
  justify-content: center;
  & ul{
    display: flex;
    flex-direction: column;
    // justify-content: center;

  }
  & ul li{
    display: flex;
    flex-direction: column;
    margin-top:10px;
  }
  & .el-input{
      width:200px;
    }
  & .trFoJ{
    margin:10px 0 0 74px;
    &>button{
      margin-right:8px;
      border:none;
      border:1px solid #009f86;
      color:#009f86;
      background:none;
      cursor: pointer;
      border-radius:2px;
    }
  }
  & .el-button--primary{
    width:210px;
    height:40px;
    padding:0;
    background: #009f86;
    margin: 0 auto 50px;
  }
  & .el-form-item__label{
    margin: 0;
    padding: 0px;
  }
  & .el-form-item.is-required .el-form-item__label:before{
    content:"";
    margin: 0;
    padding: 0;
  }
}
</style>