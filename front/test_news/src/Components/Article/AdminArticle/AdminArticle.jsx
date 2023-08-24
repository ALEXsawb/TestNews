import React from "react";
import styles from "../Article.module.css"
import AdminSection from "./AdminSection";
const AdminArticle = (props) => {
    return <div className={styles.article}>
        {props.hasOwnProperty('article') &&
        props.article &&
        props.article.hasOwnProperty('sections') &&
        props.article.sections.length > 0?
            props.article.sections.map(section => {
                return <AdminSection section={section}
                                     deleteSection={props.deleteSection}
                                     accessToken={props.accessToken}
                                     setBlackout={props.setBlackout}
                                     deleteText={props.deleteText}
                                     deleteImage={props.deleteImage}/>
            }):
            <p>Article do not contain sections.</p>}
    </div>
}

export default AdminArticle