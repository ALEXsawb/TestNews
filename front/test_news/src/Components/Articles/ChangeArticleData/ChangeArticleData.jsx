import React from "react";
import {Field, reduxForm} from "redux-form";



const ChangeArticleData = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name='title' placeholder={'title'}/>
        <br/>
        <Field component="input" name='slug' placeholder={'slug'}/>
        <br/>
        <Field component='select' name='category'>
            <option></option>
            {props.categories.map(c => <option value={c.id}>{c.name}</option>)}
        </Field>
        <button type={"submit"}>change section data</button>
    </form>
}



export default reduxForm({form: 'changeArticle'})(ChangeArticleData)
