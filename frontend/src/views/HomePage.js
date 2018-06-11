import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import PreviewPost from './PreviewPost'
import Button from 'react-toolbox/lib/button/Button';

class HomePage extends Component {

  componentWillMount () {
    this.props.fetchPosts();
  }

	render(){
		const {posts} = this.props
		console.log(posts)
		return (
			<div>
			<Button label="Hello World!" raised primary />
			<Button icon='add' floating accent mini />
			 <ul className='ui items'>
              {posts.map((post)=>(
              	<li key={post.id}>
              		<PreviewPost postId={post.id}/>
              	</li>)) 
              }
            </ul>
            </div>
			)
	}

}
/**
	mapStateToProps recieves the state and whatever is set here is set as the props for
	current component ie. HomePage. connect method below binds this
**/
function mapStateToProps(state){
	return {
		posts: Object.values(state.postsById)
	}
}

/**
The below allows HomePage to call this.fetchPosts instead of having to call
this.props.dispatch(actioncreatorname)
**/
function mapDispatchToProps(dispatch){
	return{
		fetchPosts : () => dispatch(fetchPosts())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
