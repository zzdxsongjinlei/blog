import React,{useState,useEffect} from 'react';
import { Table,List,Tag ,Row ,Col , Modal ,message ,Button} from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'
import formatDate from '../../config/formatDate.js'

import  servicePath  from '../../config/apiUrl.js'
const { confirm } = Modal;

function LifeList(props){
    const [list,setList]=useState([])
    

    const getList=()=>{



        let dataProps={openId:localStorage.getItem('openId')}
        axios({
              method:'post',
              url:servicePath.checkIsLogin,
              data:dataProps,
              withCredentials: true
        }).then((res)=>{
            if(res.data.status===401){
                message.error(res.data.data)
                props.history.push('/login')

            } else if(res.data.data==='已成功登陆'){


                axios(servicePath.getLifeList).then(res=>{
                    let dataSource=res.data.data.map((item,index)=>{
                        let data={};
                        data['id']=item['id']
                        data['title']=item['title'];
                        data['add_time']=formatDate(item['add_time'])
                        data['view_count']=item['view_count']
                        data['img']=item['img']
                        data['place']=item['place']
                        data['btn']=['Edit','Del']
                        data['key']=index
                        return data
                    })
                    setList(dataSource)
                })
            }

        })



    	
    }

    const delLife=(id)=>{
	    confirm({
	        title: '确定要删除这篇公告吗?',
	        content: '如果你点击OK按钮，公告将会永远被删除，无法恢复。',
	        onOk() {
	            axios(servicePath.delLife+id).then(
	                res=>{ 
	                    message.success('公告删除成功')
	                    getList()
	                }
	           )
	        },
	        onCancel() {
	            message.success('没有任何改变')
	        },
	     });
    }
    const paginationProps={
        showSizeChange:true,
        showQuickJumper:false,
        pageSize:5,
    }
    useEffect(()=>{
    	getList()
    },[])


    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render:(text,record)=>{
            return(
                <Link to={"/life/edit?id="+record.id}>
                    <a>
                        {text}
                    </a>
                </Link >
            )

        }
      },
      {
        title: '图片',
        dataIndex: 'img',
        key: 'img',
        render:(text,record)=>{
            return(
                <>
                    <img src={text} style={{width:"40px"}}/>
                </>
          )

        }

      },
      {
        title: '添加时间',
        dataIndex: 'add_time',
        key: 'add_time',
      },
      {
        title:'地点',
        dataIndex:'place',
        key:'place',
        render:(text,record)=>{
            return(
                <>
                    {text}
                </>   
            )
        }
      },
      {
        title: '观看量',
        dataIndex: 'view_count',
        key: 'view_count',
      },
      
      {
        title: '操作',
        dataIndex: 'btn',
        key: 'btn',
        render:(btn,record)=>(
            <>
                <Button type="primary" style={{margin:' 0px 10px 10px 0px'}}>
                    <Link to={"/life/edit?id="+record.id}  >
                        <a style={{color:"#fff"}}>
                            {btn[0]}
                        </a>
                    </Link>
                </Button>
                <Button type="primary" danger onClick={()=>{delLife(record.id)}}>
                    {btn[1]}
                </Button>

            </>  
        ) 
      }
    ];

    return (
        <Table dataSource={list} columns={columns} pagination={paginationProps}/>   
    )
}
export default LifeList