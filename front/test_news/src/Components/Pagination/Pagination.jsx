import React from "react";
import {NavLink} from "react-router-dom";

const Pagination = (props) => {
    let pages = Math.ceil(props.count/props.step_size)
    if(props.categories){
        pages = [...Array(pages).keys()].map(page => <span>
        <NavLink to={`/news/?category_name=${props.categories}&page=${page+1}`}>{page+1}</NavLink>
    </span>)
    }
    else{
        pages = [...Array(pages).keys()].map(page => <span>
        <NavLink to={`/news/?page=${page+1}`}>{page+1}</NavLink>
    </span>)
    }

    return <div className={props.className}>
        {pages}
    </div>
}

export default Pagination