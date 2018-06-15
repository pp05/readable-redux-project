import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostPreviewSection from './PostPreviewSection';
import CategoriesSection from './CategoriesSection';
import {setCategory} from '../actions';
import {  Redirect } from 'react-router-dom';
class HomePage extends Component {

componentWillMount () {
	const category = this.props.match.params.category ? 
			this.props.match.params.category : 'All_Categories';
	this.props.setCategory(category);
	const postId = this.props.match.params.id;

}
 	render(){
        if(this.props.match.params.category && this.props.match.params.id){
        	//redirect to details page
        	const redirectUrl = '/' + this.props.match.params.category + '/' + this.props.match.params.id;
        	<Redirect to={redirectUrl} />
        }
		return (		
			<div className='homepage'>
				<CategoriesSection />
				<PostPreviewSection />
            </div>
			)
	}

}
function mapDispatchToProps(dispatch){
	return{
		setCategory : (category) => {
			dispatch(setCategory(category))
		}
	}
}
function mapStateToProps(state, ownProps){
	return {
		categories : Object.values(state.getCategories)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
