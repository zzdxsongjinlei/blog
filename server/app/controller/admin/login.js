const Controller =require('egg').Controller
class LoginController extends Controller{
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT author_name FROM author WHERE author_name = '"+userName +
                  "' AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            //登录成功,进行session缓存
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'登录成功','openId':openId}

        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }
    async checkIsLogin(){
        this.ctx.body={
            data:'已成功登陆'
        }
    }
}
module.exports=LoginController;