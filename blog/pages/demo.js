import React from 'react'
import axios from 'axios'
import serverPath from '../cofig/apiUrl.js'

import Head from 'next/head'
import Lists from '../components/Lists.js'

import { Row,Col} from 'antd'
import ArticleList from '../components/ArticleList.js'

import BreadCrumb from '../components/BreadCrumb.js'
import Header from '../components/Header.js'
import Author from '../components/Author.js'

import Footer from '../components/Footer.js'
const Demo=(props)=>{ 
    return(
      <>
        <Head>
          <title>项目Demo</title>
        </Head>
       
        <Header path={props.url.pathname}/>

        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-box" xs={24} sm={24} md={16} lg={17} xl={15}  >
              <BreadCrumb name='项目Demo'/>                
              <Lists data={props.demo.data} type={props.url.pathname} />
          </Col>
          <Col  xs={0} sm={0} md={7} lg={6} xl={5}>
            <Author className="comm-box" />
            <ArticleList className="comm-box" data={props.hot.data} type="/demo" name="最热Demo"/ >
            <ArticleList className="comm-box" data={props.article.data} type="/article" name="最新分享"/ >
            <ArticleList className="comm-box" data={props.book.data}  type="/book" name="最新体会"/ >

          </Col>
        </Row>
        <Footer/>
      </>
  )  
} 



Demo.getInitialProps=async()=>{
  const promise=new Promise((resolve)=>{
    axios.all([axios(serverPath.getDemoList),axios(serverPath.getDemoHot),axios(serverPath.getArticleNew5),axios(serverPath.getBookNew5)]).then(
      axios.spread((demo,hot,article,book)=>{
        let res={};
        res['demo']=demo.data;
        res['hot']=hot.data;
        res['article']=article.data;
        res['book']=book.data;
        resolve(res)
      })
    )
  })
  return await promise
} 
export default Demo;