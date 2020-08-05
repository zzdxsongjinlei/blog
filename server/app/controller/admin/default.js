const Controller =require('egg').Controller
class DefaultController extends Controller{
    
    async getWebTime(){
        const sql = " SELECT * FROM author"
        const res = await this.app.mysql.query(sql)
        this.ctx.body={
                data:res
        }
    }
    async getWebCount(){
        const sql = " SELECT web_count FROM author"
        const res = await this.app.mysql.query(sql)
        this.ctx.body={
                data:res
        }
    }



}
module.exports=DefaultController;