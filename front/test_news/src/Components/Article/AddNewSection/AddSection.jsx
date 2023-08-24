import React from "react";
import {Field, reduxForm} from "redux-form";



const AddSection = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name='header' placeholder={'section header'}/>
        <br/>
        <button type={"submit"}>+ Add Section</button>
    </form>
}



export default reduxForm({form: 'addSection'})(AddSection)
