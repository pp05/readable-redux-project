const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchPostsFromServer = () =>
  fetch(`${api}/posts`,  { headers })
  	.then(data => data.json())

  	
export const fetchCategoriesFromServer = () =>
  fetch(`${api}/categories`,  { headers })
  	.then(data => data.json())

// Add new post
export const addPostInDB = data =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

// Edit post
export const editPostInDB = (data, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
  
export const deletePostInDB = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())

//vote for post 
export const votePostInDB = (id, data) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

//get comments for a post
export const fetchCommentsForPostFromServer = (id) =>
  fetch(`${api}/posts/${id}/comments`,  { headers })
  	.then(data => data.json())

export const voteCommentInDB = (id, data) => 
	fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

//add new comment
export const addCommentInDB = data =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())


export const editCommentInDB = (data, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

export const deleteCommentInDB = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())