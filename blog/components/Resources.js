import React,{useState,useEffect} from 'react'
import { Divider,List} from 'antd'
import axios from 'axios'
import serverPath from '../cofig/apiUrl.js'

import  '../static/style/components/resources.css'

 const Notice = ()=>{
 	const [list,setList]=useState([])
 	const getData=()=>{
 		axios(serverPath.getResources).then(res=>{
 			setList(res.data)
 			axios(serverPath.updateWebCount)
 		})
 	}
 	useEffect(()=>{
 		getData()
 	},[])
    return (
        <div  className="comm-box resources">
        	<Divider>站外资源</Divider>
	        <List
	          size="small"
	          dataSource={list}
	          renderItem={(item)=>(
	            <List.Item>
	                
	                  <a href={item.src}>{ item.title}</a>
	               
	            </List.Item>
	          )}
	        >
	        </List>
        	
        </div>
    )
 }

 export default Notice