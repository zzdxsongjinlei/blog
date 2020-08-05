import React,{useState,useEffect} from 'react'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js' 
import {Form,Input,Button,Checkbox,message,Upload} from 'antd'

import reqwest from 'reqwest'

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
	let [files,setFiles]=useState()

	let [lifeList,setLifeList]=useState({})

	const getLife=(id)=>{





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

		        axios(servicePath.getLifeById+id).then(res=>{
					
						setLifeList(res.data.data[0])

						form.setFieldsValue({
							title:res.data.data[0].title,
							introduce:res.data.data[0].introduce,
							place:res.data.data[0].place
						})
					
				})

            }

        })

		
	}

	const beforeUpload=(file)=> {
	      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	      if (!isJpgOrPng) {
	        message.error('You can only upload JPG/PNG file!');
	      }
	      const isLt2M = file.size / 1024 / 1024 < 2;
	      if (!isLt2M) {
	        message.error('Image must smaller than 2MB!');
	      }
	      const r=new FileReader()
	      r.readAsDataURL(file)
	      r.onload = e => {
	        file.thumbUrl = e.target.result;
	        setFiles(file)
	      };  
	      return false ;
    }

	const onFinish=values=>{

		if(!files){
	        message.error('不能不提交照片')
	        return
	    }    
        let dataProps={} 
        dataProps.id=lifeList.id
        dataProps.title = values.title
        dataProps.introduce =values.introduce
        dataProps.place=values.place
        dataProps.add_time=lifeList.add_time
        dataProps.view_count=lifeList.view_count

        const formData = new FormData();
        formData.append('file', files);

        reqwest({
          url: servicePath.postLifeImg,
          method: 'post',
          processData: false,
          data: formData,
          success: (res) => {
            dataProps.img=res.data.file
              axios({method:'post',
                  url:servicePath.updateLife,
                  data:dataProps
              }).then(
                  res=>{
                      if(res.data.isScuccess){
                          message.success('琐事更新成功')
                      }else{
                          message.error('琐事更新失败');
                      }

                  }
              )   
            
          },
          error: () => {
            message.error('upload failed.');
          },
        });  
	    	

	}

	const onFinishFailed=errorInfo=>{
		message.error('出现了一些意外')
	}

	useEffect(()=>{
		let id=props.location.search.split('=')[1]
		getLife(id)
	},[])
	if(!props.location.search){
		message.warning('未选中琐事，将返回琐事列表',1,()=>{
			props.history.push('/life/list')
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
		              <span >修改生活琐事</span>

		          </Form.Item>
		        <Form.Item
		          label="琐事标题"
		          name="title"
		          rules={[
		            {
		                    required: true,
		                    message: '请输入琐事标题!',
		                },

		          ]}
		        >
		          <Input/>
		        </Form.Item>

		        <Form.Item
		            label="琐事内容"
		              name="introduce"
		              rules={[
		                {
		                  required: true,
		                  message: '请输入琐事内容',
		                },
		              ]}

		          >
		            <Input.TextArea />
		        </Form.Item>
		        <Form.Item
		              label="地点"
		              name="place"
		              rules={[
		                {
		                  required: true,
		                  message: '请输入地点',
		                },
		              ]}
		          >
		            <Input />

		        </Form.Item>
		        <Form.Item label="添加图片" name="img">
		          <Upload  name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={beforeUpload} >
		             {
		                files ? <img src={files.thumbUrl}  style={{width:'100%'}}  />  : <img src={lifeList.img} style={{width:'100%'}}/>
		             }   
		          </Upload>
		        </Form.Item>
		          
		        <Form.Item {...tailLayout}>
		              <Button type="primary" htmlType="submit" >
		                提交琐事
		              </Button>
		        </Form.Item>
		          
		    </Form>
		</>
	)

}


export default Edit