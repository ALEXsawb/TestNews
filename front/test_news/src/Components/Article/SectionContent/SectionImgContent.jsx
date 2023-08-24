import React from "react";
import {Field, reduxForm} from "redux-form";
import FieldFileInput from "./UF";



const SectionImgContent = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name='context' placeholder={'image context'}/>
        <Field component={FieldFileInput} name='img_url' type={'file'}/>
        <br/>
        <button type={"submit"}>+ Add img block</button>
    </form>
}



export default reduxForm({form: 'imgSectionContent'})(SectionImgContent)
