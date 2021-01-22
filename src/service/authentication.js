const authentication = (req,res,next)=>{
  const {
    headers:{authorization}
  } = req
  if(!authorization){
    return next
  }
  console.log(authorization,999)
}

module.exports = authentication