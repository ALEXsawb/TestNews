import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import withRouter from "../withRouter/withRouter";
import {
    deleteArticle,
    deleteLastArticleInThisPage,
    setArticles,
    setArticlesByCategories
} from "../../redux/articles-reducer";
import Articles from "./Articles";
import {setBlackout} from "../../redux/base-conf-reducer";
import AdminArticles from "./AdminArticles";


class ArticlesContainer extends React.Component{

    componentDidMount() {
        if(this.props.searchParams.get('category_name')){
            this.props.setArticlesByCategories(this.props.searchParams.get('category_name'), this.props.searchParams.get('page'))

        }
        else{
            this.props.setArticles(this.props.searchParams.get('page'))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.searchParams.get('category_name') !== prevProps.searchParams.get('category_name') ||
           this.props.searchParams.get('category_name') && prevProps.searchParams.get('page') !== this.props.searchParams.get('page')
        ){
            this.props.setArticlesByCategories(this.props.searchParams.get('category_name'), this.props.searchParams.get('page'))
        }
        else if(prevProps.searchParams.get('page') !== this.props.searchParams.get('page')){
            this.props.setArticles(this.props.searchParams.get('page'))
        }
    }

    render() {
        if(this.props.isAuth){
            return <AdminArticles articles={this.props.articles}
                                  count={this.props.count}
                                  page={this.props.searchParams.get('page')}
                                  setBlackout={this.props.setBlackout}
                                  accessToken={this.props.accessToken}
                                  deleteArticle={this.props.deleteArticle}
                                  deleteLastArticleInThisPage={this.props.deleteLastArticleInThisPage}
                                  categories={this.props.searchParams.get('category_name')}
            />;
        }
        else{
            return <Articles articles={this.props.articles}
                             count={this.props.count}
                             categories={this.props.searchParams.get('category_name')}
                             setBlackout={this.props.setBlackout}/>;
        }
    }
}


const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles,
        count: state.articles.count,
        isAuth: state.user.isAuth,
        accessToken: state.user.access_token
    }
}

export default compose(connect(mapStateToProps, {setArticles, setBlackout, deleteArticle, deleteLastArticleInThisPage, setArticlesByCategories}), withRouter)(ArticlesContainer)