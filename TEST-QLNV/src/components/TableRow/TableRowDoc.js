import React, { Component } from 'react';
import {Button} from "reactstrap";
import axios from 'axios';
//import download from 'js-file-download';
import { ToastContainer, toast } from "react-toastify";
class TableRowDoc extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        var result = window.confirm("Are you sure you want to delete")
        if(result){
         
          var code = this.props.obj.code;
          axios
          .delete("/customer/" + code)
          .then((res)=>{
            console.log(res.data.message);
            if(res.data.success===true){
              toast.success('delete success');
              setTimeout(function () {
                window.location.reload(1);
              },1000);
              
            }
            else
            {
              toast.error(`${res.data.message}`);
            }
          })
          .catch((err) => console.log(err));
        }
        else
        {
          console.log('vao day')
        }
    }
    onClickEdit=()=>{
        this.props.onView();
        this.props.onCHangeEdit();
    }
    hienThiSex=()=>{
        if(this.props.obj.sex === true) return "Male";
        else {return "Female"}
    }
    hienThiNgay=()=>{
        var date = new Date(this.props.obj.birthday);
        return date.toLocaleDateString();
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.code}
                </td>
                <td>
                    {this.props.obj.firstname}
                </td>
                <td>{this.props.obj.lastname}</td>
                <td>
                    {this.hienThiSex()}
                </td>
                <td>
                    {this.hienThiNgay()}
                </td>
                <td>
                    {this.props.obj.phone}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.address}
                </td>
                <td>
                    {this.props.obj.totalmoney}
                </td>
                <td>
                    {this.props.obj.visit}
                </td>
                <td>
                    {this.props.obj.level}
                </td>
                <td>
                    {this.props.obj.purchases}
                </td>
                <td>
                <Button size="sm" onClick={this.delete} color="danger">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                  className="h-6 w-6" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                  style={{width:'20px',height:'20px',color:'#fff'}}
                                >
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                  </path>
                                </svg>
                              </Button>
                              <Button size="sm" onClick={()=>this.onClickEdit()} color="success">
                              <svg xmlns="http://www.w3.org/2000/svg" 
                                  className="h-6 w-6" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor" 
                                  style={{width:'20px',height:'20px',color:'#fff'}}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Button>
                            <ToastContainer />
                </td>
                
            </tr>
        );
    }
}

export default TableRowDoc;