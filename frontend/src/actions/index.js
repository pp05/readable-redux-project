import * as DBServices from '../utils/DBServices'
export const GET_POSTS = 'GET_POSTS'

export const postsById = (posts) =>({
  type: GET_POSTS,
  posts

})

/**Using thunk middleware to make asynchronous calls **/
export const fetchPosts = () => dispatch => (
  DBServices
      .fetchPostsFromServer()
      .then(posts => dispatch(postsById(posts)))
);