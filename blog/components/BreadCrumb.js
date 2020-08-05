import React from 'react'
import {Breadcrumb,Divider} from 'antd'
import '../static/style/components/breadcrumb.css'

const BreadCrumb=(props)=>{
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
	    		<Breadcrumb.Item>{props.name}</Breadcrumb.Item>
	    	</Breadcrumb>
	    	<Divider/>
    	</>
	)
}
export default BreadCrumb