import React,{useState,useEffect} from 'react'
import '../static/style/components/footer.css'
import serverPath from '../cofig/apiUrl.js'
import axios from 'axios'

const Footer = ()=>{
	const [web_count,setWeb_count]=useState(0)
    const getWeb_count=()=>{
        axios(serverPath.getAuthor).then(res=>{
            setWeb_count(res.data.data[0].web_count) 
        })
    }
    useEffect(()=>{
        getWeb_count()
    },[])
	return(

		<div className="footer-div">
	        <div>系统由 React+Next+Ant Desgin驱动 </div>
	        
	        <div>该网站已经被访问{web_count}次</div>
	    </div>
	)
}
export default Footer