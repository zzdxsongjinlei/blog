import React,{useState,useEffect} from 'react'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js' 
import {Form,Input,Button,Checkbox,message} from 'antd'


function Add(props){
	let [flag,setFlag]=useState(1)
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
		let initData=()=>{
			let dataProps={}   
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
	            url:servicePath.addNotice,
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
	            url:servicePath.addNotice,
	            data:dataProps
	        }).then(
	            res=>{
	                if(res.data.isScuccess){
	                    message.success('公告发布成功')
	                }else{
	                    message.error('公告发布失败');
	                }

	            }
	        )
		}

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
				initialValues={{remember:true}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>

				<Form.Item {...tailLayout}>
			        <span >添加公告</span>

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
					<Input/>
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
			        <Input.TextArea />

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
export default Add














