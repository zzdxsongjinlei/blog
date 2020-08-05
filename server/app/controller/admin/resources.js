const Controller =require('egg').Controller
class ResourcesController extends Controller{
    async getResourcesList(){
        let sql='SELECT * FROM resources order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getResourcesById(){
        let id=this.ctx.params.id
        let sql="SELECT * FROM resources WHERE id =  " + id;
            const result = await this.app.mysql.query(sql)
            this.ctx.body={
                data:result
            }
    }
    async delResources(){
        let id=this.ctx.params.id
        const result=await this.app.mysql.delete('resources',{'id':id})
        this.ctx.body={
            data:result
        }
    }
    async updateResources(){
        let tmpArticle=this.ctx.request.body
        const request=await this.app.mysql.update('resources',tmpArticle)
        const updateSuccess = request.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }

    }
    async addResources(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('resources',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}
module.exports=ResourcesController;