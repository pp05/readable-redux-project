import React, { Component } from 'react';
import {connect} from 'react-redux';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import {addComment, editComment} from '../actions';

class CommentForm extends Component {

	state = {
		id : this.props.commentId,
		parentId : this.props.parentId
	}

	componentWillMount = () => {

 		if(this.state.id){
			var selectedPost = this.props.comment[0];
 			this.setState({ author:selectedPost.author, body:selectedPost.body,
 							timestamp: selectedPost.timestamp})
 		}
	}
	handleChange = (name, value) => {
      this.setState({...this.state, [name]: value});
    }

    handleSaveComment = () => {
    	if(this.state.id === ''){
 			var nowTime = new Date().getTime()
 			//this.setState({id :  new Date().getTime(), timestamp:new Date().getTime()});
 			this.props.addNewComment({...this.state, ['id'] :nowTime,['timestamp']:nowTime })
 		}else{
 			this.props.editComment( this.state, this.state.id)
 		}
 		this.props.closePostModal && this.props.closePostModal()
    }

	getTimeStampElement =(timestamp) => {
		var timestampVal = new Date(timestamp).toLocaleString();
		return (<div className='modalTimestamp'><span>Posted on : </span><span>{timestampVal}</span></div>);
	}

	render() { 
		const { author, body, timestamp} = this.state;
		return (<div>
				<section>					
					<Input type='text' label='Author'  value={author} required onChange={this.handleChange.bind(this, 'author')}/>
					<Input type='text' label='Comment' required multiline maxLength={30} value={body} onChange={this.handleChange.bind(this, 'body')}/>	
					{timestamp && this.getTimeStampElement(timestamp)}				
				</section>
				<div className='modalLabel'><Button label='Save Comment' className='modalButton' raised primary onClick={()=>this.handleSaveComment()}/ >
				</div>
			</div>)
	}
}
function mapStateToProps(state, ownProps){
	return {
		comment : Object.values(state.getComments).filter((comment) => {
				return comment.id === ownProps.commentId
		})
	}
}

function mapDispatchToProps(dispatch){
	return {
		addNewComment : (data) => {
			dispatch(addComment(data));
		},
		editComment : (data, id) => {
			dispatch(editComment(data,id));
		}
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(CommentForm)