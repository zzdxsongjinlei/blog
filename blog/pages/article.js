import React from 'react'
import axios from 'axios'
import serverPath from '../cofig/apiUrl.js'
import Head from 'next/head'

import { Row,Col } from 'antd'
import ArticleList from '../components/ArticleList.js'

import BreadCrumb from '../components/BreadCrumb.js'
import Lists from '../components/Lists.js'
import Header from '../components/Header.js'
import Author from '../components/Author.js'

import Footer from '../components/Footer.js'

const Article=(props)=>{ 
    return(
      <>
        <Head>
          <title>技术分享</title>
        </Head>

        <Header path={props.url.pathname} />

        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-box" xs={24} sm={24} md={16} lg={17} xl={15}  >
              <BreadCrumb name='技术分享'/>                
              <Lists data={props.article.data} type={props.url.pathname} />
          </Col>
          <Col  xs={0} sm={0} md={7} lg={6} xl={5}>
            <Author className="comm-box" />

            <ArticleList className="comm-box" data={props.hot.data}  type="/article" name="最热分享"/ >
            <ArticleList className="comm-box" data={props.demo.data} type="/demo" name="最新Demo"/ >
            <ArticleList className="comm-box" data={props.book.data}  type="/book" name="最新体会"/ >
            
          </Col>
        </Row>
        <Footer/>
      </>
  )  
} 


Article.getInitialProps=async()=>{
  const promise=new Promise((resolve)=>{
    axios.all([axios(serverPath.getArticleList),axios(serverPath.getArticleHot),axios(serverPath.getDemoNew5),axios(serverPath.getBookNew5)]).then(
      axios.spread((article,hot,demo,book)=>{
        let res={};
        res['article']=article.data;
        res['hot']=hot.data;
        res['demo']=demo.data;
        res['book']=book.data;
        resolve(res)
      })
    )
  })
  return await promise
} 
  
export default Article;