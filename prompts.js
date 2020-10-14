module.exports = [
  {
    type: 'list',
    name: 'template',
    message: '请选择孔明锁模板',
    choices: [
      {
        name: '默认模板',
        value: 'default'
      },
    ],
    default: 'None'
  },
  {
    when: answers => answers.template === 'custom',
    type: 'input',
    name: 'repo',
    message: '请输入自定义孔明锁模板地址',
    filter (input) {
      return new Promise(function (resolve, reject) {
        if (input) {
          resolve(input)
        } else {
          reject(new Error('孔明锁模板地址不能为空'))
        }
      })
    }
  }
]