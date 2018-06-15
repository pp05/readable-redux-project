import * as DBServices from '../utils/DBServices'
import {  GET_POSTS,
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
 } from './types'


export const setCategory = (category) =>({
	type:SET_CATEGORY,
	category
})

export const postsById = (posts, actionType) =>({
  type: actionType,
  posts

})

export const receiveComments = (comments, actionType) => ({
  type: actionType,
  comments
})

export const getCategories = (categories) => ({
	type: GET_CATEGORIES,
	categories
});

/**Using thunk middleware to make asynchronous calls **/
export const fetchPosts = () => dispatch => (
  DBServices
      .fetchPostsFromServer()
      .then(posts => dispatch(postsById(posts, GET_POSTS)))
);
export const fetchPost = (id) => dispatch => (
    DBServices
      .fetchPostFromServer(id)
      .then(post => dispatch(postsById(post, GET_POST)))
);
export const fetchCategories = () => dispatch => (
  DBServices
      .fetchCategoriesFromServer()
      .then(categories => dispatch(getCategories(categories)))
);

export const editPost = (data,id) => dispatch => (
  DBServices
      .editPostInDB(data,id)
      .then(post => dispatch(postsById(post,EDIT_POST)))
);

export const deletePost = (id, callback) => dispatch => (
  DBServices
      .deletePostInDB(id)
      .then(post => dispatch(postsById(post,DELETE_POST)))
      .then(()=> {
      	if(callback)
      	callback()})
);

export const addPost = (data,id) => dispatch => (
  DBServices
      .addPostInDB(data,id)
      .then(post => dispatch(postsById(post,ADD_POST)))
);

export const voteUpPost = (id) => dispatch => (
	DBServices
      .votePostInDB(id,{option:"upVote"})
      .then(post => dispatch(postsById(post,EDIT_POST)))
);

export const voteDownPost = (id) => dispatch => (
	DBServices
      .votePostInDB(id,{option:"downVote"})
      .then(post => dispatch(postsById(post,EDIT_POST)))
);

export const fetchCommentsForPost = (id) => dispatch => (
	DBServices
		.fetchCommentsForPostFromServer(id)
		.then(comments => dispatch( receiveComments(comments, GET_COMMENTS)))
);

export const voteUpComment = (id) => dispatch => (
	DBServices
      .voteCommentInDB(id,{option:"upVote"})
      .then(comments => dispatch(receiveComments(comments, EDIT_COMMENTS)))
);

export const voteDownComment = (id) => dispatch => (
	DBServices
      .voteCommentInDB(id,{option:"downVote"})
      .then(comments => dispatch(receiveComments(comments, EDIT_COMMENTS)))
);

export const addComment = (data) => dispatch => (
  DBServices
      .addCommentInDB(data)
      .then(comments => dispatch( receiveComments(comments, ADD_COMMENTS)))
);

export const editComment = (data,id) => dispatch => (
  DBServices
      .editCommentInDB(data,id)
      .then(comments => dispatch(receiveComments(comments,EDIT_COMMENTS)))
);

export const deleteComment = (id) => dispatch => (
  DBServices
      .deleteCommentInDB(id)
      .then(comments => dispatch(receiveComments(comments,DELETE_COMMENTS)))
);


