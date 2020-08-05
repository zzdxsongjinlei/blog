import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'

import {Row,Col,Breadcrumb} from 'antd'
import {CalendarFilled,FolderFilled,FireFilled} from '@ant-design/icons'
import BreadCrumb from '../components/BreadCrumb.js'
import formatDate from '../cofig/formatDate.js'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import axios from 'axios'

import Author from '../components/Author.js'

import Footer from '../components/Footer.js'

import '../static/style/pages/lifeDetail.css'
import servicePath from '../cofig/apiUrl.js'



const lifeDetailed=(life)=>{


const renderer = new marked.Renderer();
marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

});

renderer.heading=function(text,level,raw){
  const anchor = tocify.add(text, level);
  return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
}

const markdown=marked(life.introduce)
return(
    <>
      <Head>
        <title>lifeDetailed</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-box" xs={24} sm={24} md={16} lg={17} xl={15}  >

          <div className="life_detail">   
            <div className="box-title">生活琐事详情</div>
            <div  className="life_detail_main clear">
              <img src={life.img} className="life_detail_img"/>
              <div className="life_detail_content">
                  <div className="life_detail_title"> {life.title}</div>
                  <div className="life_detail_icon">
                    <span><CalendarFilled/>{formatDate(life.add_time)}</span>
                    <span><FolderFilled/>{life.place}</span>
                    <span><FireFilled/>{life.view_count}</span>
                  </div>
                  <div className="life_detail_c" dangerouslySetInnerHTML={{__html:markdown}}>
                  </div>
              </div>
            </div>
          </div>
          
        </Col>
        <Col className="comm-box" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author/> 
        </Col>
      </Row>
      <Footer/>
    </>  
  )
}

lifeDetailed.getInitialProps=async(context)=>{
  let id=context.query.id;
  const promise=new Promise((resolve)=>{
    axios(servicePath.getLifeById+id).then(
      (res)=>{
        axios(servicePath.updateLifeCount+id)
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default lifeDetailed;