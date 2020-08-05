module.exports = options =>{
    return async function adminauth(ctx,next){
         let openId = Number(ctx.request.body.openId)
        if(ctx.session.openId && ctx.session.openId.openId==openId){
            await next()
        }else{
            ctx.body={
            	status:401,
            	data:'您还未登陆，请登录后进入后台'
            }
        }
    }
}