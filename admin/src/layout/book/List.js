import React,{useState,useEffect} from 'react';
import { Table,List,Tag ,Row ,Col , Modal ,message ,Button} from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'

import formatDate from '../../config/formatDate.js'

import  servicePath  from '../../config/apiUrl.js'
const { confirm } = Modal;

function BookList(props){


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

                axios(servicePath.getBookList).then(res=>{


                    let dataSource=res.data.data.map((item,index)=>{
                        let data={};
                        data['id']=item['id']
                        data['hold']=item['hold']
                        data['title']=item['title'];
                        data['add_time']=formatDate(item['add_time'])
                        data['view_count']=item['view_count']
                        data['tag']=item['tag'].split(',')
                        data['btn']=['Edit','Del']
                        data['key']=index
                        return data
                    })
                    setList(dataSource)

                    
                })



            } 


        })

    	
    }


    const delBook=(id)=>{
	    confirm({
	        title: '确定要删除这篇博客文章吗?',
	        content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
	        onOk() {
	            axios(servicePath.delBook+id).then(
	                res=>{ 
	                    message.success('文章删除成功')
	                    getList()
	                }
	           )
	        },
	        onCancel() {
	            message.success('没有任何改变')
	        },
	     });
    }
    useEffect(()=>{
    	getList()

    },[])
    const paginationProps={
        showSizeChange:true,
        showQuickJumper:false,
        pageSize:5,
    }


    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render:(text,record)=>{
            return(
                <Link to={"/book/edit?id="+record.id}>
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
        title: '观看量',
        dataIndex: 'view_count',
        key: 'view_count',
      },
      {
        title:'状态',
        dataIndex:'hold',
        key:'hold',
        render:hold=>(
            <>
                { hold ===  1  ? '已发布':'暂存'}
            </>
        )
      },
      {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
        render:tag=>(
            <>
                {
                    tag.map((item,index)=>{
                        let tagcolor=['magenta','gold','red','cyan','volcano','orange','lime','green','blue','geekblue','purple']
                        return (
                            <Tag color={tagcolor[index]} key={index} style={{margin:' 0 10px 10px 0'}}>
                                {item}
                            </Tag>
                        )

                    })
                }
            </>
        )
      },
      {
        title: '操作',
        dataIndex: 'btn',
        key: 'btn',
        render:(btn,record)=>(
            <>
                <Button type="primary" style={{margin:' 0px 10px 10px 0px'}}>
                    <Link to={"/book/edit?id="+record.id}  >
                        <a style={{color:"#fff"}}>
                            {btn[0]}
                        </a>
                    </Link>
                </Button>
                <Button type="primary" danger onClick={()=>{delBook(record.id)}}>
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
export default BookList