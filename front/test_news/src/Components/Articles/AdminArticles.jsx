import React from "react";
import styles from "./Articles.module.css"
import {Link} from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import AddArticleContainer from "./AddNewArticle/AddArticleContainer";
import ChangeArticleDataContainer from "./ChangeArticleData/ChangeArticleDataContainer";

const AdminArticles = (props) => {
    return <div className={`${styles.articles}`}>
        {props.articles.map( article => {
            return <div className={styles.admin_article}>
                <Link to={`${article.slug}`} >
                    <div>{article.title}</div>
                    <div className={styles.category_name}>{article.category.name}</div>
                </Link>
                <i className="fa-solid fa-pen" onClick={() => {props.setBlackout(<ChangeArticleDataContainer articleSlug={article.slug} />)}}/>
                <i className="fa-solid fa-trash-can" onClick={() => {
                    if(props.articles.length === 1){
                        props.deleteLastArticleInThisPage(article.slug, props.accessToken, props.page)
                    }
                    else{
                        props.deleteArticle(article.slug, props.accessToken)
                    }}
                }/>
            </div>
        })}
        <Pagination  className={styles.pagination} count={props.count} step_size={5} categories={props.categories}/>
        <button onClick={() => {props.setBlackout(<AddArticleContainer />)}}> + Add new article </button>

    </div>
}

export default AdminArticles