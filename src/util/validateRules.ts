const validateRules: any = {}

// 验证规则扩展
validateRules.mobile = {
  '+86': [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, len: 11, message: '手机号码不符合规则', trigger: 'blur', placeholder: '00000000000' }
  ],
  '+852': [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^[0-9]{8}$/, len: 8, message: '手机号码不符合规则', trigger: 'blur', placeholder: '00000000' }
  ]
}

export default validateRules
