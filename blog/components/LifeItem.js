import React,{useState} from 'react'
import {AimOutlined,FireFilled,CalendarFilled} from '@ant-design/icons'
import  Link from 'next/link'
import formatDate from '../cofig/formatDate.js'

import '../static/style/components/lifeitem.css'


 const LifeItem = (props)=>{
 	const [mylist,setMylist] = useState(props.data);
 	const lifeItems = mylist.map((item,index)=>
		<div key={item.id} className="listItem">
			<Link href={{pathname:"/lifeDetail",query:{id:item.id}}}>
				<a>
					<img src={item.img}/>
				</a>
			</Link>
			<div className="listItem-content">
				<div className="listItem-icon">
                <span><CalendarFilled/>{formatDate(item.add_time)}</span>
                <span><AimOutlined />{item.place}</span>
                <span><FireFilled/>{item.view_count}</span>
            </div>
				<div className="listItem-title">{item.title}</div>
			</div>
		</div>
 	);
 	
    return (

        	<div className="clear">
        		{lifeItems}
        	</div>
    )
 }

 export default LifeItem