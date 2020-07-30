import {combineReducers} from 'redux';
import 
    {
        ADD_MOVIES , 
        ADD_FAVOURITE, 
        REMOVE_FAVOURITE, 
        SET_SHOW_FAVOURITE,
        ADD_MOVIE_TO_LIST,
        ADD_SEARCH_RESULT
    } 
    from '../actions'

const initialMoviesState = {
    list : [],
    favourites : [],
    showFavourite : false
}
export function movies(state = initialMoviesState,action)
{
    // if(action.type === ADD_MOVIES)
    // {
    //     return {
    //         ...state,
    //         list : action.movies
    //     }
    // }
    // return state;

    // eslint-disable-next-line default-case
    switch(action.type) {
        case ADD_MOVIES :
            return {
                ...state,
                list : action.movies
            }
        case ADD_FAVOURITE : 
            return {
                ...state,
                favourites :[action.movie, ...state.favourites]
            }
        case REMOVE_FAVOURITE :
            const filterList = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );

            return {
                ...state,
                favourites : filterList
            }
        case SET_SHOW_FAVOURITE :
            return {
                ...state,
                showFavourite : action.value
            }
        case ADD_MOVIE_TO_LIST :
            return {
                ...state,
                list : [action.movie, ...state.list]
            };
        default :
            return state;
    }
}
const initialSearchState = {
    result : {},
    showSearchResults : false

};
export function search (state = initialSearchState,action) {

        switch(action.type) {
        case ADD_SEARCH_RESULT:
            return{
                ...state,
                result: action.movie,
                showSearchResults : true
            }
            case ADD_MOVIE_TO_LIST :
            return {
                ...state,
                showSearchResults : false
            };

        default :
            return state;
    }
}

// const initialRootState = {
//     movies : initialMoviesState,
//     search : initialSearchState
// }
// export default function rootReducer (state = initialRootState, action){
//     return {
//         movies : movies(state.movies,action),
//         search : search(state.search,action)
//     }
// }

export default combineReducers ({
    movies : movies,
    search : search
});