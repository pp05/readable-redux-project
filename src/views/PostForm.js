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
		id:'',
		errorInForm:false
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
 		if(!this.state.category || !this.state.title){
 			this.setState({errorInForm : true});
 		}else if(this.state.id === ''){
 			var nowTime = new Date().getTime()
 			//this.setState({id :  new Date().getTime(), timestamp:new Date().getTime()});
 				this.props.addNewPost({...this.state, ['id'] :nowTime,['timestamp']:nowTime })
 				this.props.closePostModal && this.props.closePostModal()
 			
 		}else{
 			this.props.editPost( this.state, this.state.id)
 			this.props.closePostModal && this.props.closePostModal()
 		}
 		
 	}
 	handleCategoryChanged = (newValue) => {
 		if(newValue !== ''){
 		this.setState({errorOnCategory:false});
 		}
 		this.handleChange('category', newValue)
 	}

 	render(){
 		const {categories} = this.props;
 		const {title, category, author, body, timestamp, errorInForm} = this.state;
 		var errorMessageOnCategory = errorInForm && (category==='') && 'Please select a category';
 		var errorMessageOnTitle = errorInForm && (title==='') && 'Please set a title';
		return (<div>

				<section>
					<Input type='text' label='Title' value={title} required error = {errorMessageOnTitle} onChange={this.handleChange.bind(this, 'title')}/>
					<Dropdown label ='Category' error={errorMessageOnCategory} source={categories} value={category} required onChange={(value) => this.handleCategoryChanged(value)}/>
					<Input type='text' label='Author'  value={author}  onChange={this.handleChange.bind(this, 'author')}/>
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