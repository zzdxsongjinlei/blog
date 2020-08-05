const Controller =require('egg').Controller
class DemoController extends Controller{
    async getDemoList(){
        let sql='SELECT * FROM demo order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getDemoById(){
        let id=this.ctx.params.id
        let sql="SELECT * FROM demo WHERE id =  " + id;
            const result = await this.app.mysql.query(sql)
            this.ctx.body={
                data:result
            }
    }
    async delDemo(){
        let id=this.ctx.params.id
        const result=await this.app.mysql.delete('demo',{'id':id})
        this.ctx.body={
            data:result
        }
    }
    async updateDemo(){
        let tmpArticle=this.ctx.request.body
        const request=await this.app.mysql.update('demo',tmpArticle)
        const updateSuccess = request.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }

    }
    async addDemo(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('demo',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}
module.exports=DemoController;