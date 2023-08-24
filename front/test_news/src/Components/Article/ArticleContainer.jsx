import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import withRouter from "../withRouter/withRouter";
import Article from "./Article";
import {deleteImage, deleteSection, deleteText, setArticle} from "../../redux/article-reducer";
import AddSectionContainer from "./AddNewSection/AddSectionContainer";
import {setBlackout} from "../../redux/base-conf-reducer";
import AdminArticle from "./AdminArticle/AdminArticle";
import AdminSection from "./AdminArticle/AdminSection";


class ArticleContainer extends React.Component{

    componentDidMount() {
        this.props.setArticle(this.props.params.article_slug)
    }

    render() {
        if(this.props.isAuth){
            return <div>
                <AdminArticle article={this.props.article}
                              isAuth={this.props.isAuth}
                              deleteSection={this.props.deleteSection}
                              accessToken={this.props.accessToken}
                              setBlackout={this.props.setBlackout}
                              deleteText={this.props.deleteText}
                              deleteImage={this.props.deleteImage}/>
                <button onClick={() => {this.props.setBlackout(<AddSectionContainer articleId={this.props.article.id}/>)}}> + Add new section </button>
            </div>
        }
        else{
            return <Article article={this.props.article} isAuth={this.props.isAuth}/>
        }
    }
}


const mapStateToProps = (state) => {
    return {
        article: state.article,
        isAuth: state.user.isAuth,
        accessToken: state.user.access_token
    }
}

export default compose(connect(mapStateToProps, {setArticle, setBlackout, deleteSection, deleteImage, deleteText}), withRouter)(ArticleContainer)