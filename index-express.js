const express = require('express')
require('module-alias').addAlias('@src', `${__dirname}/src/`) //设置alias 参考地址 https://www.npmjs.com/package/module-alias
require('dotenv').config() //自动把根目录的.env 文件里面设置的变量放到process.env上，便于直接使用这些配置项 参考地址 https://www.npmjs.com/package/dotenv
require('@src/service/logger')//引入日志配置
const authentication =  require('@src/service/authentication')//身份验证
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('@src/graphql/schema')
const resolvers = require('@src/graphql/resolvers')

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers
})

app.use('/graphql',authentication)

server.applyMiddleware({app})

app.use((req,res)=>{
  res.status(200)
  res.send('hello')
  res.end()
})

app.listen({port:process.env.APP_PORT},()=>{
  console.log(`启动啦，访问graphql的地址是：http://localhost:${process.env.APP_PORT}${server.graphqlPath}`)
})