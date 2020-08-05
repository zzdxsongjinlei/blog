import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'

import {Row,Col,Breadcrumb,Affix,Tag} from 'antd'
import {CalendarFilled,FolderFilled,FireFilled} from '@ant-design/icons'
import BreadCrumb from '../components/BreadCrumb.js'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import axios from 'axios'

import Author from '../components/Author.js'
import formatDate from '../cofig/formatDate.js'

import Footer from '../components/Footer.js'
import Tocify from '../components/tocify.tsx'
import '../static/style/pages/detailed.css'
import servicePath from '../cofig/apiUrl.js'



const Detailed=(article)=>{
  let ty;
  if(article.type==='/demo'){
    ty='Demo详情'
  }else if(article.type==='/article'){
    ty='分享详情'
  }else if(article.type==='/book'){
    ty='体会详情'
  }
const [type,setType]=useState(ty)
const tagcolor=['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
const renderer=new marked.Renderer();
marked.setOptions({
  renderer:renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});
const tocify=new Tocify();


renderer.heading=function(text,level,raw){
  const anchor = tocify.add(text, level);
  return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
}

const markdown=marked(article.content)
return(
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-box" xs={24} sm={24} md={16} lg={17} xl={15}  >
          <div>   
            <div className="box-title">{type}</div>
            <div>
              <div className="list-title"> {article.title}</div>
              <div className="list-icon center">
                <span><CalendarFilled/>{formatDate(article.add_time)}</span>
                <span><FolderFilled/>{article.type_name}</span>
                <span><FireFilled/>{article.view_count}</span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{__html:markdown}}>
                
              </div>
              <div className="list-footer-tag">
                {(article['tag'].split(',')).map((it,index)=> <Tag key={index} color={tagcolor[Math.floor(Math.random()*11)]}>{it}</Tag>)}
              </div>
            </div>
          </div>
          
        </Col>
        <Col className="comm-box" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author className="comm-box" />

          <Affix offsetTop={5}>
            <div className="detailed-nav">
              <div className="nav-title">文章目录</div> 
              <div className="toc-list">{tocify&&tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </>  
  )
}
Detailed.getInitialProps=async(context)=>{
  let id=context.query.id;
  let type=context.query.type;
  var promise;
  if(type==='/demo'){
    promise=new Promise((resolve)=>{
      axios(servicePath.getDemoById+id).then(
        (res)=>{
          axios(servicePath.updateDemoCount+id)
           res.data.data[0].type='/demo'
          resolve(res.data.data[0])
        }
      )
    })
  }
  else if(type==='/article'){
    promise=new Promise((resolve)=>{
      axios(servicePath.getArticleById+id).then(
        (res)=>{
          axios(servicePath.updateArticleCount+id)
          res.data.data[0].type='/article'
          resolve(res.data.data[0])
        }
      )
    })
  }
  else if(type==='/book'){
    promise=new Promise((resolve)=>{
      axios(servicePath.getBookById+id).then(
        (res)=>{
          axios(servicePath.updateBookCount+id)
           res.data.data[0].type='/book'
          resolve(res.data.data[0])
        }
      )
    })
  }
  return await promise
}

export default Detailed;
































