import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCategories, setCategory} from '../actions';
import Button from 'react-toolbox/lib/button/Button';
//import  Button  from 'semantic-ui-react/src/elements/Button/index';

class CategoriesSection extends Component {
	state ={
		category : ''
	}
  componentWillMount () {
  	const initialCategory = "All_Categories";
  	this.props.fetchCategories();  
  	this.props.setCategory(initialCategory); 
  	this.setState({category:initialCategory}); 
  }

  buttonClicked = (category) => {
  	//console.log(category + self);
  	this.props.setCategory(category);
  	this.setState({category:category});
  }

/**
	setting the 'primary/neutral' attribute as a variable in the JSX
	was proving hard hence returning different jsx based on state
**/
  getCategoryButtonJsx = (category) =>{
  	if(category.path === this.state.category){
  		return (<Button key={category.path} label={category.name} raised primary
  					onClick={() => this.buttonClicked(category.path)}
			     	value={category.path}/>);
  	}else{
  		return (<Button key={category.path} label={category.name}  raised neutral
  					onClick={() => this.buttonClicked(category.path)}
			     	value={category.path}/>);
  	}
  }

  renderCategoriesSection = () =>{
  	var allCategoryObj = { 'name':'All Categories', path:'All_Categories'}
  	return ( <div>
  				<div>Categories</div>
  				{this.getCategoryButtonJsx(allCategoryObj)}
				{this.props.categories.map((category) => 
					{return (this.getCategoryButtonJsx(category))} )
				} 
			 </div>
			)
  }
	render(){
		const {categories} = this.props;
		//var self = this;
		return(<div>
			    {this.renderCategoriesSection()}
			</div>)
	}
}

/**
	mapStateToProps recieves the state and whatever is set here is set as the props for
	current component ie. HomePage. connect method below binds this
**/
function mapStateToProps(state, ownProps){
	return {
		categories : Object.values(state.getCategories)
	}
}

/**
The below allows HomePage to call this.fetchPosts instead of having to call
this.props.dispatch(actioncreatorname)
**/
function mapDispatchToProps(dispatch){
	return{
		fetchCategories : () => {
			dispatch(fetchCategories())},
		setCategory : (category) => {
			dispatch(setCategory(category))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSection)
