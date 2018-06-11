import * as DBServices from '../utils/DBServices'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'
export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_UP_POST = 'VOTE_UP_POST'
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const EDIT_COMMENTS = 'EDIT_COMMENTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'


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
      	console.log("calling callback" )
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


