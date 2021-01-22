// graphql的实际数据来源处理
const modelData = [
  {
    userId:"1212213123",
    loginId:"434234",
    orgNames:['1','2'],
    isAdmin:true,
    setting:{
      sendHotKey:"1",
      theme:"light"
    }
  }
]
module.exports = {
  Query:{
    getUser:(root,args,context,info)=>{
      return modelData[0]
    }
  }
}