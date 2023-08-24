import React from "react";
import {connect} from "react-redux"
import styles from "./ChangeArticleData.module.css"
import ChangeArticleData from "./ChangeArticleData";
import {changeArticleData, setCategories} from "../../../redux/articles-reducer";
import {unsetBlackout} from "../../../redux/base-conf-reducer";


class ChangeArticleDataContainer extends React.Component{
    onSubmit = (formData) => {
        this.props.changeArticleData(this.props.articleSlug, formData, this.props.accessToken)
        this.props.unsetBlackout()
    }

    componentDidMount() {
        this.props.setCategories()
    }

    render() {
        return <div className={styles.add_article_block}>
            <ChangeArticleData onSubmit={this.onSubmit} categories={this.props.categories}/>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.articles.categories,
        accessToken: state.user.access_token
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        unsetBlackout: () => dispatch(unsetBlackout()),
        changeArticleData: (articleSlug, updatedData, accessToken) => dispatch(changeArticleData(articleSlug, updatedData, accessToken)),
        setCategories: (page=1) => dispatch(setCategories(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeArticleDataContainer)