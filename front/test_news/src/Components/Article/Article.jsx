import React from "react";
import styles from "./Article.module.css"
const Article = (props) => {
    return <div className={styles.article}>
        {props.hasOwnProperty('article') &&
         props.article &&
         props.article.hasOwnProperty('sections') &&
         props.article.sections.length > 0?
            props.article.sections.map(section => {
            return <div className={styles.section}>
                <h1>{section.section.header}</h1>
                {section.content.map(part_of_content => {
                    if(part_of_content.type === 'text'){
                        return <p>{part_of_content.text}</p>
                    }
                    else if(part_of_content.type === 'image'){
                        return <div className={styles.image}>
                            <img src={part_of_content.img}/>
                            {part_of_content.hasOwnProperty('context')? <span  className={styles.img_describe_text}>{part_of_content.context}</span>: ''}
                        </div>
                    }
                })}
            </div>
            }):
            <p>Article do not contain sections.</p>}
    </div>
}

export default Article