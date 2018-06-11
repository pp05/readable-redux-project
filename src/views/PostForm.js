import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import {addPost, editPost} from '../actions';

class PostForm extends Component {

	state = {
		title : '',
		category: '',
		author: '',
		body:'',
		id:''
	}
	getTimeStampElement =(timestamp) => {
		var timestampVal = new Date(timestamp).toLocaleString();
		return (<div className='modalTimestamp'><span>Posted on : </span><span>{timestampVal}</span></div>);
	}
 	componentWillMount (){
 		const {selectedPost} = this.props;
 		if(selectedPost){
 			/** Object.keys(selectedPost).map((key)=>{
 				this.setState({...this.state, [key]: selectedPost[key]})
 			})**/
 			this.setState({title:selectedPost.title, author:selectedPost.author,
 							category:selectedPost.category, body:selectedPost.body,
 							id:selectedPost.id, timestamp: selectedPost.timestamp})
 		}
 	}

    handleChange = (name, value) => {
      this.setState({...this.state, [name]: value});
    }

 	handleSavePost = () =>{
 		if(this.state.id === ''){
 			var nowTime = new Date().getTime()
 			//this.setState({id :  new Date().getTime(), timestamp:new Date().getTime()});
 			this.props.addNewPost({...this.state, ['id'] :nowTime,['timestamp']:nowTime })
 		}else{
 			this.props.editPost( this.state, this.state.id)
 		}
 		this.props.closePostModal && this.props.closePostModal()
 	}

 	render(){
 		const {categories} = this.props;
 		const {title, category, author, body, timestamp} = this.state;
		return (<div>

				<section>
					<Input type='text' label='Title' value={title} required onChange={this.handleChange.bind(this, 'title')}/>
					<Dropdown label ='Category' source={categories} value={category} required onChange={this.handleChange.bind(this, 'category')}/>
					<Input type='text' label='Author'  value={author} required onChange={this.handleChange.bind(this, 'author')}/>
					<Input type='text' label='Body' multiline maxLength={100} value={body} onChange={this.handleChange.bind(this, 'body')}/>	
					{timestamp && this.getTimeStampElement(timestamp)}				
				</section>
				<div className='modalLabel'><Button label='Save Post' className='modalButton' raised primary onClick={()=>this.handleSavePost()}/ >
				</div>
			</div>)
	}

}

function mapStateToProps(state, ownProps){
	return {
		categories : Object.values(state.getCategories).map((category)=>{
			return { label :category.name , value:category.path}
		}),
		selectedPost : ownProps.postId !== '' ? state.postsById[ownProps.postId] : null
	}
}

function mapDispatchToProps(dispatch){
	return {
		addNewPost : (data) => {
			dispatch(addPost(data));
		},
		editPost : (data, id) => {
			dispatch(editPost(data,id))
		}
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(PostForm)