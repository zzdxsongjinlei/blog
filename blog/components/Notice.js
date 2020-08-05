import React,{useState,useEffect} from 'react'
import axios from 'axios'
import serverPath from '../cofig/apiUrl.js'
import { Divider,Tabs } from 'antd'

import '../static/style/components/notice.css'
const {TabPane} =Tabs

 const Notice = ()=>{
 	let [notice,setNotice]=useState({})
 	const getData=()=>{
 		axios(serverPath.getNotice).then(res=>{
 			setNotice(res.data[0])
 		})
 	}
 	useEffect(function(){
 		getData()

 	},[])
    return (
        <div  className="comm-box notice">
        	<Divider>站内公告</Divider>
        	
        	<Tabs >
        		<TabPane tab={notice.title} key="3">
        			<div>{notice.content}</div>
			      	
			    </TabPane>
			    <TabPane tab="QQ" key="1">

			      	<div>enheng</div>
			      	<img src="../static/img/qq.jpg"/>
			    </TabPane>
			    <TabPane tab="微信" key="2">
			    	
			    	<div>Content of tab 2</div>
			    	<img src="../static/img/weixin.jpg"/>
			    </TabPane>
			    
			</Tabs>
        </div>
    )
 }

 export default Notice













