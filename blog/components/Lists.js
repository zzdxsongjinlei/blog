import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { List,Tag } from 'antd'

import formatDate from '../cofig/formatDate.js'

import {CalendarFilled,FolderFilled,FireFilled,RightOutlined,FileOutlined} from '@ant-design/icons'

import '../static/style/components/lists.css'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Lists=(props)=>{
  const [mylist,setMylist] = useState(props.data)
  const tagcolor=['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
  useEffect(()=>{
    setMylist(props.data)
  })

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  }); 
    return(
      <>
        <List 
          itemLayout="vertical"
          dataSource={mylist}

          renderItem={item=>(
            <List.Item className="clear">
              <div className="list-title">
                <Link href={{pathname:'/detailed',query:{id:item.id,type:props.type}}}>
                  <a>{item.title}</a>
                </Link>
              </div>
              <div className="list-icon">
                <span><CalendarFilled/>{formatDate(item.add_time)}</span>
                <span><FolderFilled/>{item.type_name}</span>
                <span><FireFilled/>{item.view_count}</span>
              </div>
              <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>

              </div>
              <div className="list-footer-tag">
                {(item['tag'].split(',')).map((it,index)=> <Tag key={index} color={tagcolor[Math.floor(Math.random()*11)]}>{it}</Tag>)}
              </div>
              <div className="list-footer">
                <FileOutlined/>
                <Link href={{pathname:'/detailed',query:{id:item.id,type:props.type}}}>
                  <a>查看全文 <RightOutlined/></a>
                </Link>
              </div>
            </List.Item>
          )}
        >
        </List>      
      </>
  )  
} 
export default Lists;