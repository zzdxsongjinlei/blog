import React,{useState,useEffect} from 'react';
import { Table,List,Tag ,Row ,Col , Modal ,message ,Button} from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'
import formatDate from '../../config/formatDate.js'

import  servicePath  from '../../config/apiUrl.js'
const { confirm } = Modal;

function ResourcesList(props){

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

            }else if(res.data.data==='已成功登陆'){
                axios(servicePath.getResourcesList).then(res=>{
                
                    let dataSource=res.data.data.map((item,index)=>{
                        let data={};
                        data['id']=item['id']
                        data['title']=item['title'];
                        data['add_time']=formatDate(item['add_time'])
                        data['btn']=['Edit','Del']
                        data['key']=index
                        return data
                    })
                    setList(dataSource)

                })

            }


        })

    	
    }

    const delResources=(id)=>{
	    confirm({
	        title: '确定要删除这个外部资源吗?',
	        content: '如果你点击OK按钮，外部资源将会永远被删除，无法恢复。',
	        onOk() {
	            axios(servicePath.delResources+id).then(
	                res=>{ 
	                    message.success('外部资源删除成功')
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
                <Link to={"/resources/edit?id="+record.id}>
                    <a>
                        {text}
                    </a>
                </Link >
            )

        }
      },
      {
        title: '添加时间',
        dataIndex: 'add_time',
        key: 'add_time',
      },
      
      {
        title: '操作',
        dataIndex: 'btn',
        key: 'btn',
        render:(btn,record)=>(
            <>
                <Button type="primary" style={{margin:' 0px 10px 10px 0px'}}>
                    <Link to={"/resources/edit?id="+record.id}  >
                        <a style={{color:"#fff"}}>
                            {btn[0]}
                        </a>
                    </Link>
                </Button>
                <Button type="primary" danger onClick={()=>{delResources(record.id)}}>
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
export default ResourcesList