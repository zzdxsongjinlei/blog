const Controller =require('egg').Controller
class NoticeController extends Controller{
    async getNoticeList(){
        let sql='SELECT * FROM notice order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getNoticeById(){
        let id=this.ctx.params.id
        let sql="SELECT * FROM notice WHERE id =  " + id;
            const result = await this.app.mysql.query(sql)
            this.ctx.body={
                data:result
            }
    }
    async delNotice(){
        let id=this.ctx.params.id
        const result=await this.app.mysql.delete('notice',{'id':id})
        this.ctx.body={
            data:result
        }
    }
    async updateNotice(){
        let tmpArticle=this.ctx.request.body
        const request=await this.app.mysql.update('notice',tmpArticle)
        const updateSuccess = request.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }

    }
    async addNotice(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('notice',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}
module.exports=NoticeController;