// 设置的基本的type和query,schema
module.exports = `

  # 个人信息的数据类型
  # Int  Float  String  Boolean  ID 
  # 支持哪些数据类型参考：https://www.apollographql.com/docs/apollo-server/schema/schema/#supported-types
  type Setting {
    sendHotKey:Int
    theme:String
  }
  type User {
    userId:String!
    loginId:String
    orgNames:[String]
    isAdmin:Boolean
    setting:Setting
  }

  # 查询的定义
  type Query {
    getUser(name:String):User
  }
`;


// 查询时候的格式例如下面：
// query {
//   getUser(name:"iiiii"){
//       userId
//   }
// }