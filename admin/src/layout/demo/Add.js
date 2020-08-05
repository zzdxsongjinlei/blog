import React,{useState,useEffect} from 'react';
import { Row, Col ,Input ,Button ,message ,Tag} from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import marked from 'marked'
import { PlusOutlined } from '@ant-design/icons';
import '../../static/style/layout/deno/add.css'

const { TextArea } = Input

const DemoAdd=(props)=>{
	const tagcolor=['magenta','lime','red','volcano','orange','gold','green','cyan','blue','geekblue','purple']

	const renderer=new marked.Renderer()
	marked.setOptions({
	    renderer: marked.Renderer(),
	    gfm: true,
	    pedantic: false,
	    sanitize: false,
	    tables: true,
	    breaks: false,
	    smartLists: true,
	    smartypants: false,
	}); 

	const [demoTag,setDemoTag]=useState([])
    const [inputVisible,setInputVisible]=useState(false)
    const [inputValue,setInputValue]=useState('')

    const [demoTitle,setDemoTitle] = useState('')   //文章标题
    const [demoContent , setDemoContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [demoIntroduce,setDemoIntroduce] = useState()            //简介的markdown内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('预览简介') //简介的html内容
   
    const initDemo=()=>{
    	if(!demoTitle){
            message.error('Demo标题不能为空')
            return false
        }else if(!demoContent){
            message.error('Demo内容不能为空')
            return false
        }else if(!demoIntroduce){
            message.error('Demo简介不能为空')
            return false
        }else if(!demoTag){
        	message.error('Demo标签不能为空')
        }
       	let dataProps={}   //传递到接口的参数
	    dataProps.title = demoTitle
	    dataProps.content =demoContent
	    dataProps.introduce =demoIntroduce
	    dataProps.add_time=(new Date).getTime()
    	dataProps.view_count =0
    	dataProps.type_name="项目Demo"
    	dataProps.hold=true
    	dataProps.tag=demoTag.join(',')
    	return dataProps;
    }

    const saveDemo = ()=>{
    	let dataProps=initDemo()
        axios({method:'post',
            url:servicePath.addDemo,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('Demo保存成功')
                        setDemoTitle('Demo标题')
                        setDemoContent('Demo内容')
                        setMarkdownContent('预览内容')
                        setDemoIntroduce('Demo简介')
                        setMarkdownIntroduce('预览简介')
                }else{
                    message.error('Demo保存失败');
                }

            }
        )
	}

	const holdDemo = ()=>{
		let dataProps=initDemo()
		dataProps.hold=false
        axios({method:'post',
            url:servicePath.addDemo,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('Demo暂存成功,可以去列表页面查看')
                    setDemoTitle('Demo标题')
                    setDemoContent('Demo内容')
                    setMarkdownContent('预览内容')
                    setDemoIntroduce('Demo简介')
                    setMarkdownIntroduce('预览简介')
                }else{
                    message.error('Demo暂存失败');
                }

            }
        )
	}
	
    const changeContent=(e)=>{
    	setDemoContent(e.target.value)
    	let html=marked(e.target.value)
    	setMarkdownContent(html)
    }
    const changeIntroduce=(e)=>{
    	setDemoIntroduce(e.target.value);
    	let html=marked(e.target.value)
    	setMarkdownIntroduce(html)
    }
    const handleClose=(removedTag)=>{
		const tags = demoTag.filter( tag=> tag !== removedTag);
		setDemoTag(tags)
	}
    const showInput=()=>{
    	setInputVisible(true)
    }
    const handleInputChange=(e)=>{
    	setInputValue(e.target.value)
    }
    const handleInputConfirm=()=>{
    	if(demoTag.indexOf(inputValue)===-1){
			setDemoTag([...demoTag,inputValue])
			setInputVisible(false)
			setInputValue('')
		}
		else{
			message.error('标签已存在')
		}
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
			<Row gutter={20}>
				<Col span={18} >
					<Row justify="center" gutter={[20,20]}>
						<Col span={20}>
							<Input 
								placeholder="Demo标题" 
								onChange={e=>{setDemoTitle(e.target.value)}}
								value={demoTitle}  
								size="large" 
							/>
						</Col>
						<Col span={12}>
		                    <TextArea
		                    	value={demoContent} 
		                        className="markdown-content" 
		                        rows={35}  
		                        placeholder="Demo内容"
		                        onChange={changeContent}
		                        onPressEnter={changeContent}
		                    />
		                </Col>
		                <Col span={12}>
		                    <div className="show-html"
		                    	dangerouslySetInnerHTML={{__html:markdownContent}}
		                    >
		                    </div>
		                </Col>
					</Row>
				</Col>
				<Col span={6} >
					<Row >
					    <Col span={24}>
					        <Button  size="large" onClick={holdDemo} style={{margin:' 0 10px 10px 0'}}>暂存Demo</Button>
					        <Button type="primary" size="large" onClick={saveDemo} >发布Demo</Button>
					        <br/>
					    </Col>
					    <Col span={24}>
						    <br/>
						    <TextArea 
						        rows={4} 
						        placeholder="Demo简介"
						        value={demoIntroduce}
						        onChange={changeIntroduce}
						        onPressEnter={changeIntroduce}
						    />
						    <br/><br/>
						    <div  className="introduce-html" dangerouslySetInnerHTML={{__html:markdownIntroduce}}>

						    </div>
						    <br/><br/>
						    <div>
						    	<div style={{margin:"0px 0px 10px 0px"}}>Demo所属标签 </div>
						    	<div>
						    	{demoTag.map((tag, index) => {
						 		 	return (
							            <Tag
							              className="edit-tag"
							              key={tag}
							              color={tagcolor[index]}
							              closable
							              onClose={() => handleClose(tag)}
							              style={{margin:"0px 5px 10px 0px"}}

							             
							            >              
							                { tag}
							            </Tag>
						            )
						        })}
						    	{
						        	inputVisible && (
						        		<Input
						        			type="text"
						        			className="tag-input"
						        			value={inputValue}
						        			onChange={handleInputChange}
						        			onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                            style={{margin:"0px 5px 10px 0px"}}
						        		/>

						        	)
						        }
						        {
						        	!inputVisible && (
						        		<Tag color="cyan" className="site-tag-plus" onClick={showInput} style={{margin:"0px 5px 10px 0px"}}>
						        			<PlusOutlined/>添加新标签
						        		</Tag>

						        	)
						        }
						        </div>

						    </div>
						</Col>
						
					</Row>
				</Col>
			</Row>
		</>
	)
}
export default DemoAdd