const Controller =require('egg').Controller
class LifeController extends Controller{
    async getLifeList(){
    	let sql='SELECT * FROM life order by add_time desc'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
        	data:result
        }
    }
    async getLifeNew(){
        let sql='SELECT * FROM life order by add_time desc limit 4'
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async getLifeById(){
        let id=this.ctx.params.id
        let sql= 'SELECT * FROM life  WHERE id = '+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }
    async updateLifeCount(){
        let id=this.ctx.params.id
        let sql='UPDATE life SET view_count = view_count + 1 WHERE id = '+id
        const result=await this.app.mysql.query(sql)
        this.ctx.body={
            data:result
        }
    }  
}

module.exports=LifeController;