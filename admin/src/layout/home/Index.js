import React,{useState,useEffect} from 'react'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import { Row, Col,message } from 'antd';
import '../../static/style/layout/home/index.css'


import { BookTwoTone,FlagTwoTone,ProfileTwoTone,BuildTwoTone,VideoCameraTwoTone } from '@ant-design/icons';
function Home(props){
  const [article,setArticle]=useState([])
  const [demo,setDemo]=useState([])
  const [resources,setResources]=useState([])
  const [notice,setNotice]=useState({})
  const [book,setBook]=useState([])
  const [life,setLife]=useState([])
  const [webcount,setWebCount]=useState({})

  useEffect(function(){

        let dataProps={openId:localStorage.getItem('openId')}
        axios({
              method:'post',
              url:servicePath.checkIsLogin,
              data:dataProps,
              withCredentials: true
        }).then((res)=>{
       
            if(res.data.status===401){
                message.error(res.data.data)
                props.history.push('/login')

            } else if(res.data.data==='已成功登陆'){
              

              axios(servicePath.getArticleList).then(res=>{ 
                  setArticle(res.data.data) 
              })

              axios(servicePath.getDemoList).then(res=>{
                  setDemo(res.data.data)
              })
              axios(servicePath.getResourcesList).then(res=>{
               
                  setResources(res.data.data) 
              })

              axios(servicePath.getNoticeList).then(res=>{
                  setNotice(res.data.data[0])
              })
              axios(servicePath.getLifeList).then(res=>{
                  setLife(res.data.data)
              })
              axios(servicePath.getBookList).then(res=>{
                
                  setBook(res.data.data) 
              })
              axios(servicePath.getWebCount).then(res=>{
                
                setWebCount(res.data.data[0])
               
              })     


            }

        })








      
    }
  ,[])
  return (
    <>
      <Row  style={{minWidth:"500px"}}>
        <Col xs={{span:16,offset:1}} sm={{span:16,offset:1}} md={{span:14,offset:1}} lg={{span:14,offset:1}} xl={{span:12,offset:1}} xxl={{span:12,offset:1}}>
          <div className="box_h">站点相关数据</div>
          <div className="box_content">
            <div className="box">
              <ProfileTwoTone  className="box_icon" twoToneColor="#F44455"/>
              <div>
                <p>分享方面</p>
                <p>{article.length}</p>
              </div>
            </div>
            <div className="box">

              <BuildTwoTone className="box_icon" twoToneColor="#6cc788"/>
              <div>
                <p>Demo方面</p>
                <p>{demo.length}</p>
              </div>
            </div>
            <div className="box">
              <VideoCameraTwoTone twoToneColor="#eb2f96" className="box_icon"/>
              <div>
                <p>琐事方面</p>
                <p>{life.length}</p>
              </div>
            </div>
            <div className="box">
              <FlagTwoTone  twoToneColor="#1890ff" className="box_icon"/>
              <div>
                <p>资源方面</p>
                <p>{resources.length}</p>
              </div>
            </div>
            <div className="box">
              <BookTwoTone className="box_icon" twoToneColor="#6887ff" />
           
              <div>
                <p>体会方面</p>
                <p>{book.length}</p>
              </div>
            </div>
            <div className="box">
              <FlagTwoTone   className="box_icon" twoToneColor="#40a9ff"/>
              <div>
                <p>网站访问量</p>
                <p>{webcount.web_count}</p>
              </div>
            </div>
          </div>


        </Col>

        <Col xs={{span:6,offset:1}}  sm={{span:6,offset:1}} md={{span:8,offset:1}} lg={{span:8,offset:1}} xl={{span:10,offset:1}} xxl={{span:10,offset:1}}>
          <div className="box_h">站内公告</div>
          <div className="box_notice">
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
          </div>
          
        </Col>
        

      </Row>
    </>
  )
}




export default  Home

