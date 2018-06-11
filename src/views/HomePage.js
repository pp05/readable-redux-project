import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostPreviewSection from './PostPreviewSection';
import CategoriesSection from './CategoriesSection';
class HomePage extends Component {

 	render(){

		return (		
			<div>
				<CategoriesSection />
				<PostPreviewSection />
            </div>
			)
	}

}

export default connect()(HomePage)
