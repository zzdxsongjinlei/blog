import React,{useState,useEffect} from 'react';
import { Row, Col ,Input ,Button ,message ,Tag} from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import marked from 'marked'
import { PlusOutlined } from '@ant-design/icons';
import '../../static/style/layout/deno/add.css'

const { TextArea } = Input

const BookAdd=(props)=>{
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

	const [bookTag,setBookTag]=useState([])
    const [inputVisible,setInputVisible]=useState(false)
    const [inputValue,setInputValue]=useState('')

    const [bookTitle,setBookTitle] = useState('')   //文章标题
    const [bookContent , setBookContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [bookIntroduce,setBookIntroduce] = useState()            //简介的markdown内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('预览简介') //简介的html内容
   
    const initBook=()=>{
    	if(!bookTitle){
            message.error('体会标题不能为空')
            return false
        }else if(!bookContent){
            message.error('体会内容不能为空')
            return false
        }else if(!bookIntroduce){
            message.error('体会介绍不能为空')
            return false
        }else if(!bookTag){
        	message.error('体会标签不能为空')
        }
       	let dataProps={}   //传递到接口的参数
	    dataProps.title = bookTitle
	    dataProps.content =bookContent
	    dataProps.introduce =bookIntroduce
	    dataProps.add_time=(new Date).getTime()
    	dataProps.view_count =0
    	dataProps.type_name="心得体会"
    	dataProps.hold=true
    	dataProps.tag=bookTag.join(',')
    	return dataProps;
    }

    const saveBook = ()=>{
    	let dataProps=initBook()
        axios({method:'post',
            url:servicePath.addBook,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('体会保存成功')
                        setBookTitle('体会标题')
                        setBookContent('体会内容')
                        setMarkdownContent('预览内容')
                        setBookIntroduce('体会简介')
                        setMarkdownIntroduce('预览简介')
                        setBookTag([])
                }else{
                    message.error('体会保存失败');
                }

            }
        )
	}

	const holdBook = ()=>{
		let dataProps=initBook()
		dataProps.hold=false
        axios({method:'post',
            url:servicePath.addBook,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('体会暂存成功,可以去列表页面查看')
                    setBookTitle('体会标题')
                    setBookContent('体会内容')
                    setMarkdownContent('预览内容')
                    setBookIntroduce('体会简介')
                    setMarkdownIntroduce('预览简介')
                    setBookTag([])
                }else{
                    message.error('体会暂存失败');
                }

            }
        )
	}
	
    const changeContent=(e)=>{
    	setBookContent(e.target.value)
    	let html=marked(e.target.value)
    	setMarkdownContent(html)
    }
    const changeIntroduce=(e)=>{
    	setBookIntroduce(e.target.value);
    	let html=marked(e.target.value)
    	setMarkdownIntroduce(html)
    }
    const handleClose=(removedTag)=>{
		const tags = bookTag.filter( tag=> tag !== removedTag);
		setBookTag(tags)
	}
    const showInput=()=>{
    	setInputVisible(true)
    }
    const handleInputChange=(e)=>{
    	setInputValue(e.target.value)
    }
    const handleInputConfirm=()=>{
    	if(bookTag.indexOf(inputValue)===-1){
			setBookTag([...bookTag,inputValue])
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
								placeholder="体会标题" 
								onChange={e=>{setBookTitle(e.target.value)}}
								value={bookTitle}  
								size="large" 
							/>
						</Col>
						<Col span={12}>
		                    <TextArea
		                    	value={bookContent} 
		                        className="markdown-content" 
		                        rows={35}  
		                        placeholder="体会内容"
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
					        <Button  size="large" onClick={holdBook} style={{margin:' 0 10px 10px 0'}}>暂存体会</Button>
					        <Button type="primary" size="large" onClick={saveBook} >发布体会</Button>
					        <br/>
					    </Col>
					    <Col span={24}>
						    <br/>
						    <TextArea 
						        rows={4} 
						        placeholder="体会简介"
						        value={bookIntroduce}
						        onChange={changeIntroduce}
						        onPressEnter={changeIntroduce}
						    />
						    <br/><br/>
						    <div  className="introduce-html" dangerouslySetInnerHTML={{__html:markdownIntroduce}}>

						    </div>
						    <br/><br/>
						    <div>
						    	<div style={{margin:"0px 0px 10px 0px"}}>体会所属标签 </div>
						    	<div>
						    	{bookTag.map((tag, index) => {
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
export default BookAdd