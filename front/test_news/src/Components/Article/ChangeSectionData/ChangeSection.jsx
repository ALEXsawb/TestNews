import React from "react";
import {Field, reduxForm} from "redux-form";



const ChangeSection = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name='header' placeholder={'section header'}/>
        <br/>
        <button type={"submit"}>change section data</button>
    </form>
}



export default reduxForm({form: 'changeSection'})(ChangeSection)
