import React,{useState,useEffect} from 'react';

import { Row, Col ,Input ,Button ,message ,Tag} from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import '../../static/style/layout/deno/edit.css'

import { PlusOutlined } from '@ant-design/icons';

import marked from 'marked'

const { TextArea } = Input


function DemoEdit(props){
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

	const [demoList,setDemoList]=useState({})

    const [demoTitle,setDemoTitle] = useState('')

    const [demoTag,setDemoTag]=useState([])
    const [inputVisible,setInputVisible]=useState(false)
    const [inputValue,setInputValue]=useState('')

    const [demoContent , setDemoContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('') //html内容
    const [demoIntroduce,setDemoIntroduce] = useState('')            //简介的markdown内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('') //简介的html内容

	const getDemo=(id)=>{


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
        		axios(servicePath.getDemoById+id).then(res=>{
					
					const demo=res.data.data[0]

					setDemoList(demo)

					setDemoTitle(demo.title)

					setDemoTag(demo.tag.split(','))

					setDemoContent(demo.content)
					let contentHtml=marked(demo.content)
					setMarkdownContent(contentHtml)
					setDemoIntroduce(demo.introduce)
					let introduceHtml=marked(demo.introduce)
					setMarkdownIntroduce(introduceHtml)
					
				})

            }

        })


		
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
        }

       	let dataProps={}   //传递到接口的参数
       	dataProps.id=demoList.id
	    dataProps.title = demoTitle
	    dataProps.content =demoContent
	    dataProps.introduce =demoIntroduce
	    dataProps.add_time=demoList.add_time
    	dataProps.view_count =demoList.view_count
    	dataProps.type_name="Demo分享"
    	dataProps.hold=demoList.hold
    	dataProps.tag=demoTag.join(',')
    	return dataProps;
    }

    const saveDemo = ()=>{
    	let dataProps=initDemo()
    	dataProps.hold=true
        axios({method:'post',
            url:servicePath.updateDemo,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('Demo发布成功')

                    
                }else{
                    message.error('Demo发布失败');
                }

            }
        )
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

	const holdDemo = ()=>{
		let dataProps=initDemo()
		dataProps.hold=false
        axios({method:'post',
            url:servicePath.updateDemo,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('Demo暂存成功,可以去列表页面查看')

                }else{
                    message.error('Demo暂存失败');
                }

            }
        )
	}

	useEffect(()=>{
		let id=props.location.search.split('=')[1]
		getDemo(id)
	},[])

	if(!props.location.search){
		message.warning('未选中Demo，将返回Demo列表',1,()=>{
			props.history.push('/demo/list')
		})
		return  null;
	}
	
	return(
		<>
			<Row gutter={20}>
				<Col span={18} >
					<Row justify="center" gutter={[20,20]}>
						<Col span={20}>
							<Input 
								
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
					        <Button  size="large" onClick={holdDemo} style={{margin:' 0 10px 10px 0'}}>暂存文章</Button>
					        <Button type="primary" size="large" onClick={saveDemo} >发布文章</Button>
					        <br/>
					    </Col>
					    <Col span={24}>
						    <br/>
						    <TextArea 
						        rows={4} 
						       
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
export default DemoEdit