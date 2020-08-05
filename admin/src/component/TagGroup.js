import React,{useState} from 'react'
import { Tag } from 'antd';

function TagGroup(props){
  const [tags,setTags]=useState(props.TagList)

  const [inputVisible,setInputVisible]=useState(false)
  const [inputValue,setInputValue]=useState('')
  const tagcolor=['magenta','lime','red','volcano','orange','gold','green','cyan','blue','geekblue','purple']

  const handleClose=(removedTag)=>{
    const tagNow=tags.filter(tag=> tag!==removedTag)
    setTags(tagNow)
    console.log(tagNow)
  }


  return (
    <>
      {tags.map((tag,index)=>{
        return(
          <Tag className="edit-tag"
              key={tag}
              color={tagcolor[index]}
              closable
              onClose={()=>handleClose(tag)}
          >{tag}
          </Tag>
        )
      })}

    </>
  )


}
export default TagGroup;