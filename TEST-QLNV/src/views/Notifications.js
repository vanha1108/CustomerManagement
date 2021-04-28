
import React from "react";
import axios from 'axios';
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TableRow from "components/TableRow/TableRowDoc.js";
import {Redirect } from "react-router-dom";
import TableRowSearch from "components/TableRow/TableRowSearch.js";
// reactstrap components
import { 
  Card,
  CardBody,
  Row,
  Label,
  Input,
  FormGroup,
  Table,
  CardTitle,
  Col
} from "reactstrap";
import CardHeader from "reactstrap/lib/CardHeader";
import Button from "reactstrap/lib/Button";

class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitTheme = this.onSubmitTheme.bind(this);
    this.onSubmitEditUser = this.onSubmitEditUser.bind(this);
    this.state = {
      data:[],
      dataedituser:[],
      trangthai:false,
      trangthaimain:true,
      trangthaiserarch:false,
      trangthaiedit:false,
      idsubjectView:"",
      datadoc:[],
      code: "",
      firstsname: "",
      lastname: "",
      sex: "",
      dob: "",
      phonenumber: "",
      email:"",
      address: "",
      totalmoney: "",
      visit: "",
      level: "",
      purchases: "",
      newfirst:"",
      newlast:"",
      newsex:"",
      newdob:"",
      newphone:"",
      newaddress:"",
      newemail:"",
      newtotalmonney:"",
      newlevel:"",
      newvisit:"",
      newpurchases:"",
      regexp : /^[0-9\b]+$/
    }
  }
  // componentDidMount() {
  //   axios.get('/api/doc/all')
  //       .then(response => {
  //           console.log(response.data.listdoc);
  //           this.setState({data: response.data.listdoc});
  //       })
  //       .catch(function (error) {
  //           console.log(error);
  //       })
  // }

  //submit
  onSubmitTheme(event){
    event.preventDefault();
    
    if(this.state.idsubjectView==='')
    {
      
      this.state.idsubjectView=this.getFirstTheme();
    }
   
    event.preventDefault();
    var idsubject = this.state.idsubjectView
    
    axios.get('/api/doc/subject/'+idsubject)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        datadoc:res.data.lstDoc
      });
    })
  }
  onChangeValue(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if(!this.state.regexp.test(this.state.visit)){
      return alert('Please enter number for visit');
    }
    if(!this.state.regexp.test(this.state.purchases)){
      return alert('Please enter number for purchases');
    }
    if(
      this.state.code!==''&&
      this.state.firstname!==''&&
      this.state.lastname!==''&&
      this.state.sex!==''&&
      this.state.dob!==''&&
      this.state.phonenumber!==''&&
      this.state.address!==''&&
      this.state.email!==''&&
      this.state.totalmoney!==''&&
      this.state.visit!==''&&
      this.state.purchases!==''&&
      this.state.level!=='')
    {
      const formData = {
        code: this.state.code,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        sex: this.state.sex,
        birthday: this.state.dob,
        phone: this.state.phonenumber,
        address: this.state.address,
        email:this.state.email,
        totalmoney: this.state.totalmoney,
        visit: this.state.visit,
        purchases: this.state.purchases,
        level: this.state.level
      };
  
      console.log("data",formData);
      axios
        .post("/customer/", formData)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("add user success");
            this.setState({
              data:[...this.state.data,formData],
              trangthai:!this.state.trangthai,
              trangthaimain:!this.state.trangthaimain

            })
          }
          else
          {
            toast.error("username already exists!");
          }
          
        })
        .catch((err) => {
          toast.error(`Upload Fail with status: ${err.statusText}`);
        });
    }
    else
    {
      alert('please fill out all information');
    }
    
  }
  onSubmitEditUser(event){
    event.preventDefault();
    const formEdit={
      firstname:'',
      lastname:'',
      birthday:'',
      sex:'',
      address:'',
      phone:'',
      email:'',
      totalmonney:'',
      visit:'',
      level:'',
      purchases:'',
    };
      if(this.state.newfirst!==''){
        formEdit.firstname = this.state.newfirst;
      }
      else{
        formEdit.firstname = this.state.dataedituser.firstname;
      }
      if(this.state.newlast!==''){
        formEdit.lastname = this.state.newlast;
      }
      else{
        formEdit.lastname=this.state.dataedituser.lastname;
      }
      if(this.state.newsex!==''){
        formEdit.sex = this.state.newsex;
      }
      else{
        formEdit.sex = this.hienThiSex1();
      }
      if(this.state.newdob!==''){
        formEdit.birthday = this.state.newdob;
      }
      else{
        formEdit.birthday = this.state.dataedituser.birthday;
      }
      if(this.state.newphone!==''){
        formEdit.phone= this.state.newphone;
      }
      else{
        formEdit.phone= this.state.dataedituser.phone;
      }
      if(this.state.newaddress!==''){
        formEdit.address= this.state.newaddress;
      }
      else{
        formEdit.address=this.state.dataedituser.address;
      }
      if(this.state.newemail!==''){
        formEdit.email= this.state.newemail;
      }
      else{
        formEdit.email=this.state.dataedituser.email;
      }
      if(this.state.newtotalmonney!==''){
        formEdit.totalmoney= this.state.newtotalmonney;
      }
      else{
        formEdit.totalmoney=this.state.dataedituser.totalmoney;
      }
      if(this.state.newvisit!==''){
        formEdit.visit= this.state.newvisit;
      }
      else{
        formEdit.visit=this.state.dataedituser.visit;
      }
      if(this.state.newlevel!==''){
        formEdit.level= this.state.newlevel;
      }
      else{
        formEdit.level=this.state.dataedituser.level;
      }
      if(this.state.newpurchases!==''){
        formEdit.purchases= this.state.newpurchases;
      }
      else{
        formEdit.purchases=this.state.dataedituser.purchases;
      }
      console.log(formEdit)
      axios.put('/customer/'+this.state.dataedituser.code,formEdit)
      .then((res)=>{
        if(res.data.success===true)
        {
          toast.success(`${res.data.message}`);
        }
        else
        {
          toast.error(`${res.data.message}`);
        }
      })
  }
  onClickEdit = (user) => {
    console.log("ket noi ok");
    console.log(user);
    this.setState({
      dataedituser: user,
    });
  };
  //truyen data
  tabRow=()=>this.state.data.map((object,i)=>(
    <TableRow
    onView={() => this.onClickEdit(object)}
    onCHangeEdit={() => this.thayDoiTrangThaiEdit()}
    obj={object} key={i}
    />
  ))

  //xu ly nut va trang thai
  checkNut(){
    if(this.state.trangthai===false){
      return <Button onClick={()=>this.thayTrangThai()} size="sm" md="2">+</Button>;    
    }
    else{
      return <Button onClick={()=>this.thayTrangThai()} size="sm" md="2">-</Button>
    }
  }
  thayTrangThai=()=>{
    this.setState({
      trangthai: !this.state.trangthai,
      trangthaimain: !this.state.trangthaimain
    });
  }
  thayDoiTrangThaiEdit(){
    this.setState({
      trangthaiedit: !this.state.trangthaiedit,
      trangthaimain: !this.state.trangthaimain
    });
  }
  hienThiDate=()=>{
    //document.getElementsByName('dob').value=this.state.dataedituser.dob;

    var d = new Date(this.state.dataedituser.birthday),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      return [year, month, day].join('-');
  }
  hienThiSexMale=()=>{
    if(this.state.dataedituser.sex == null)
      return "";
      console.log("'DDD");
    if(this.state.dataedituser.sex===true) {
      console.log("MMMMM");
      return "Male";
    }
    // else if (this.state.dataedituser.sex===false) { 
    //   console.log("RRRRRRMMM");
    //   return "";}
  
  }
  hienThiSexFemale=()=>{

    if(this.state.dataedituser.sex==null) {
      console.log(this.state.dataedituser.sex);
      return "";
    }
    if(this.state.dataedituser.sex===false) {
      console.log("FFFFFFFF");
      return "Female";
    } 
  //   else if(this.state.dataedituser.sex===true) {console.log("RRRRRRRRRFFFMMM");
  // return "";}
    
  }
  hienThiSex1=()=>{
    
    if(this.state.dataedituser.sex===true) {
      
      
      return "Male";
    }  else if(this.state.dataedituser.sex===false) {
      
      return "Female";
    }
  }
  //view form
  hienThiForm() {
    if (this.state.trangthai === true) {
      return (
        <Col md={6}>
          <Card className="abc">
            <CardHeader>
              <CardTitle>
                <Label tag="h4">Create Employee</Label>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Label sm={3}>Code</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="code"
                    id=""
                    placeholder="Input code"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>FirstName</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="firstname"
                    id=""
                    placeholder="Input firstname"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>LastName</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="lastname"
                    id=""
                    placeholder="Input lastname"
                  />
                </Col>
              </FormGroup>
              <FormGroup tag="fieldset" row>
                <Label sm={4}>Sex</Label>
                <Col sm={8}>
                  <FormGroup row check>
                    <Label sm={4} check>
                      <Input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={this.state.sex === "Male"}
                        onChange={this.onChangeValue}
                      />{" "}
                      Male
                    </Label>
                    <Label sm={4} check>
                      <Input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={this.state.sex === "Female"}
                        onChange={this.onChangeValue}
                      />{" "}
                      Female
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>DOB</Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="dob"
                    id=""
                    placeholder="date placeholder"
                    onChange={this.onChangeValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Phone</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="phonenumber"
                    id=""
                    placeholder="Input phone number"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Address</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="address"
                    id=""
                    placeholder="Input address"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Email</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="email"
                    id=""
                    placeholder="Input email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Money</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="totalmoney"
                    id=""
                    placeholder="Input money"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Visit</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="visit"
                    id=""
                    placeholder="Input visit"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Level</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="level"
                    id=""
                    placeholder="Input level"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Purchases</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="purchases"
                    id=""
                    placeholder="Input Purchases"
                  />
                </Col>
              </FormGroup>
              <Button onClick={this.onSubmit} color="primary">
                Add user
              </Button>
              <Button onClick={() => this.thayTrangThai()}>Cancel</Button>
            </CardBody>
          </Card>
        </Col>
      );
    }
  }
  hienThiFormMain(){
    if(this.state.trangthaimain===true){
      return(
        <Col md="12">
            <Card className="abc">
              <CardHeader>
                <FormGroup row className="haiben">
                  <Label md="10" tag="h6">
                    List Customer
                  </Label>
                 
                  {this.checkNut()}
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" striped>
                  <thead className="text-primary">
                    <tr>
                      <th>Code</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Sex</th>
                      <th>Date of birth</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Total Money</th>
                      <th>Visit</th>
                      <th>Level</th>
                      <th>Purchases</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
   
                     {this.tabRow()}
    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
      );
    }
  }
  hienThiFormEdit(){
    if(this.state.trangthaiedit===true)
    {
      return(
        <Col md={6}>
          <Card className="abc">
            <CardHeader>
              <CardTitle>
                <Label tag="h4">Edit Customer</Label>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Label sm={3}>FirstName</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newfirst"
                    id=""
                    defaultValue={this.state.dataedituser.firstname ||''}
                    placeholder="Input firstname"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>LastName</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newlast"
                    id=""
                    defaultValue={this.state.dataedituser.lastname ||''}
                    placeholder="Input email"
                  />
                </Col>
              </FormGroup>
              <FormGroup tag="fieldset" row>
                <Label sm={4}>Sex</Label>
                <Col sm={8}>
                  <FormGroup row check>
                    <Label sm={4} check>
                      <Input
                        id="rMale"
                        type="radio"
                        name="newsex"
                        value="Male"
                        //checked={this.state.newsex==="Male"}
                        defaultChecked={this.state.newSex=this.hienThiSexMale()||this.state.newSex==="Male"}
                        onChange={this.onChangeValue}
                      />{" "}
                      Male
                    </Label>
                    <Label sm={4} check>
                      <Input
                        id="rFemale"
                        type="radio"
                        name="newsex"
                        value="Female"
                        //checked={this.state.newsex==="Female"}
                        defaultChecked={this.state.newSex=this.hienThiSexFemale()||this.state.newSex==="Female"}
                        onChange={this.onChangeValue}
                      />{" "}
                      Female
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>DOB</Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="newdob"
                    id=""
                    defaultValue={this.hienThiDate() ||''}
                    placeholder="date placeholder"
                    onChange={this.onChangeValue}
                  
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Phone Number</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newphone"
                    id=""
                    defaultValue={this.state.dataedituser.phone ||''}
                    placeholder="Input email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Address</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newaddress"
                    id=""
                    defaultValue={this.state.dataedituser.address ||''}
                    placeholder="Input email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Email</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newemail"
                    id=""
                    defaultValue={this.state.dataedituser.email ||''}
                    placeholder="Input email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Money</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newtotalmonney"
                    id=""
                    defaultValue={this.state.dataedituser.totalmoney ||''}
                    placeholder="Input email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Visit</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newvisit"
                    id=""
                    defaultValue={this.state.dataedituser.visit ||''}
                    placeholder="Input visit"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Level</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newlevel"
                    id=""
                    defaultValue={this.state.dataedituser.level ||''}
                    placeholder="Input level"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Purchases</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newpurchases"
                    id=""
                    defaultValue={this.state.dataedituser.purchases ||''}
                    placeholder="Input purchases"
                  />
                </Col>
              </FormGroup>
              <Button onClick={this.onSubmitEditUser} color="primary">
                Update user
              </Button>
              <Button onClick={()=>this.thayDoiTrangThaiEdit()}>Cancel</Button>
            </CardBody>
          </Card>
        </Col>
      );
    }
  }

  //lay data
  componentDidMount() {
    axios.get('/customer/')
        .then(response => {
            console.log('$$$$$',response.data.customers);
            this.setState({data: response.data.customers});
        })
        .catch(function (error) {
            console.log(error);
        })
  }
  
  getFirstTheme=()=>{
    
    for(let i in this.state.datatheme){
      return this.state.datatheme[i].idtheme;
    }
    return "";
  }

  //render
  render() {
    console.log('@@@',this.state);
    if (!localStorage.getItem('authorization')) return <Redirect to="/login" />
    return (
        <div style={{background: 'rgba(203,203,210,.15)'}} className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            {this.hienThiForm()}
            {this.hienThiFormEdit()}
            {this.hienThiFormMain()}
          </Row>
          <ToastContainer />
        </div>
    );
  }
}

export default Notifications;
