import React,{useState,useEffect} from 'react'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js' 
import {Form,Input,Button,Checkbox,message} from 'antd'


function Edit(props){
	const layout={
		labelCol:{
			span:6
		},
		wrapperCol:{
			span:12
		}
	}
	const tailLayout={
		wrapperCol:{
			offset:10,
			span:10
		}

	}
	let [form] =Form.useForm()
	let [flag,setFlag]=useState(1)
	let [noticeList,setNoticeList]=useState({})

	const getNotice=(id)=>{



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
		        axios(servicePath.getNoticeById+id).then(res=>{
					setNoticeList(res.data.data[0])
					form.setFieldsValue({
						title:res.data.data[0].title,
						content:res.data.data[0].content
					})		
				})
            } 

        })


		
	}

	const onFinish=values=>{
		let initData=()=>{
			let dataProps={} 
			dataProps.id=noticeList.id  
		    dataProps.title = values.title
		    dataProps.content =values.content
		    dataProps.add_time=(new Date).getTime()
	    	dataProps.hold=1
	    	dataProps.author="zzdxsongjinlei"
	    	return dataProps
		}
		if(flag===0){
			setFlag(1)
			const dataProps=initData()
			dataProps.hold=0
	        axios({method:'post',
	            url:servicePath.updateNotice,
	            data:dataProps
	        }).then(
	            res=>{
	                if(res.data.isScuccess){
	                    message.success('公告暂存成功')
	                }else{
	                    message.error('公告暂存失败');
	                }

	            }
	        )

		}else if(flag===1){
			
		    const dataProps=initData()
	        axios({method:'post',
	            url:servicePath.updateNotice,
	            data:dataProps
	        }).then(
	            res=>{
	                if(res.data.isScuccess){
	                    message.success('公告公布成功')
	                }else{
	                    message.error('公告公布失败');
	                }

	            }
	        )
		}

	}

	const onFinishFailed=errorInfo=>{
		message.error('出现了一些意外')
	}
	useEffect(()=>{
		let id=props.location.search.split('=')[1]
		getNotice(id)
	},[])
	if(!props.location.search){
		message.warning('未选中公告，将返回公告列表',1,()=>{
			props.history.push('/notice/list')
		})
		return  null;
	}
	return(
		<>		
			<Form 
				form={form}

				{...layout}
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>

				<Form.Item {...tailLayout}>
			        <span >修改公告</span>

			    </Form.Item>

				<Form.Item
					label="公告标题"
					name="title"
					
					rules={[
						{
				            required: true,
				            message: '请输入公告标题!',
				        },

					]}
				>
				
					<Input    />
				</Form.Item>
				<Form.Item
			        label="公告内容"
			        name="content"
			      
			        rules={[
			          {
			            required: true,
			            message: '请输入公告内容',
			          },
			        ]}
			    >
			        <Input.TextArea   />

			    </Form.Item>
			    <Form.Item {...tailLayout}>
			        <Button  htmlType="submit" style={{margin:"0px 15px 0px -40px"}}  onClick={()=>{setFlag(0)}}>
			          暂存公告
			        </Button>
			        <Button type="primary" htmlType="submit" >
			          提交公告
			        </Button>
			    </Form.Item>
			    
			</Form>
		</>
	)
}
export default Edit