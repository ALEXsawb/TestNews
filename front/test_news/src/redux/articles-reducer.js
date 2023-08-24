import {articleAPI} from "../api/api";

const articlesBaseData = {count: 0, articles: [], categories: []}


const SET_ARTICLES = "SET_ARTICLES";
const ADD_ARTICLE = "ADD_ARTICLE";
const SET_CATEGORIES = "SET_CATEGORIES";
const CHANGE_ARTICLE = "CHANGE_ARTICLE";
const DELETE_ARTICLE = "DELETE_ARTICLE";


const articlesReducer = (state=articlesBaseData, action) => {
    switch (action.type) {
        case SET_ARTICLES:{
            return {...state, articles: action.articles, count: action.count}
        }
        case ADD_ARTICLE:{
            if(state.articles.length >= 5){
                state.articles.pop()
            }
            return {...state,
                    articles: [{...action.newArticleData,
                                category: state.categories.find(c => c.id === Number(action.newArticleData.category))},
                                ...state.articles], count: state.count + 1}
        }
        case CHANGE_ARTICLE:{
            return {...state,
                    articles: state.articles.map(a => {
                        if(a.slug === action.articleSlug){
                            return {...a, ...action.updatedData, category: state.categories.find(c => c.id === Number(action.updatedData.category))}
                        }
                        return a
                    })}
        }
        case DELETE_ARTICLE:{
            return {...state,
                    articles: state.articles.filter(a => a.slug !== action.articleSlug)
                    }
        }
        case SET_CATEGORIES:{
            return {...state, categories: action.categories}
        }
        default: return state
    }
}


export const setArticlesAC = (count, articles) => ({type: SET_ARTICLES, count, articles})
export const setCategoriesAC = (categories) => ({type: SET_CATEGORIES, categories})
export const addArticleAC = (newArticleData) => ({type: ADD_ARTICLE, newArticleData})
export const changeArticle = (articleSlug, updatedData) => ({type: CHANGE_ARTICLE, articleSlug, updatedData})
export const deleteArticleAC = (articleSlug) => ({type: DELETE_ARTICLE, articleSlug})


export const setArticles = (page=1) => (dispatch) => {
    articleAPI.getArticles(page).then(data => {
        dispatch(setArticlesAC(data.count, data.results))
    })
}

export const setArticlesByCategories = (category_name, page=1) => (dispatch) => {
    articleAPI.getArticlesByCategory(category_name, page).then(data => {
        dispatch(setArticlesAC(data.count, data.results))
    })
}


export const setCategories = (page=1) => (dispatch) => {
    articleAPI.getCategories(page).then(data => {
        dispatch(setCategoriesAC(data.results))
    })
}


export const addArticle = (newArticleData, accessToken) => (dispatch) => {
    articleAPI.setArticle(newArticleData, accessToken).then(data => {
        dispatch(addArticleAC(newArticleData))
    })
}


export const changeArticleData = (articleSlug, updatedData, accessToken) => (dispatch) => {
    articleAPI.changeArticle(articleSlug, updatedData, accessToken).then(data => {
        dispatch(changeArticle(articleSlug, data))
    })
}

export const deleteArticle = (articleSlug, accessToken) => (dispatch) => {
    articleAPI.deleteArticle(articleSlug, accessToken).then(
        dispatch(deleteArticleAC(articleSlug))
    )
}

export const deleteLastArticleInThisPage = (articleSlug, accessToken, page=1) => (dispatch) => {
    articleAPI.deleteArticle(articleSlug, accessToken).then(
        articleAPI.getArticles(page).then(data => {
            dispatch(setArticlesAC(data.count, data.results.filter(article => article.slug !== articleSlug)))
        })
    )
}


export default articlesReducer