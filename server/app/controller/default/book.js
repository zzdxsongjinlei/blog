const Controller =require('egg').Controller
class BookController extends Controller{
    async getBookList(){
    	let sql='SELECT * FROM book  WHERE hold = 1 order by add_time desc'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
        	data:result
        }
    }
    async getBookNew(){
        let sql='SELECT * FROM book WHERE hold = 1 order by add_time desc limit 2'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getBookById(){
        let id=this.ctx.params.id
        let sql= 'SELECT * FROM book WHERE hold = 1 AND   id = '+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async updateBookCount(){
        let id=this.ctx.params.id
        let sql='UPDATE book SET view_count = view_count + 1  WHERE hold = 1 AND  id = '+id
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getBookNew5(){
        let sql='SELECT * FROM book WHERE hold = 1  order by add_time desc limit 5'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getBookHot(){
        let sql='SELECT * FROM book WHERE hold = 1 order by view_count desc limit 5'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }   
}
module.exports=BookController;