import {Avatar,Divider,Tooltip,Tag} from 'antd'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {GithubFilled,QqCircleFilled,WechatFilled} from '@ant-design/icons'
import serverPath from '../cofig/apiUrl.js'
import '../static/style/components/author.css'

const Author =(props)=>{
    const tagcolor=['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
    
    const [author,setAuthor]=useState([])
    const getAuthor=async()=>{
        axios(serverPath.getAuthor).then(res=>{
            setAuthor(res.data.data[0])
        })
    }
    useEffect(()=>{
        getAuthor()

    },[])

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src={author.author_img}  /></div>
            <div className="author-introduction">
                <div>{author.author_name}</div>
                <div>{author.author_introduce}</div>
                <div>

                    { author['author_tag']}
                </div>
               
                <Divider>社交账号</Divider>
                <Tooltip placement="topLeft" arrowPointAtCenter title="https://github.com/zzdxsongjinlei">
                    <a href="https://github.com/zzdxsongjinlei">
                        <Avatar size={28} icon={<GithubFilled/>} className="account"  />
                    </a>
                </Tooltip>
                <Tooltip placement="topLeft" arrowPointAtCenter title="1355798730">
                    <a href="https://im.qq.com">
                        <Avatar size={28} icon={<QqCircleFilled/>}  className="account" />
                    </a>
                </Tooltip>
                <Tooltip placement="topLeft" arrowPointAtCenter title="sjlyao1314">
                    <a href="https://wx.qq.com">
                        <Avatar size={28} icon={<WechatFilled/>}  className="account"  />
                    </a>
                </Tooltip>
                

            </div>
        </div>
    )

}
 
export default Author


