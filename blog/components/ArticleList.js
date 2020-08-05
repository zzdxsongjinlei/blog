 import React from 'react'
 import {List,Divider} from 'antd'
 import Link from 'next/link'
 import '../static/style/components/articlelist.css'
 const ArticleList = (props)=>{
    return (
      <div className="articlelist comm-box">
        <Divider>{props.name}</Divider>
        <List
          size="small"
          dataSource={props.data}
          renderItem={(item,index)=>(
            <List.Item>
                <Link href={{pathname:'/detailed',query:{id:item.id,type:props.type}}}>
                  <a>{ item.title}</a>
                </Link>
            </List.Item>
          )}
        >
        </List>
      </div>
    )
 }
 export default ArticleList