
import React,{useState,useEffect} from 'react';
import { Row, Col ,Input ,Button ,message ,Tag} from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import marked from 'marked'
import { PlusOutlined } from '@ant-design/icons';
import '../../static/style/layout/article/add.css'

const { TextArea } = Input

const Add=(props)=>{
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

	const [articleTag,setArticleTag]=useState([])
    const [inputVisible,setInputVisible]=useState(false)
    const [inputValue,setInputValue]=useState('')

    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [articleIntroduce,setArticleIntroduce] = useState()            //简介的markdown内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('预览简介') //简介的html内容
   
    const initArticle=()=>{
    	if(!articleTitle){
            message.error('分享标题不能为空')
            return false
        }else if(!articleContent){
            message.error('分享内容不能为空')
            return false
        }else if(!articleIntroduce){
            message.error('分享不能为空')
            return false
        }
       	let dataProps={}   //传递到接口的参数
	    dataProps.title = articleTitle
	    dataProps.content =articleContent
	    dataProps.introduce =articleIntroduce
	    dataProps.add_time=(new Date).getTime()
    	dataProps.view_count =0
    	dataProps.type_name="技术分享"
    	dataProps.hold=true
    	dataProps.tag=articleTag.join(',')
    	return dataProps;
    }

    const saveArticle = ()=>{
    	let dataProps=initArticle()
        axios({method:'post',
            url:servicePath.addArticle,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('分享保存成功')
                        setArticleTitle('分享标题')
                        setArticleContent('分享内容')
                        setMarkdownContent('预览内容')
                        setArticleIntroduce('分享简介')
                        setMarkdownIntroduce('预览简介')
                        setArticleTag([])
                }else{
                    message.error('分享保存失败');
                }

            }
        )
	}

	const holdArticle = ()=>{
		let dataProps=initArticle()
		dataProps.hold=false
        axios({method:'post',
            url:servicePath.addArticle,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('分享暂存成功,可以去列表页面查看')
                    setArticleTitle('分享标题')
                    setArticleContent('分享内容')
                    setMarkdownContent('预览内容')
                    setArticleIntroduce('分享简介')
                    setMarkdownIntroduce('预览简介')
                    setArticleTag([])
                }else{
                    message.error('分享暂存失败');
                }

            }
        )
	}
	
    const changeContent=(e)=>{
    	setArticleContent(e.target.value)
    	let html=marked(e.target.value)
    	setMarkdownContent(html)
    }
    const changeIntroduce=(e)=>{
    	setArticleIntroduce(e.target.value);
    	let html=marked(e.target.value)
    	setMarkdownIntroduce(html)
    }
    const handleClose=(removedTag)=>{
		const tags = articleTag.filter( tag=> tag !== removedTag);
		setArticleTag(tags)
	}
    const showInput=()=>{
    	setInputVisible(true)
    }
    const handleInputChange=(e)=>{
    	setInputValue(e.target.value)
    }
    const handleInputConfirm=()=>{
    	if(articleTag.indexOf(inputValue)===-1){
			setArticleTag([...articleTag,inputValue])
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
								placeholder="分享标题" 
								onChange={e=>{setArticleTitle(e.target.value)}}
								value={articleTitle}  
								size="large" 
							/>
						</Col>
						<Col span={12}>
		                    <TextArea
		                    	value={articleContent} 
		                        className="markdown-content" 
		                        rows={35}  
		                        placeholder="分享内容"
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
					        <Button  size="large" onClick={holdArticle} style={{margin:' 0 10px 10px 0'}}>暂存分享</Button>
					        <Button type="primary" size="large" onClick={saveArticle} >发布分享</Button>
					        <br/>
					    </Col>
					    <Col span={24}>
						    <br/>
						    <TextArea 
						        rows={4} 
						        placeholder="分享简介"
						        value={articleIntroduce}
						        onChange={changeIntroduce}
						        onPressEnter={changeIntroduce}
						    />
						    <br/><br/>
						    <div  className="introduce-html" dangerouslySetInnerHTML={{__html:markdownIntroduce}}>

						    </div>
						    <br/><br/>
						    <div>
						    	<div style={{margin:"0px 0px 10px 0px"}}>分享所属标签 </div>
						    	<div>
						    	{articleTag.map((tag, index) => {
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
export default Add