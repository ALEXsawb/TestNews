import React from "react";
import AddArticle from "./AddArticle";
import {connect} from "react-redux"
import {addArticle, setCategories} from "../../../redux/articles-reducer";
import styles from "./AddArticle.module.css"


class AddArticleContainer extends React.Component{
    onSubmit = (formData) => {
        this.props.addArticle(formData, this.props.accessToken)
    }

    componentDidMount() {
        this.props.setCategories()
    }

    render() {
        return <div className={styles.add_article_block}>
            <AddArticle onSubmit={this.onSubmit} categories={this.props.categories}/>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.articles.categories,
        accessToken: state.user.access_token
    }
}

export default connect(mapStateToProps, {addArticle, setCategories})(AddArticleContainer)