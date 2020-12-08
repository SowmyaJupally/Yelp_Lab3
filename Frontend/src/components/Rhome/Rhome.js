import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import hostAddress from '../constants';

let orderType=null;

class Rhome extends Component {
    constructor(props){
            super(props);
            this.state = {  
                cart: []
            }


    }  
   
    componentDidMount(){
        console.log(cookie.load("email"));
    }
    
    render(){
      
        //if not login
        let redirectVar = null;
        if(localStorage.getItem('role')!="restaurant"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(localStorage.getItem('role')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        
        

        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%",borderRadius:"12px"}}>
                
                </div> 
               
            </div> 
        )
    }
}

export default Rhome;