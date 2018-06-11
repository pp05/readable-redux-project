import React, { Component } from 'react';
import {connect} from 'react-redux';

class PreviewPost extends Component {

	formatDate =(timestamp) => {
		return new Date(timestamp).toLocaleString();
	}

	render (){
		const { category, id, title, author, timestamp } = this.props.post;

		return (
			<div className='previewPost'> 
				<div>{title}</div>
				<div>
            		Category: [{category}] | Author: {author} | Posted on: {this.formatDate(timestamp)}
            	</div> 
            	<div>
            		
            	</div>
            </div>
            )

	}
}

function mapStateToProps(state, ownProps){
	return {
		post: state.postsById[ownProps.postId]
	}
}

export default connect(mapStateToProps)(PreviewPost)