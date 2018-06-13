import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import  ListItem from 'react-toolbox/lib/list/ListItem';
import  ListDivider from 'react-toolbox/lib/list/ListDivider';
import Button from 'react-toolbox/lib/button/Button';
import {voteUpPost, voteDownPost} from '../actions';
import '../assets/react-toolbox/theme.css';
class PreviewPost extends Component {

	formatDate =(timestamp) => {
		return new Date(timestamp).toLocaleString();
	}

   upVoteClicked =() => {
		this.props.voteUpPost(this.props.post.id);
	}

	downVoteClicked =() => {
		this.props.voteDownPost(this.props.post.id);
	}

	handleClick = () => {
		this.props.postSelected(this.props.post.id);
	}


	render (){
        return(
        	<div>
        		<ListItem  
				itemContent = {this.getPostPreviewElement()} > 
            </ListItem>
            <ListDivider/>
        	</div>
        	)

	}

	getPostPreviewElement =() => {
		const { category, id, title, author, timestamp, commentCount, voteScore } = this.props.post;
		return (<div> 
					<div className='editButton'>
						<Button icon='edit' floating primary mini onClick = {this.handleClick}/>
					</div> 
						<div className='postPreview'>
						<Link className='heading' to={`/${category}/${id}`} >{title}</Link>
						<div className='subheading'>{`Category: [${category}] | Author: ${author} | Posted on: ${this.formatDate(timestamp)}`}</div>
						<div className='comments'>{commentCount} Comments</div>
						<span>{voteScore} votes so far  </span>
						<Button icon='thumb_up' floating primary mini onClick = {this.upVoteClicked} />					
						<Button icon='thumb_down' floating primary mini onClick = {this.downVoteClicked}/>
					</div>
			    </div>);
	}

}

function mapStateToProps(state, ownProps){
	return {
		post: state.postsById[ownProps.postId]
	}
}
function mapDispatchToProps (dispatch){
	return {
		voteUpPost: (id) => {
			dispatch(voteUpPost(id))},
		voteDownPost: (id) => {
			dispatch(voteDownPost(id))}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(PreviewPost)