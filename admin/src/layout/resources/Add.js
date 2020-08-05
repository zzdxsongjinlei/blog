import React,{useEffect} from 'react'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js' 
import {Form,Input,Button,message} from 'antd'

function Add(props){
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

	const onFinish=values=>{		
			let dataProps={}   
		    dataProps.title = values.title
		    dataProps.content =values.content
		    dataProps.src=values.src
		    dataProps.add_time=(new Date).getTime()

	        axios({method:'post',
	            url:servicePath.addResources,
	            data:dataProps
	        }).then(
	            res=>{
	                if(res.data.isScuccess){
	                    message.success('资源提交成功')
	                }else{
	                    message.error('资源提交失败');
	                }

	            }
	        )	

	}
	const onFinishFailed=errorInfo=>{
		message.error('出现了一些意外')
	}
	useEffect(function(){
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

            } 

        })

	},[])
	return(
		<>
			<Form 
				{...layout}
				name="basic"
				
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>

				<Form.Item {...tailLayout}>
			        <span >添加外部资源</span>

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
					<Input/>
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
			        <Input />

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
export default Add