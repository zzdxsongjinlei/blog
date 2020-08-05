const Controller =require('egg').Controller
class HomeController extends Controller{
    async getResources(){
        let sql='SELECT * from resources order by add_time desc limit 5'
        const result=await this.app.mysql.query(sql)
        this.ctx.body=result
    }
    async getNotice(){
        let sql='SELECT * from notice WHERE hold = 1 order by add_time desc limit 1'
        const result=await this.app.mysql.query(sql)
        this.ctx.body=result
    }
    async getAuthor(){
        const result=await this.app.mysql.select('author')
        this.ctx.body={data:result}
    }
    async updateWebCount(){
        let sql='UPDATE author SET web_count = web_count + 1'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }  
}
module.exports=HomeController;












