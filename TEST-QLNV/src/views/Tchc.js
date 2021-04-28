import React, { Component } from 'react';

import { 
    Card,
    CardBody,
    Row,
    Label,
    Input,
    FormGroup,
    Table,
    Col,
    CardTitle
} from "reactstrap";
import Button from "reactstrap/lib/Button";
import CardHeader from "reactstrap/lib/CardHeader";
class Tchc extends Component {
    constructor(props) {
        super(props);
        this.state = {
          trangthai:true
        }
    }

    

    render() {
        console.log('abc',this.state);
        return (
            <div style={{background: 'rgba(203,203,210,.15)'}} className="content">
                <Row>
                    <Col md="8">
                        <Card className="abc">               
                            <CardHeader>
                                <FormGroup row>
                                    <Label md="4"  sm={6} tag="h6">Danh sách yêu cầu chỉnh sửa</Label>
                                </FormGroup>
                      </CardHeader>   
                        <CardBody>
                          <Table striped>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Lý Do</th>
                                  <th>Nội dung đề suất</th>
                                  <th>Ghi Chú</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>Hư quạt</td>
                                  <td>Thay quạt</td>
                                  <td>Cần gấp</td>
                                  
                                  <td>
                                    <Button size="sm" onClick={this._doiTrangThai} color="success">Điều Phối</Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>Hư bàn phím</td>
                                  <td>Thay bàn phím</td>
                                  <td>Cần gấp</td>
                                  
                                  <td>
                                      <Button size="sm" onClick={this._doiTrangThai} color="success">Điều Phối</Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>Hư chuột</td>
                                  <td>Thay chuột</td>
                                  <td>Không gấp</td>
                                  
                                  <td>
                                      <Button size="sm" onClick={this._doiTrangThai} color="success">Điều Phối</Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>5</td>
                                  <td>Hư màn hình</td>
                                  <td>Thay màn hình</td>
                                  <td>Cần gấp</td>
                                  <td>
                                      <Button size="sm" onClick={this._doiTrangThai} color="success">Điều Phối</Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                      </CardBody>
                    </Card>
                  </Col>
                    <Col md="4">
                        {this._viewEdit()}
                    </Col>
                    
                </Row>
            </div>
        );
    }
    _doiTrangThai = () =>{
      this.setState({
          trangthai: !this.state.trangthai
      });
  }
  _viewEdit(){
      if(this.state.trangthai === true){
          return(
            <Card className="abc">
            <CardHeader>
              <CardTitle tag="h3">
                YÊU CẦU SỮA CHỮA</CardTitle>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label tag="h5">Lý Do</Label>
                <Input value="Hư Quạt" onChange={this.onchangValue} type="text" name="authorname" id="" placeholder="nhập lý do nhu cầu sửa chữa" />
            
              </FormGroup>
              <FormGroup>
                <Label tag="h5">Nội dung đề xuất</Label>
                <Input value="Thay Quạt" onChange={this.onchangValue} type="text" name="note" id="" placeholder="Muốn làm gì với thiết bị đó" />
              </FormGroup>
              <FormGroup>
                <Label tag="h5">Chọn Bộ Phận Kỹ Thuật</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Kỹ Thuật 1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <Button color="success" onClick={this.onSubmit}>Xác Nhận</Button>
              <Button onClick={this._doiTrangThai}>Thoát</Button>
           </CardBody>              
         </Card>
      );
    }
  }
   
}

export default Tchc;
