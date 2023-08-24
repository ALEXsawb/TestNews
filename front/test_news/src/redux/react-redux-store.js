import {applyMiddleware, combineReducers, createStore} from "redux";

import thunk from "redux-thunk";
import baseConfigReducer from "./base-conf-reducer";
import userReducer from "./user-reducer";
import articlesReducer from "./articles-reducer";
import articleReducer from "./article-reducer";
import {reducer as formReducer} from "redux-form"


const reducers = combineReducers({
    baseConfig: baseConfigReducer,
    user: userReducer,
    articles: articlesReducer,
    article: articleReducer,
    form: formReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store;