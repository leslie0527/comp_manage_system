// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'my-app',
        // GraphQL API 的 URL
        url: 'http://api.tomorrow979.cn/staff/public/index.php/api/gql',
      },
      // 通过扩展名选择需要处理的文件
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }