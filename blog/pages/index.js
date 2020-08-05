import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import {Row,Col,Affix} from 'antd'

import Header from '../components/Header.js'
import Lists from '../components/Lists.js'
import Notice from '../components/Notice.js'
import Footer from '../components/Footer.js'
import Author from '../components/Author.js'
import LifeItem from '../components/LifeItem.js'

import Resources from '../components/Resources.js'
import servicePath from '../cofig/apiUrl.js'

import Link from 'next/link'

const Home=(props)=>{
  return(
  <>
    <Head>
      <title>blog</title>
    </Head>
    <Affix offsetTop={0}>
      <Header path="/" />
    </Affix>
    <Row className="comm-main" type="flex" justify="center">
      <Col  xs={24} sm={24} md={16} lg={17} xl={15}  >
          <div className="comm-box">
            <div className="box-title">技术分享</div>
            <Lists data={props.article.data} type="/article"/>
            <div className="box-footer">
              <Link href={{pathname:'/article'}}>
                <a>
                  查看全部>
                </a>
              </Link>
            </div>
          </div>
          <div className="comm-box">
            <div className="box-title">项目Demo</div>
            <Lists data={props.demo.data} type="/demo"/>
            <div className="box-footer">
              <Link href={{pathname:'/demo'}}>
                <a>
                  查看全部>
                </a>
              </Link>
            </div>
          </div>
          <div className="comm-box">
            <div className="box-title">心得体会</div>
            <Lists data={props.book.data} type="/book"/>
            <div className="box-footer">
              <Link href={{pathname:'/book'}}>
                <a>
                  查看全部>
                </a>
              </Link>
            </div>
          </div>
          <div className="comm-box">
            <div className="box-title">生活琐事</div>
            <LifeItem  data={props.life.data} />
            <div className="box-footer">
              <Link href={{pathname:'/life'}}>
                  <a>
                  查看全部>
                  </a>
              </Link>
            </div>
          </div>

      </Col>

      <Col   xs={0} sm={0} md={7} lg={6} xl={5}>
        <Author className="comm-box" />
        <Affix offsetTop={55}>
          <Notice />
          <Resources/>
        </Affix>
        
      </Col>
    </Row>
    <Footer/>
  </>
     
)}

Home.getInitialProps = async()=>{
  const promise=new Promise((resolve)=>{
    axios.all([axios(servicePath.getArticleNew),axios(servicePath.getDemoNew),axios(servicePath.getBookNew),axios(servicePath.getLifeNew)]).then(
      axios.spread((article,demo,book,life)=>{
        let res={}
        res['article']=article.data
        res['demo']=demo.data
        res['book']=book.data
        res['life']=life.data
        resolve(res)
      })
    )
  })
  return await promise
}

export default Home;












