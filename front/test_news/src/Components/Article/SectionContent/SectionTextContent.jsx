import React from "react";
import {Field, reduxForm} from "redux-form";



const SectionTextContent = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="textarea" name='text' placeholder={'section header'}/>
        <br/>
        <button type={"submit"}>+ Add text block</button>
    </form>
}



export default reduxForm({form: 'imgTextContent'})(SectionTextContent)
