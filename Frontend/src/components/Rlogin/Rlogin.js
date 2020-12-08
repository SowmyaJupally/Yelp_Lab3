import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { restaurantLoginMutation } from '../../mutation/mutation';
import { graphql } from 'react-apollo';

//Define a Login Component
class Rlogin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {

        this.props.restaurantLoginMutation({
            variables: {
                email: this.state.username,
                password: this.state.password
            }
        }).then(data=>{
           
            var i1=JSON.stringify(data);
var i=JSON.parse(i1)
            console.log(i1)
            if(!i1.includes("null")){
                localStorage.setItem("role","restaurant");
                localStorage.setItem("email",this.state.username);
               // localStorage.setItem("fullname",data)
               this.setState({
                   
               })
            }else{
             alert("Could not Login!")
            }
            
        }
           
        );
    
    }

    render(){
        
        let redirectVar = null;
        if(localStorage.getItem('role')=="restaurant"){
            redirectVar = <Redirect to= "/rhome"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Restaurant Login</h2>
                            <p>Please enter your email and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>
                            <div style={{paddingTop:"10px"}}>
                            <a href="/rregister" >Create a new Profile!</a>
                            </div>                 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default graphql(restaurantLoginMutation ,{ name: "restaurantLoginMutation" })(Rlogin);