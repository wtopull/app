// 大小写字母开头,6-10个字符
export const usernameReg = /^[a-zA-Z]\w{5,9}$/

// 字母数字组合,6-18个字符
export const pwReg = /^(?=\w*[A-Za-z]+\w*)(?=\w*\d+\w*)\w{6,18}$/

export const getRequiredRule = (message, trigger = 'blur') => ({
  required: true,
  message,
  trigger
})

export const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value)

// https://github.com/ElemeFE/element/issues/4165
export const validNumber = (
  msg,
  {
    intMsg = '不能有小数点',
    positiveMsg = '数值必须大于0',
    isPositive = true
  } = {}
) => {
  return {
    validator: (rule, value, callback) => {
      if (!isNumeric(value)) {
        callback(new Error(msg))
      } else if (intMsg && !(value == Math.round(value))) {
        callback(new Error(intMsg))
      } else if (isPositive && positiveMsg && value <= 0) {
        callback(new Error(positiveMsg))
      } else {
        callback()
      }
    }
    // , trigger: 'blur,change'
  }
}

export const validUsername = () => {
  return {
    validator: (rule, value, callback) => {
      if (!usernameReg.test(value)) {
        return callback('必须大小写字母开头,6-10个字符！')
      }
      callback()
    },
    trigger: 'blur'
  }
}

export const validPassword = () => {
  return {
    validator: (rule, value, callback) => {
      if (!pwReg.test(value)) {
        //todo new Error is required ?
        callback(new Error('密码必须字母数字组合,6-18个字符'))
      }
      callback()
    },
    trigger: 'blur'
  }
}

export const paramValidate = (
  id,
  {
    error,
    reg = usernameReg,
    message = '不存在的用户',
    ssr = true,
    context
  } = {}
) =>
  id && !reg.test(id)
    ? ssr
      ? error({ message })
      : context.$message.error({ duration: 2000, message })
    : true //context.$message return Promise

export const apiIdValidate = (id, message, error) =>
  id && id.length !== 24 ? error({ message }) : true