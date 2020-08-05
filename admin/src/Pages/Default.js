import SiderMenu from '../component/SiderMenu.js'
import TopHeader from '../component/TopHeader.js'
import BreadCrumb from '../component/BreadCrumb.js'
import {BrowserRouter as Router,Switch,Route,Redirect,Link} from 'react-router-dom'
import axios from 'axios'
import servicePath from '../config/apiUrl.js'

import { Layout, Menu, Breadcrumb } from 'antd';
import React,{useState,useEffect} from 'react'

import BreadcrumbNameMap from '../utils/BreadcrumbNameMap.js'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';



import '../static/style/pages/default.css'


import Home from '../layout/home/Index.js'
import BotFooter from '../component/BotFooter.js'

import ArticleList from '../layout/article/List.js'
import ArticleEdit from '../layout/article/Edit.js'
import ArticleAdd from '../layout/article/Add.js'

import BookList from '../layout/book/List.js'
import BookEdit from '../layout/book/Edit.js'
import BookAdd from '../layout/book/Add.js'

import DemoList from '../layout/demo/List.js'
import DemoEdit from '../layout/demo/Edit.js'
import DemoAdd from '../layout/demo/Add.js'

import LifeList from '../layout/life/List.js'
import LifeEdit from '../layout/life/Edit.js'
import LifeAdd from '../layout/life/Add.js'

import ResourcesList from '../layout/resources/List.js'
import ResourcesEdit from '../layout/resources/Edit.js'
import ResourcesAdd from '../layout/resources/Add.js'

import NoticeList from '../layout/notice/List.js'
import NoticeEdit from '../layout/notice/Edit.js'
import NoticeAdd from '../layout/notice/Add.js'

const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

function Default(props){
  const [collapsed,setCollapsed]=useState(false)
  const [useName,setUserName]=useState()

  const toggle=()=>{
    setCollapsed(!collapsed)
  }
  useEffect(function(){
      axios(servicePath.getWebTime).then(res=>{
       setUserName(res.data.data[0].author_name)

      })

  },[])
  return(
      <Layout style={{minHeight:'100vh'}}>

        <Sider trigger={null} collapsible collapsed={collapsed}  style={{overflow: 'auto',height: '100vh',position: 'fixed',left: 0 }}>
        	<div className="logo">
              <p style={{fontSize: !collapsed ? '14px' : '0px', textAlign:'center',color:"#fff" ,lineHeight:'30px'}}>欢迎您: &nbsp; &nbsp;{useName}</p>
          </div>
        	<SiderMenu/>
        </Sider>

        <Layout style={{ marginLeft:collapsed  ? '70px':'200px'}}>
          <TopHeader collapsed={collapsed} onClick={toggle} />
          <Content style={{margin:'0 16px'}}>
            <BreadCrumb/>
           
            <div style={{ padding: 24, background: '#fff', minHeight: 460 }}>

              <div>
              <Switch>
                  <Route path="/article/list" component = { ArticleList } />
                  <Route path="/article/edit" component = { ArticleEdit } />
                  <Route path="/article/add" component = { ArticleAdd } />


                  <Route path="/book/list" component = { BookList } />
                  <Route path="/book/edit" component = { BookEdit } />
                  <Route path="/book/add" component = { BookAdd } />


                  <Route path="/demo/list" component = { DemoList } />
                  <Route path="/demo/edit" component = { DemoEdit } />
                  <Route path="/demo/add" component = { DemoAdd } />


                  <Route path="/life/list" component = { LifeList } />
                  <Route path="/life/edit" component = { LifeEdit } />
                  <Route path="/life/add" component = { LifeAdd } />


                  <Route path="/notice/list" component = { NoticeList } />
                  <Route path="/notice/edit" component = { NoticeEdit } />
                  <Route path="/notice/add" component = { NoticeAdd } />

                  <Route path="/resources/list" component = { ResourcesList } />
                  <Route path="/resources/edit" component = { ResourcesEdit } />
                  <Route path="/resources/add" component = { ResourcesAdd } />

                  <Route path="/" exect  component = { Home } />


                  <Redirect to="*"  path="/" />
                
                </Switch>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
             <BotFooter  />
          </Footer>
        </Layout>
      </Layout>
      
    )
}
export default Default;