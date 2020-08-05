import React from 'react'
import axios from 'axios'
import serverPath from '../cofig/apiUrl.js'
import Head from 'next/head'
import LifeItem from '../components/LifeItem.js'
import { Row,Col} from 'antd'
import ArticleList from '../components/ArticleList.js'

import BreadCrumb from '../components/BreadCrumb.js'
import Header from '../components/Header.js'
import Author from '../components/Author.js'

import Footer from '../components/Footer.js'


const Life=(props)=>{ 
    return(
      <>
        <Head>
          <title>生活琐事</title>
        </Head>
        <Header path={props.url.pathname}/>
        
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-box" xs={24} sm={24} md={16} lg={17} xl={15}  >
              <BreadCrumb name='生活琐事'/>                
              <LifeItem data={props.life.data}/>
          </Col>
          <Col xs={0} sm={0} md={7} lg={6} xl={5} >
            <Author className="comm-box" />

            <ArticleList className="comm-box" data={props.book.data} type="/book" name="最新体会"/ >
            <ArticleList className="comm-box" data={props.demo.data} type="/demo" name="最新Demo"/ >
            <ArticleList className="comm-box" data={props.article.data} type="/article" name="最新分享"/ >


          </Col>
        </Row>
        <Footer/>
      </>
  )  
} 

Life.getInitialProps=async()=>{
  const promise=new Promise((resolve)=>{
    axios.all([axios(serverPath.getLifeList),axios(serverPath.getBookNew5),axios(serverPath.getDemoNew5),axios(serverPath.getArticleNew5)]).then(
      axios.spread((life,book,demo,article)=>{
        let res={};
        res['life']=life.data
        res['book']=book.data;
        res['demo']=demo.data;
        res['article']=article.data;
        resolve(res)
      })
    )
  })
  return await promise
} 

export default Life;