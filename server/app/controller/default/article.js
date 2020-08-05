const Controller =require('egg').Controller
class ArticleController extends Controller{  
    async getArticleList(){
    	let sql='SELECT * FROM article  WHERE hold = 1 order by add_time desc';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
        	data:result
        }
    }
    async getArticleNew(){
        let sql='SELECT * FROM article  WHERE hold = 1 order by add_time desc limit 2';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getArticleById(){
    	let id=this.ctx.params.id;
    	let sql='SELECT * FROM  article WHERE hold = 1 AND  id= '+id
	    const result=await this.app.mysql.query(sql)
	    this.ctx.body={
            data:result
        }
    }
    async updateArticleCount(){
        let id=this.ctx.params.id
        let sql='UPDATE article SET view_count = view_count + 1  WHERE hold = 1 AND  id = '+id
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getArticleNew5(){
        let sql='SELECT * FROM article WHERE hold = 1 order by add_time desc limit 5';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getArticleHot(){
        let sql='SELECT * FROM article  WHERE hold = 1 order by view_count  desc limit 5';
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    
}
module.exports=ArticleController;