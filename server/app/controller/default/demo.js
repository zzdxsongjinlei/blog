const Controller =require('egg').Controller
class DemoController extends Controller{
    async getDemoList(){
    	let sql='SELECT * FROM demo  WHERE hold = 1 order by add_time desc'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
        	data:result
        }
    }
    async getDemoNew(){
        let sql='SELECT * FROM demo  WHERE hold = 1 order by add_time desc limit 2'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getDemoById(){
        let id=this.ctx.params.id
        let sql= 'SELECT * FROM demo WHERE hold = 1 AND   id = '+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async updateDemoCount(){
        let id=this.ctx.params.id
        let sql='UPDATE demo SET view_count = view_count + 1  WHERE hold = 1 AND  id = '+id
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getDemoNew5(){
        let sql='SELECT * FROM demo WHERE hold = 1 order by add_time desc limit 5'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    } 
    async getDemoHot(){
        let sql='SELECT * FROM demo WHERE hold = 1 order by view_count desc limit 5'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    } 
}
module.exports=DemoController;