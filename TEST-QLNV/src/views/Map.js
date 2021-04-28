
import React from "react";
import axios from 'axios';
// react plugin for creating notifications over the dashboard
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableRowCheck from "components/TableRow/TableRowcheck.js";
import {Redirect } from "react-router-dom";
//import history from "history.js";
// reactstrap components
//import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import {  
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Label,
  Input,
  FormGroup,
  FormText,
  CustomInput,
  Table,
  Col
} from "reactstrap";
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.onchangeFile = this.onchangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onchangValue = this.onchangValue.bind(this);
    this.onSaveFile = this.onSaveFile.bind(this);
    this.state = {
      datacheck:[],
      datalist:[],
      filedoc:'',
      authorname:'',
      note:'',
      idsubject:'',
      idDoc:'',
      disabled:true,
      iduser:'',
      regexp : /^[0-9\b]+$/,
      regexp1 :/[’“”%&!’#√.*+?,;^${}()_`'"|[\]\\//]/,
      rex: /[0-9]/,
    }
  }
  
  onchangeFile(event){
    this.setState({
      filedoc:event.target.files[0]
    })
  }
  onchangValue(event){
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value
    })
  }
  componentDidMount() {
    axios.get('/api/theme/alltheme',{
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("authorization")),
          },
        })
        .then(response => {
            console.log(response.data.listtheme);
            this.setState({datalist: response.data.listtheme});
            console.log('daaaaaaaaaaaaaaaaaaaaaa');
            console.log(this.getFirstTheme());
            
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  onSubmit(event){
    event.preventDefault()
    if(this.state.idsubject===''){
      this.state.idsubject=this.getFirstTheme();
    }
    if(!this.state.regexp.test(this.state.idDoc)){
      return alert('Please enter number for document code');
    }
    if(this.state.rex.test(this.state.authorname)||this.state.regexp1.test(this.state.authorname))
    {
      return alert('Please enter characters for the posters name');
    }
    if(this.state.idDoc!==''&&this.state.filedoc!==''&&this.state.authorname!==''&&this.state.idsubject!==''  ){
      const formData = new FormData()
        formData.append('filedoc', this.state.filedoc)
        formData.append('authorname',this.state.authorname)
        formData.append('note',this.state.note)
        formData.append('idDoc',this.state.idDoc)
        formData.append('idsubject',this.state.idsubject)
        formData.getAll('filedoc','authorname','idsubject','note','idDoc')
        console.log(formData);
        axios.post("/api/doc/upload", formData,{
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("authorization")),
          },
        })
        .then((res) => {
          console.log(res.data.message);
          if(res.data.arrDuplicate)
          {           
            this.setState({datacheck: res.data.arrDuplicate,disabled:false});
            console.log('yess');          
          }
          else{
            this.setState({idDoc:'',authorname:'',note:''})
            toast.success('Upload Successful')
            setTimeout(function () {
              window.location.reload(1);
            },1000);
          } 
        })
        .catch(err => {toast.error(`Upload Fail with status: ${err.statusText}`);});
    }
    else{
      alert('fill all');
    }
        
     
  }
  onSaveFile(event){
        
    event.preventDefault()
    const formData1 = new FormData()
    formData1.append('filedoc', this.state.filedoc)
    formData1.append('authorname',this.state.authorname)
    formData1.append('note',this.state.note)
    formData1.append('idDoc',this.state.idDoc)
    formData1.append('idsubject',this.state.idsubject)
    formData1.getAll('filedoc','authorname','idsubject','note','idDoc')
    console.log(formData1);
    axios.post("/api/doc/save", formData1,{
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("authorization")),
      },
    })
    .then((res) => {
        this.setState({disabled:true})
        toast.success('Upload Successful')
        console.log('vao day roi ne')
        setTimeout(function () {
          window.location.reload(1);
        },1000);
    })
    .catch(err => {toast.error(`Upload Fail with status: ${err.statusText}`);});     
  }
  tabRowCheck(){
    return this.state.datacheck.map(function (object,i){
      return <TableRowCheck obj={object} key={i}/>;
    });
  } 
  hienThiFormSave(){
    if(this.state.disabled===false){
      return(
        <Card>
          <CardHeader>
            <CardTitle tag="h3">LIST DOCUMENT DUPLICATE</CardTitle>
          </CardHeader>
          <CardBody>
            <Table striped>
              <thead>
                <tr>
                  <th>ID Document</th>
                  <th>Filename</th>
                  <th>CATEGORY</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                         
                  {this.tabRowCheck()}
                                    
              </tbody>
            </Table>
              <Button disabled={this.state.disabled}  onClick={this.onSaveFile}>Save</Button>
              <Button disabled={this.state.disabled} onClick={()=>this.onCancelField()} >Cancel</Button>
          </CardBody>
        </Card>
      );
    }
  }
  onCancelField(){
    this.setState({disabled:true});
  }
  getFirstTheme=()=>{
  
    for(let i in this.state.datalist){
      return this.state.datalist[i].idtheme;
    }
    return "";
  }
  render() {
    if (!localStorage.getItem('authorization')) return <Redirect to="/login" />
    return (
        <div style={{background: 'rgba(203, 203, 210, 0.15)',fontfamily:'segoe'}} className="content">
          <Row>
            <ToastContainer />
            <Col md="4">
              <Card className="abc">
                <CardHeader>
                  <CardTitle tag="h3">
                    YÊU CẦU SỮA CHỮA</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label tag="h5">Lý Do</Label>
                    <Input value={this.state.authorname} onChange={this.onchangValue} type="text" name="authorname" id="" placeholder="nhập lý do nhu cầu sửa chữa" />
                
                  </FormGroup>
                  <FormGroup>
                    <Label tag="h5">Nội dung đề xuất</Label>
                    <Input value={this.state.note} onChange={this.onchangValue} type="text" name="note" id="" placeholder="Muốn làm gì với thiết bị đó" />
                  </FormGroup>
                  <Button onClick={this.onSubmit}>Gửi Yêu Cầu</Button>
               </CardBody>              
             </Card>
            </Col>
            <Col md="6">
              {this.hienThiFormSave()}
            </Col>
          </Row>
        </div>
    );
  }
}
export default Map;
