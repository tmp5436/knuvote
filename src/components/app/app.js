import React ,{Component} from 'react';
import Header from '../header/';
import Login from '../login';
import Registration from '../registration';
import HeaderPanel from '../header-panel';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import './app.css';
import CategoryList from '../category-list/category-list';
import CandidateList from '../candidate-list/candidate-list';
import ActivateAccount from '../auth';
import VoteService from '../../services/knuvote-service';
import CreateCategory from '../create-category';
import Editing from '../editing';


export default class App extends Component {
    constructor(){
        super();
             
    }

    obj = new VoteService();
    cand = new VoteService();

    state = {
        arr : [],
        candidates : [],
        categoryId: 0,
        categoryName:'',
        time: '',
        token:'',
        isLogin:false
    }
    componentDidMount=()=>{
        this.updateCategory();
        this.setState({
            isLogin: localStorage.getItem('isLogin')=== 'true'
        })
    }
    componentDidUpdate (prevState){
        if(prevState.arr == this.state.arr){
            //this.updateCategory();
        }
    }
    

    onCategoryClick = (id, name,expiration_time)=>{
        this.setState({               
                categoryId: id,
                categoryName: name,
                time: expiration_time,
                candidates: []               
        });
 
    }
    updateCategory(){
        this.obj.getCategories().then((e)=>{
                this.setState(prevState => ({
                    arr: [...prevState.arr, ...e]
                  }));            
            });
           
    };    

    getUserData=(uisLogin)=>{
        this.setState({isLogin:uisLogin});
    } 
    getLogout = (uisLogin)=>{
        this.setState({isLogin:uisLogin});
    }
    render() {     
        const {arr, candidates,categoryId, categoryName, isLogin, token, time} = this.state;
    return (
    <div >
        
        <Router>
        
            <Header getLogout = {this.getLogout}/>
                    <HeaderPanel isLogin = {isLogin}/>
                    <Switch>
                    <Route path="/"
                            render={() => <h2>Welcome to KNU Vote</h2>}
                            exact />
                    <Route path="/login" render={(()=> <Login getUserData = {this.getUserData}/>) } />
                    <Route path="/registration" component={Registration} />
                    <Route path="/editing" render={(() => <Editing/>)}/>
                    <Route exact path="/category-list">
                    {isLogin ? <Route path="/category-list" render ={(() => <CategoryList arr={arr}
                    onCategoryClick = {this.onCategoryClick}/>)}/> : <Redirect to ="/login"/>}
                    </Route> 

                    <Route path="/candidate-list" render ={(() => <CandidateList 
                                                                                 categoryId = {categoryId}
                                                                                 categoryName = {categoryName}
                                                                                 time = {time}/>)}/>
                    <Route path="/auth" render={(() => <ActivateAccount/>)}/>
                    <Route path="/create-category" render ={(() => <CreateCategory/>)}/>
                    </Switch>                                              
        </Router>       
    </div>
    );
    }
};

