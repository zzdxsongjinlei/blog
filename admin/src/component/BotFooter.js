import React from 'react'
import servicePath from '../config/apiUrl.js'
import axios from 'axios'
class BotFooter extends React.Component{
	constructor(props){
		super(props)
		this.state={date:0}
	}
	componentDidMount(){
		new Promise(function(resolve,reject){
			axios(servicePath.getWebTime).then(res=>{
				const web_time=res.data.data[0].add_time;
				resolve(web_time)
			})
		}).then((res)=>{
			this.timerID=setInterval(()=>{
				this.setState({date:(new Date()).getTime()-res})
			},1000)
		})
	}
	componentWillUnmount(){
		clearTimeout(this.timerID)
	}
	formatTime(now_time){	
			let day = Math.floor((now_time / 1000 / 3600) / 24);
         	let hour = Math.floor((now_time / 1000 / 3600) % 24);
         	let minute = Math.floor((now_time / 1000 / 60) % 60);
         	let second = Math.floor(now_time / 1000 % 60);
            let obj={
         		day:day,
             	hour:hour < 10 ? "0" + hour : hour,
             	minute:minute < 10 ? "0" + minute : minute,
             	second:second < 10 ? "0" + second : second
         	}
    
         	let obj1={
         		day:obj.day > 0 ? obj.day + '天' : '',
         		hour:obj.hour> 0 ? obj.hour + '小时' : '',
         		minute:obj.minute > 0 ? obj.minute +'分':'',
         		second:obj.second > 0 ? obj.second + '秒' : ''
         	}

         	return obj1.day+obj1.hour+obj1.minute+obj1.second
	}
	render(){
		return(
			<>
					
		          
		            <div>该网站已经持续运行{this.formatTime(this.state.date)}</div>
				
			</>
				   
		)

	}

	
}
export default BotFooter