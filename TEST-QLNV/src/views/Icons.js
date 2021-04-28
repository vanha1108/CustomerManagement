import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  FormGroup,
  Button,
  Label,
} from "reactstrap";
// reactstrap components
//import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import TableRowUser from "components/TableRow/TableRowUser.js";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";
class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectValue = this.onSelectValue.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.onChangeNewName= this.onChangeNewName.bind(this);
    this.onSubmitEditUser=this.onSubmitEditUser.bind(this);
    this.state = {
      data1: [],
      dataedituser: [],
      code:"",
      firstsname: "",
      lastname: "",
      sex: "",
      dob: "",
      phonenumber: "",
      email: "",
      address: "",
      username: "",
      password: "",
      trangthai: false,
      trangthaiedit: false,
      trangthaiedit1: false,
      newSex:"",
      newfirst:"",
      newlast:"",
      newsex:"",
      newdob:"",
      newphone:"",
      newaddress:"",
      newpassword: "",
    };
  }

  // thêm user
  onChangeValue(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  }
  onSelectValue(event) {
    this.setState({
      role: event.target.select,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if(this.state.iduser!==''&&this.state.firstname!==''&&this.state.lastname!==''
    &&this.state.sex!==''&&this.state.dob!==''&&this.state.phonenumber!==''&&this.state.address!==''
    &&this.state.username!==''&&this.state.password!=='')
    {
      const formData = {
        code: this.state.code,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        sex: this.state.sex,
        birthday: this.state.dob,
        phone: this.state.phonenumber,
        email: this.state.email,
        address: this.state.address,
        username: this.state.username,
        password: this.state.password,
      };
  
      console.log(formData);
      axios
        .post("/employee", formData)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("add user success");
            this.setState({
              data1:[...this.state.data1,formData]
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
  // hiển thị list user
  componentDidMount() {
    axios
      .get("/employee", {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("authorization")),
        },
      })
      .then((response) => {
        this.setState({ data1: response.data.employees });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  tabUser = () =>
    this.state.data1.map((object, i) => (
      <TableRowUser
        onView={() => this.onClickEdit(object)}
        obj={object}
        key={i}
        onChangeTT={() => this.thayDoiTrangThaiEdit()}
        onCHangeEdit={() => this.thayDoiTrangThaiEdit1()}
      />
    ));

  // Check trạng thái thay đổi button
  checkNut() {
    if (this.state.trangthai === false) {
      return (
        <Button onClick={() => this.thayTrangThai()} size="sm" md="2">
          +
        </Button>
      );
    } else {
      return (
        <Button onClick={() => this.thayTrangThai()} size="sm" md="2">
          -
        </Button>
      );
    }
  }
  // click thay đổi trạng thái
  thayTrangThai = () => {
    this.setState({
      trangthai: !this.state.trangthai,
    });
  };
  // click trang thái thay đổi form
  hienThiForm() {
    if (this.state.trangthai === true) {
      return (
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
                <Label sm={3}>UserName</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="username"
                    id=""
                    placeholder="Input username"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Password</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="password"
                    name="password"
                    id=""
                    placeholder="Input password"
                  />
                </Col>
              </FormGroup>
              <Button onClick={this.onSubmit} color="primary">
                Add Employee
              </Button>
              <Button onClick={() => this.thayTrangThai()}>Cancel</Button>
            </CardBody>
          </Card>
      );
    }
  }
  onClickEdit = (user) => {
    console.log("ket noi ok");
    console.log(user);
    this.setState({
      dataedituser: user,
    });
  };
  thayDoiTrangThaiEdit() {
    this.setState({
      trangthaiedit: !this.state.trangthaiedit
    });
  }
  thayDoiTrangThaiEdit1(){
    this.setState({
      trangthaiedit1: !this.state.trangthaiedit1
    });
  }
  hienThiFormEdit(){
    if(this.state.trangthaiedit1===true)
    {
      return(
        <Card className="abc">
            <CardHeader>
              <CardTitle>
                <Label tag="h4">Edit Employee</Label>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Label sm={3}>FirstName</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeNewName}
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
                    placeholder="Input phonenumber"
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
                <Label sm={3}>Password</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.onChangeValue}
                    type="text"
                    name="newpassword"
                    id=""
                    defaultValue={this.state.dataedituser.password ||''}
                    placeholder="Input password"
                  />
                </Col>
              </FormGroup>
              <Button onClick={this.onSubmitEditUser} color="primary">
                Update user
              </Button>
              <Button onClick={()=>this.thayDoiTrangThaiEdit1()}>Cancel</Button>
            </CardBody>
          </Card>
      );
    }
  }
  hienThiFormMain(){
    if(this.state.trangthaiedit===false&&this.state.trangthaiedit1===false&this.state.trangthai===false){
      return(
        <Col md="12">
            <Card className="abc">
              <CardHeader>
                <FormGroup row className="haiben">
                  <Label md="10" tag="h6">
                    List user
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
                      <th>Username</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.tabUser()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
      );
    }
  }
  onSubmitEdit(event) {
    event.preventDefault();
    if(this.state.currentPassword!==''&&this.state.newPassword!=='') {
      const b = {
        iduser: this.state.dataedituser.iduser,
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
      };
      console.log(b);
      axios.post("/api/user/changepass", b).
      then((res) => {
        if(res.data.success===true) {
          toast.success('change password success');
        }
        else
        {
          toast.error('current password is incorrect');
        }
      });
    }
    else
    {
      alert('Please fill out all information');
    }
    
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
  hienThiSex1=()=>{
    
    if(this.state.dataedituser.sex===true) {
      
      
      return "Male";
    }  else if(this.state.dataedituser.sex===false) {
      
      return "Female";
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
      password:'',
    };
      if(this.state.newfirst!==''){
        formEdit.firstname= this.state.newfirst;
      }
      else{
        formEdit.firstname=this.state.dataedituser.firstname;
      }
      if(this.state.newlast!==''){
        formEdit.lastname= this.state.newlast;
      }
      else{
        formEdit.lastname=this.state.dataedituser.lastname;
      }
      if(this.state.newsex!==''){
        formEdit.sex= this.state.newsex;
      }
      else{
        formEdit.sex=this.hienThiSex1();
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
        formEdit.phone=this.state.dataedituser.phone;
      }
      if(this.state.newaddress!==''){
        formEdit.address= this.state.newaddress;
      }
      else{
        formEdit.address=this.state.dataedituser.address;
      }
      if(this.state.email!==''){
        formEdit.email= this.state.newemail;
      }
      else{
        formEdit.email=this.state.dataedituser.email;
      }
      if(this.state.newpassword!==''){
        formEdit.password = this.state.newpassword;
      }
      else{
        formEdit.password=this.state.dataedituser.password;
      }
      console.log(formEdit)
      const code = this.state.dataedituser.code;
      axios.put('/employee/'+ code,formEdit)
      .then((res)=>{
        if(res.data.success===true)
        {
          console.log('-----');
          toast.success(`${res.data.message}`);
          this.componentDidMount();
        }
        else
        {
          toast.error(`${res.data.message}`);
        }
      })
    } 
  onChangeNewName(event){
    this.setState({
      newfirst:event.target.value
    });
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
  render() {
    if (!localStorage.getItem("authorization"))  return <Redirect to="/login"/>
    return (
      <div style={{background: 'rgba(203,203,210,.15)'}} className="content">
        <Row>
          {this.hienThiFormMain()}
          <Col md="4">
            {this.hienThiForm()}
            {this.hienThiFormEdit()}
          </Col>
          <Col md="4">
          
          </Col>

          <ToastContainer />
        </Row>
      </div>
    );
  }
}

export default Icons;
