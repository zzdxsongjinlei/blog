import React,{useState,useEffect} from 'react';

import { Row, Col ,Input ,Button ,message ,Tag} from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiUrl.js'
import '../../static/style/layout/deno/edit.css'

import { PlusOutlined } from '@ant-design/icons';

import marked from 'marked'

const { TextArea } = Input


function BookEdit(props){
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

	const [bookList,setBookList]=useState({})

    const [bookTitle,setBookTitle] = useState('')

    const [bookTag,setBookTag]=useState([])
    const [inputVisible,setInputVisible]=useState(false)
    const [inputValue,setInputValue]=useState('')

    const [bookContent , setBookContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('') //html内容
    const [bookIntroduce,setBookIntroduce] = useState('')            //简介的markdown内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('') //简介的html内容

	const getBook=(id)=>{




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
		        axios(servicePath.getBookById+id).then(res=>{
					const Book=res.data.data[0]

					setBookList(Book)

					setBookTitle(Book.title)

					setBookTag(Book.tag.split(','))

					setBookContent(Book.content)
					let contentHtml=marked(Book.content)
					setMarkdownContent(contentHtml)
					setBookIntroduce(Book.introduce)
					let introduceHtml=marked(Book.introduce)
					setMarkdownIntroduce(introduceHtml)

				})
            } 


        })


		
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
    const initBook=()=>{
    	if(!bookTitle){
            message.error('体会标题不能为空')
            return false
        }else if(!bookContent){
            message.error('体会内容不能为空')
            return false
        }else if(!bookIntroduce){
            message.error('体会简介不能为空')
            return false
        }

       	let dataProps={}   //传递到接口的参数
       	dataProps.id=bookList.id
	    dataProps.title = bookTitle
	    dataProps.content =bookContent
	    dataProps.introduce =bookIntroduce
	    dataProps.add_time=bookList.add_time
    	dataProps.view_count =bookList.view_count
    	dataProps.type_name="心得体会"
    	dataProps.hold=bookList.hold
    	dataProps.tag=bookTag.join(',')
    	return dataProps;
    }

    const saveBook = ()=>{
    	let dataProps=initBook()
    	dataProps.hold=true
        axios({method:'post',
            url:servicePath.updateBook,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('体会发布成功')

                    
                }else{
                    message.error('体会发布失败');
                }

            }
        )
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

	const holdBook = ()=>{
		let dataProps=initBook()
		dataProps.hold=false
        axios({method:'post',
            url:servicePath.updateBook,
            data:dataProps
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('体会暂存成功,可以去列表页面查看')

                }else{
                    message.error('体会暂存失败');
                }

            }
        )
	}

	useEffect(()=>{
		let id=props.location.search.split('=')[1]
		getBook(id)
	},[])

	if(!props.location.search){
		message.warning('未选中体会，将返回体会列表',1,()=>{
			props.history.push('/book/list')
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
export default BookEdit