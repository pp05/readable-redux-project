/**
	Reducer class for 
**/

import { combineReducers } from 'redux';
import {
	GET_POSTS
} from '../actions'

function postsById (state={}, action){
	switch(action.type){
		case GET_POSTS : 
		//object spread syntax, return the same state but with new content
			return {...state, ...createObj(action.posts)};
		default :
			return state;
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

export default combineReducers({
	postsById
})