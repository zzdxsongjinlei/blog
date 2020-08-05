import React,{useState,useEffect} from 'react'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js' 
import {Form,Input,Button,message} from 'antd'


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

	let [resourcesList,setResourcesList]=useState({})

	const getResources=(id)=>{





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

		        axios(servicePath.getResourcesById+id).then(res=>{
					setResourcesList(res.data.data[0])
					form.setFieldsValue({
						title:res.data.data[0].title,
						content:res.data.data[0].content,
						src:res.data.data[0].src
					})	
					
				})
                
            }


        })



		
	}

	const onFinish=values=>{
			let dataProps={} 
			dataProps.id=resourcesList.id  
		    dataProps.title = values.title
		    dataProps.content =values.content
		    dataProps.src=values.src
		    dataProps.add_time=(new Date).getTime()
	    	
	        axios({method:'post',
	            url:servicePath.updateResources,
	            data:dataProps
	        }).then(
	            res=>{
	                if(res.data.isScuccess){
	                    message.success('资源发布成功')
	                }else{
	                    message.error('资源发布失败');
	                }

	            }
	        )

	}

	const onFinishFailed=errorInfo=>{
		message.error('出现了一些意外')
	}

	useEffect(()=>{
		let id=props.location.search.split('=')[1]
		getResources(id)
	},[])
	if(!props.location.search){
		message.warning('未选中外部资源，将返回外部资源列表',1,()=>{
			props.history.push('/resources/list')
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
			        <span >修改外部资源</span>

			    </Form.Item>

				<Form.Item
					label="外部资源标题"
					name="title"
					rules={[
						{
				            required: true,
				            message: '请输入外部资源标题!',
				        },
					]}
				>
				
					<Input    />
				</Form.Item>
				
				<Form.Item
			    	label="外部资源链接"
			        name="src"
			        rules={[
			          {
			            required: true,
			            message: '请输入外部资源链接',
			          },
			        ]}

			    >
			    	<Input/>
			    </Form.Item>

				<Form.Item
			        label="外部资源内容"
			        name="content"
			      
			        rules={[
			          {
			            required: true,
			            message: '请输入外部资源内容',
			          },
			        ]}
			    >
			        <Input   />

			    </Form.Item>

			    <Form.Item {...tailLayout}>
			        <Button type="primary" htmlType="submit" >
			          提交资源
			        </Button>
			    </Form.Item>
			    
			</Form>
		</>
	)
}
export default Edit