import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import CandidateListItem from '../candidate-list-item';
import VoteService from '../../services/knuvote-service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './candidate-list.css';

class CandidateList extends Component{
    obj = new VoteService();
    cand = new VoteService();
    edit = new VoteService ();
    state={
        name:'',
        candidates: [],
        err: false,
        expiration_time: '',
        startDate: new Date(),
        catName: '',
        id: 0
        
    }

    onClick = (e)=>{
        e.preventDefault();
        const categoryId = parseInt(this.props.match.params.id);
            this.obj.addCandidate(categoryId, this.state, localStorage.getItem('token')).then((e)=>
            {
            if(e.message === "Access forbidden"){
                this.setState({
                    err:true
                }); 
            };         
            this.updateCandidate();
        });
        this.setState({
            candidates:[],
        });                        
    }
    onChangeInput =(e) =>{this.setState({ name:e.target.value});};
    onChange =(e) =>{this.setState({ catName:e.target.value});};
    
    componentDidMount=()=>{
        const categoryId = parseInt(this.props.match.params.id);
        console.log('categoryId', categoryId);
        this.updateCandidate();  
        this.setState({catName: this.props.categoryName, id: categoryId})
    }


    updateCandidate=()=>{
        const categoryId = parseInt(this.props.match.params.id);
        if (categoryId === 0){
            return ;
        }
        this.cand.getCandidates(categoryId).then((e)=>{
            if(e.message === "Access forbidden"){
                this.setState({
                    err:true
                });
            };      
                this.setState(prevState => ({
                    candidates: [...e]
                  }));            
            });         
    }; 
    onClickEdit = (e) => {
        e.preventDefault();

        this.edit.editCategory(this.state.catName,this.state.id,  this.state.expiration_time, localStorage.getItem('token')).then((e)=>
        {
            if(e.message === "Access forbidden"){
                this.setState({
                    err:true
                });
            };       
           
        });
        this.setState({
            candidates:[],
        })
        this.updateCandidate(); 
        

    }
    handleChange = date => {
        this.setState({ 
           expiration_time: `${date.toJSON()}`,
           startDate: date
        });
      };

    render(){
        const categoryId = parseInt(this.props.match.params.id);
        const {categoryName, time} = this.props;
        const utc = time.slice(0,10);
        const {candidates,err} = this.state;
        const ErrorIndicate = err ? <span class="border border-danger">You don't creator of this category</span> : <span> </span>;
        const selectedCandidates = candidates.filter(cand => cand.category_id === categoryId)
        console.log('selectedCandidater',selectedCandidates);
           const elements = selectedCandidates.map((item)=>{
            const {id, ...allitems} = item;
                return (<li key = {id} className = "list-group-item">    
                <CandidateListItem {...item} categoryId = {categoryId} updateCandidate={this.updateCandidate} />
                    </li>
            );
        });  
        
        return (
        <div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
				<div class="table100 ver1 m-b-110">
					<table data-vertable="ver1">
						<thead>
							<tr class="row100 head">
								<th class="column100 column1" data-column="column1">Name: {categoryName} Expiration time: {utc}</th>
							</tr>
						</thead>
						<tbody>
                            {elements}
                        </tbody>
					</table>
				</div>
			</div>
		</div>
	</div>


     );
    }
}

export default withRouter(CandidateList);