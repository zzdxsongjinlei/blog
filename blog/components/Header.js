import React,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../cofig/apiUrl.js'
import '../static/style/components/header.css'
import {Col,Row,Menu} from 'antd'
import {HomeFilled,SmileFilled,BookFilled,StarFilled,SettingOutlined} from '@ant-design/icons'
const {SubMenu} =Menu
const Header=(props)=>{
    const [current,setCurrent]=useState(props.path)
    const handleClick=(e)=>{
        Router.push(e.key)
    }
    useEffect(()=>{
        setCurrent(props.path)
    },[]) 
    return(
        <div className="header">
            <Row type="flex" justify="center">
                <Col  xs={19} sm={19} md={9} lg={11} xl={9}>
                    <img  className="header-logo" src={"../static/img/img.jpeg"}/>
                    <span className="header-txt">正在探索前端，希望未来能帮助更多的人。</span>
                </Col>
                <Col className="memu-div" xs={5} sm={5} md={14} lg={12} xl={11}>
                    <Menu  mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
                        <Menu.Item key="/" icon={<HomeFilled />}>
                            博客首页
                        </Menu.Item>
                        <Menu.Item key="/demo" icon={<SettingOutlined />}>
                            项目Demo
                        </Menu.Item>
                        <Menu.Item key="/article" icon={<StarFilled />}>
                            技术分享
                        </Menu.Item>
                        <Menu.Item key="/book" icon={<BookFilled />}>
                            心得体会
                        </Menu.Item>
                        <Menu.Item key="/life" icon={<SmileFilled />}>
                            生活琐事
                        </Menu.Item>    
                        
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header










