const Controller =require('egg').Controller
class ArticleController extends Controller{
    async getArticleList(){
        let sql='SELECT * FROM article order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getArticleById(){
        let id=this.ctx.params.id
        let sql="SELECT * FROM article WHERE id =  " + id;
            const result = await this.app.mysql.query(sql)
            this.ctx.body={
                data:result
            }
    }
    async delArticle(){
        let id=this.ctx.params.id
        const result=await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={
            data:result
        }
    }
    async updateArticle(){
        let tmpArticle=this.ctx.request.body
        const request=await this.app.mysql.update('article',tmpArticle)
        const updateSuccess = request.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }

    }
    async addArticle(){
        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}
module.exports=ArticleController;