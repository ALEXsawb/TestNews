import React from "react";
import {Field, reduxForm} from "redux-form";


const AddArticle = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name='title' placeholder={'article title'}/>
        <br/>
        <Field component="input" name='slug' placeholder={'article slug'}/>
        <br />
        <Field component='select' name='category' placeholder={'category'}>
            <option></option>
            {props.categories.map(c => <option value={c.id}>{c.name}</option>)}
        </Field>
        <button type={"submit"}>+ Add Article</button>
    </form>
}



export default reduxForm({form: 'addArticle'})(AddArticle)