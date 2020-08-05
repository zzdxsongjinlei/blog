import React,{useState} from 'react'
import {Menu} from 'antd'
import 'antd/dist/antd.css'
import menus from '../utils/menu.js'
import {withRouter} from 'react-router-dom'

const {SubMenu} =Menu


function SiderMenu(props){
  const rootSubmenuKeys=['/home','/article','/demo','/book','/life','/resources','/notice']
  let pathname=props.location.pathname
  let selectKey=[pathname]
  let openKey=['/'+pathname.split('/')[1]]
  const [openKeys,setOpenKeys]=useState(['/'+pathname.split('/')[1]])

  const onOpenChange=(open)=>{
    const latesOpenKey=open.find(key=>openKeys.indexOf(key)===-1);
    if(rootSubmenuKeys.indexOf(latesOpenKey)===-1){
      setOpenKeys(open)
    }else{
      setOpenKeys(latesOpenKey?[latesOpenKey]:[])
    }
  }
  const renderItem=(menus)=>{
      return menus.map(item=>{
        if(item.children){
          return (
            <SubMenu key={item.path} icon={<item.icon/>} title={item.title}>
              {renderItem(item.children)}
            </SubMenu>
          )
        }
        else{
          return(
            <Menu.Item key={item.path} icon={<item.icon/>}>
              {item.title}
            </Menu.Item>
          )
        }
      })
  }

  return (
    <Menu
      onClick={(obj)=>{
        props.history.push(obj.key)
      }} 
      theme="dark" 
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      defaultSelectedKeys={selectKey}
      defaultOpenKeys={openKey}
    >
      {renderItem(menus)}
    </Menu>
  )

}

export default withRouter(SiderMenu)































