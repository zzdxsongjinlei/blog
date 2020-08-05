import React from 'react'
import {withRouter} from 'react-router-dom'
import {Breadcrumb} from 'antd'
import 'antd/dist/antd.css'
import BreadcrumbNameMap from '../utils/BreadcrumbNameMap.js'

import '../static/style/component/breadcrumb.css'


function BreadCrumb(props){
    const {location}=props
    console.log(location)
    const paths=(location.pathname.split('/')).filter(i=>i)
    const extraItems=paths.map((_,index)=>{
      const url="/"+paths.slice(0,index+1).join('/')
      return(
        <Breadcrumb.Item key={'str'+index}>
        	  { BreadcrumbNameMap[url][1] }
     		    { BreadcrumbNameMap[url][0] }
        </Breadcrumb.Item>
      )
    })
    const items=[
      <Breadcrumb.Item key="index">
        <a href="/">首页</a>
      </Breadcrumb.Item>
    ].concat(extraItems)
	return(
	<Breadcrumb style={{margin:'14px 28px' }}>
		{items}
	</Breadcrumb>	
	)
}

export default withRouter(BreadCrumb) 