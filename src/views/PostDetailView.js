import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import PostForm from './PostForm';
import CommentForm from './CommentForm'

import {fetchCommentsForPost, voteUpComment, voteDownComment, 
	     addComment, voteUpPost, voteDownPost, deletePost, deleteComment} from '../actions'

class PostDetailView extends Component {
	state = {
		postModalOpen : false,
		commentModalOpen:false,
		selectedCommentId: ''
	}
    componentWillMount =() => {
      const { id } = this.props.match.params;

      this.setState({postId : id});

      if(this.props.comments.length === 0){
      	this.props.getComments(id);
      }
    }
    formatDate =(timestamp) => {
		return new Date(timestamp).toLocaleString();
	}
	getAvatarIcon = () => {
		return ( <Button icon='local_post_office' floating accent  />);
	}

	getCommentElement = (comment) => {
		const {  id,  author, timestamp, voteScore,body } = comment;
		return (<div> 
					<div className='editButton'>
						<Button icon='edit' floating primary mini onClick={() => this.editComment(id)}/>
					</div> 
						<div className='postPreview'>
						<div className='heading' >{body}</div>
						<div className='subheading'>{`Author: ${author} | Posted on: ${this.formatDate(timestamp)}`}</div>
						
						<span>{voteScore} votes so far  </span>
						<Button icon='thumb_up' floating primary mini onClick={()=> this.upVoteOnComment(id)} />					
						<Button icon='thumb_down' floating primary mini onClick={()=> this.downVoteOnComment(id)}/>
						<Button icon='delete' floating  onClick={()=> this.handleDeleteComment(id)} />
					</div>
			    </div>);
	}

	upVoteOnComment =(id) => {
		this.props.voteUpComment(id);
	}

	downVoteOnComment =(id) => {
		this.props.voteDownComment(id);
	}
	handleDeleteComment = (id) => {
		this.props.deleteComment(id);
	}
	handleDeletePost = () => {
		//the 2nd param is the callback at the end of deletePost
		this.props.deletePost(this.state.postId, ()=>{this.props.history.push('/')});
		//this.props.history.push('/');
	}
	handleEditPost = () => {		
  		this.setState({ postModalOpen:true});
	}
	closePostModal = () =>{
  		this.setState({postModalOpen:false});
    }
   closeCommentModal = () => {
   		this.setState({commentModalOpen:false});
   }
    addNewComment = () => {
    	this.setState({selectedCommentId : '' });
    	this.openCommentModal();
    }
    editComment = (id) => {
    	this.setState({commentModalOpen:true, selectedCommentId : id });
    }
    openCommentModal = () => {
    	this.setState({commentModalOpen:true});
    }
    upVoteClicked =() => {
		this.props.voteUpPost(this.state.postId);
	}

	downVoteClicked =() => {
		this.props.voteDownPost(this.state.postId);
	}
	render (){
		if(! this.props.post){
			return (<div>Page Deleted</div>);
		}
		const {  category,  title, author, timestamp, commentCount, voteScore,
		         body  } = this.props.post;
		const {comments} = this.props;
		return (<div>				
			    <Link className="backArrow" to='/'>Back</Link>
			    <div className="postDetailsContainer">
			    <div>Post Details</div>
				 <Card >
				 	    <CardTitle avatar={this.getAvatarIcon()}
      						title={title}
      						subtitle={`Category: [${category}] | Author: ${author} | Posted on: ${this.formatDate(timestamp)}`}

    						/>
    					<CardText>{body} </CardText>
    					<span className='cardVote'>{voteScore} votes so far  </span>
						
    					<CardActions>
    						<Button icon = 'edit' label='Edit' className='modalButton' onClick={this.handleEditPost}/>
    						<Button icon ='delete' label='Delete' className='modalButton' onClick={() => this.handleDeletePost()}/>
    						<Button icon='thumb_up' floating primary mini onClick = {this.upVoteClicked} />					
						<Button icon='thumb_down' floating primary mini onClick = {this.downVoteClicked}/>
    					</CardActions>

				 </Card>
				 <pre/>
				 <pre/>
				 <div> Comments </div>
				 <List>
				 	<ListDivider />
				 		<Button primary  label='Add New Comment' icon='add' onClick={()=>this.addNewComment()} />
				 	<ListDivider />
				 	{comments.map((comment) => {
				 		return (<div>
				 					<ListItem key={comment.id} itemContent = {this.getCommentElement(comment)}></ListItem>
				 			     	<ListDivider />
				 			     </div>)
				 	} ) }
				 </List>
				<Modal 	className='modal' overlayClassName='overlay' isOpen={this.state.postModalOpen}
          				onRequestClose={this.closePostModal} contentLabel='Post' ariaHideApp={false} 
          				contentLabel='Edit Post'>
          			<div className='modalLabel'><span>Edit Post</span></div>
          				<PostForm  postId={this.state.postId} closePostModal ={this.closePostModal}/>
        			</Modal	>
        			
        		<Modal 	className='commentmodal' overlayClassName='overlay' isOpen={this.state.commentModalOpen}
          				onRequestClose={this.closeCommentModal} contentLabel='Post' ariaHideApp={false} 
          				contentLabel='Edit Comment'>
          		<div className='modalLabel'></div>
          				<CommentForm  commentId={this.state.selectedCommentId} parentId={this.state.postId}
          					closePostModal ={this.closeCommentModal}/>
        		</Modal	>
				 </div>
			</div>)
	}
}

function mapStateToProps(state, ownProps){
	return {
		post: state.postsById[ownProps.match.params.id],
		comments : Object.values(state.getComments).filter((comment) => {
				return ownProps.match.params.id === comment.parentId
		})
	}
}

function mapDispatchToProps(dispatch){
	return{
		getComments : (id) => {
			dispatch(fetchCommentsForPost(id))
		},
		voteUpComment: (id) => {
			dispatch(voteUpComment(id))
		},
		voteDownComment : (id) => {
			dispatch(voteDownComment(id))
		},
		addNewComment : (data) => {
			dispatch(addComment(data));
		},
		voteUpPost: (id) => {
			dispatch(voteUpPost(id))
		},
		voteDownPost: (id) => {
			dispatch(voteDownPost(id))
		},
		deletePost : (id, callback) => {
			dispatch(deletePost(id, callback))
		},
		deleteComment : (id) => {
			dispatch(deleteComment(id))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);