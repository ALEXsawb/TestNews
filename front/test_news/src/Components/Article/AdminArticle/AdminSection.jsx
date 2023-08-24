import styles from "../Article.module.css";
import React from "react";
import ChangeSectionContainer from "../ChangeSectionData/ChangeSectionContainer";
import SectionContentContainer from "../SectionContent/SectionContentContainer";
//                <button onClick={() => {this.props.setBlackout(<AddSectionContainer articleId={this.props.article.id}/>)}}> + Add new section </button>
const AdminSection = (props) => {
    return <div className={styles.section}>
        <div className={styles.admin_header}>
            <h1>{props.section.section.header}</h1>
            <i className="fa-solid fa-pen" onClick={() => {props.setBlackout(<ChangeSectionContainer sectionId={props.section.section.id}/>)}}/>
            <i className="fa-solid fa-trash-can" onClick={() => {props.deleteSection(props.section.section.id, props.accessToken)}}/>
        </div>
        {props.section.content.map(part_of_content => {
            if(part_of_content.type === 'text'){
                return <div className={styles.config}>
                    <p>{part_of_content.text}</p>
                    <i className="fa-solid fa-trash-can" onClick={() => {props.deleteText(props.section.section.id, part_of_content.id, props.accessToken)}}/>
                </div>
            }
            else if(part_of_content.type === 'image'){
                return <div className={styles.config}>
                    <div className={styles.image}>
                        <img src={part_of_content.img}/>
                        {part_of_content.hasOwnProperty('context')? <span  className={styles.img_describe_text}>{part_of_content.context}</span>: ''}
                    </div>
                    <i className="fa-solid fa-trash-can" onClick={() => {props.deleteImage(props.section.section.id, part_of_content.id, props.accessToken)}}/>
                </div>
            }
        })}
        <button onClick={() => {props.setBlackout(<SectionContentContainer sectionId={props.section.section.id}/>)}}>
            + Add content
        </button>
    </div>
}

export default AdminSection