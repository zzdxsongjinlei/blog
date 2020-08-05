const Controller =require('egg').Controller
class BookController extends Controller{
    async getBookList(){
        let sql='SELECT * FROM book order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getBookById(){
        let id=this.ctx.params.id
        let sql="SELECT * FROM book WHERE id =  " + id;
            const result = await this.app.mysql.query(sql)
            this.ctx.body={
                data:result
            }
    }
    async delBook(){
        let id=this.ctx.params.id
        const result=await this.app.mysql.delete('book',{'id':id})
        this.ctx.body={
            data:result
        }
    }
    async updateBook(){
        let tmpArticle=this.ctx.request.body
        const request=await this.app.mysql.update('book',tmpArticle)
        const updateSuccess = request.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }

    }
    async addBook(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('book',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}
module.exports=BookController;