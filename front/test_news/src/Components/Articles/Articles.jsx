import React from "react";
import styles from "./Articles.module.css"
import {Link} from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ChangeSectionContainer from "../Article/ChangeSectionData/ChangeSectionContainer";
import ChangeArticleDataContainer from "./ChangeArticleData/ChangeArticleDataContainer";

//ChangeArticleDataContainer
const Articles = (props) => {
    return <div className={`${styles.articles}`}>
        {props.articles.map( article => {
            return <Link to={`${article.slug}`} className={styles.article}>
                        <div>{article.title}</div>
                        <div className={styles.category_name}>{article.category.name}</div>
                    </Link>
        })}
        <Pagination  className={styles.pagination} count={props.count} step_size={5} categories={props.categories}/>
    </div>
}

export default Articles