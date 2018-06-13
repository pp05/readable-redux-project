/**
	Reducer class for 
**/

import { combineReducers } from 'redux';
import {
	GET_POSTS,
	GET_POST,
	GET_CATEGORIES,
	SET_CATEGORY,
	EDIT_POST,
	ADD_POST,
	DELETE_POST,
	VOTE_UP_POST,
	VOTE_DOWN_POST,
	GET_COMMENTS,
	EDIT_COMMENTS,
	ADD_COMMENTS,
	DELETE_COMMENTS

} from '../actions'

function postsById (state={}, action){
	switch(action.type){
		case GET_POSTS : 		
		//object spread syntax, return the same state but with new content
			return {...state, ...createObj(action.posts)};
		case GET_POST : 
			return {...state, ...createObj([action.posts])}
		case EDIT_POST: 
		case ADD_POST :
		case VOTE_UP_POST:
		case VOTE_DOWN_POST:
			return  {...state, [action.posts.id] : action.posts};
		case DELETE_POST :
			console.log(action.posts.id);
			//var newState
			return removeByKeys(state, [action.posts.id.toString()]);
		default :
			return state;
	}
}

function getCategories(state ={}, action){
	switch (action.type){
		case GET_CATEGORIES:
			return  {...state,  ...action.categories['categories']}
		default :
			return state;
	}

}

function setCategory(state=null, action){
	switch(action.type){
		case SET_CATEGORY: 
		 const { category } = action
		 return {...state, ['category'] : category}
		default: return state;
	}
}

function getComments(state={}, action){
	switch(action.type){
		case GET_COMMENTS :
			return {...state, ...createObj(action.comments)};
		case EDIT_COMMENTS :
		case ADD_COMMENTS :
			return {...state, [action.comments.id] : action.comments};
		case DELETE_COMMENTS :
			return removeByKeys(state, [action.comments.id.toString()]);
		case DELETE_POST : 
			var postId = action.posts.id;
			//when post is deleted delete corresponding comments from state
            var commentsForPostId = Object.values(state)
            							.filter((comment)=>{return comment.parentId == postId})
            							.map((comment) => (comment.id.toString()) );
            return removeByKeys(state, commentsForPostId);
		default: return state;
	}
}

function createObj (items) {
  const newObj = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemId = item.id
    newObj[itemId] = item
  }
  return newObj
}

//return back a new object after filtering the key from the state 
function removeByKeys (myObj, deleteKeyArray) {
  return Object.keys(myObj)
    .filter(key => !deleteKeyArray.includes(key) )
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
  }, {});
}

export default combineReducers({
	postsById,
	getCategories,
	setCategory,
	getComments
})