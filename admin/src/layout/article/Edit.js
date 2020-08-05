import React,{useState,useEffect} from 'react';

import { Row, Col ,Input ,Button ,message ,Tag} from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import '../../static/style/layout/article/edit.css'

import { PlusOutlined } from '@ant-design/icons';

import marked from 'marked'

const { TextArea } = Input


function Edit(props){
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
	const [articleList,setArticleList]=useState({})

    const [articleTitle,setArticleTitle] = useState('')

    const [articleTag,setArticleTag]=useState([])
    const [inputVisible,setInputVisible]=useState(false)
    const [inputValue,setInputValue]=useState('')

    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('') //html内容
    const [articleIntroduce,setArticleIntroduce] = useState('')            //简介的markdown内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('') //简介的html内容

	const getArticle=(id)=>{



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
		        axios(servicePath.getArticleById+id).then(res=>{
					
						const article=res.data.data[0]

						setArticleList(article)

						setArticleTitle(article.title)

						setArticleTag(article.tag.split(','))

						setArticleContent(article.content)
						let contentHtml=marked(article.content)
						setMarkdownContent(contentHtml)
						setArticleIntroduce(article.introduce)
						let introduceHtml=marked(article.introduce)
						setMarkdownIntroduce(introduceHtml)
					
				})

            } 

        })
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
       	dataProps.id=articleList.id
	    dataProps.title = articleTitle
	    dataProps.content =articleContent
	    dataProps.introduce =articleIntroduce
	    dataProps.add_time=articleList.add_time
    	dataProps.view_count =articleList.view_count
    	dataProps.type_name="技术分享"
    	dataProps.hold=articleList.hold
    	dataProps.tag=articleTag.join(',')
    	return dataProps;
    }

    const saveArticle = ()=>{
    	let dataProps=initArticle()
    	dataProps.hold=true
        axios({method:'post',
            url:servicePath.updateArticle,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('文章发布成功')

                    
                }else{
                    message.error('文章发布失败');
                }

            }
        )
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

	const holdArticle = ()=>{
		let dataProps=initArticle()
		dataProps.hold=false
        axios({method:'post',
            url:servicePath.updateArticle,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('文章暂存成功,可以去列表页面查看')

                }else{
                    message.error('文章暂存失败');
                }

            }
        )
	}

	useEffect(()=>{
		let id=props.location.search.split('=')[1]
		getArticle(id)
	},[])

	if(!props.location.search){
		message.warning('未选中文章，将返回文章列表',1,()=>{
			props.history.push('/article/list')
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
					        <Button  size="large" onClick={holdArticle} style={{margin:' 0 10px 10px 0'}}>暂存文章</Button>
					        <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
					        <br/>
					    </Col>
					    <Col span={24}>
						    <br/>
						    <TextArea 
						        rows={4} 
						       
						        value={articleIntroduce}
						        onChange={changeIntroduce}
						        onPressEnter={changeIntroduce}
						    />
						    <br/><br/>
						    <div  className="introduce-html" dangerouslySetInnerHTML={{__html:markdownIntroduce}}>

						    </div>
						    <br/><br/>
						    <div>
						    	<div style={{margin:"0px 0px 10px 0px"}}>文章所属标签 </div>
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
export default Edit











