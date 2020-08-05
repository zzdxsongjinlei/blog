const Controller =require('egg').Controller
class LifeController extends Controller{
    async getLifeList(){
        let sql='SELECT * FROM life order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getLifeById(){
        let id=this.ctx.params.id
        let sql="SELECT * FROM life WHERE id =  " + id;
            const result = await this.app.mysql.query(sql)
            this.ctx.body={
                data:result
            }
    }
    async delLife(){
        let id=this.ctx.params.id
        const result=await this.app.mysql.delete('life',{'id':id})
        this.ctx.body={
            data:result
        }
    }
    async updateLife(){
        let tmpArticle=this.ctx.request.body
        const request=await this.app.mysql.update('life',tmpArticle)
        const updateSuccess = request.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }

    }
    async addLife(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('life',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}
module.exports=LifeController;