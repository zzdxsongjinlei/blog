import React from 'react'
import {withRouter} from 'react-router-dom'
import {Layout,Menu,Dropdown,Avatar} from 'antd'
import 'antd/dist/antd.css'
import '../static/style/component/topheader.css'
import {UserOutlined, MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';

const { Header} = Layout;

function TopHeader(props){
     const	onHandleClick=function(){
     	localStorage.removeItem('openId')
     	props.history.push('/login')

	}
	const menu=(
		<Menu onClick={onHandleClick}>
			<Menu.Item>退出</Menu.Item>
		</Menu>
	)
	return(
	<>
		<Header className="site-layout-background" style={{background:'#fff',padding:0}}>
			<div className="collapsedbox">
				{ props.collapsed ? <MenuUnfoldOutlined onClick={props.onClick}/>:<MenuFoldOutlined onClick={props.onClick}/>}
			</div>
			<div className="avatorbox">
				<Dropdown overlay={menu} trigger={['click']}>
					<div onClick={e=>e.preventDefault()}>
						<Avatar size="small" icon={<UserOutlined/>}/>
					</div>
				</Dropdown>

			</div>
		</Header>
	</>
		   
    )
}
export default withRouter(TopHeader)

















