import React, { Component } from 'react';

import { 
    Card,
    CardBody,
    Row,
    Label,
    Input,
    FormGroup,
    Table,
    Col
} from "reactstrap";
import Button from "reactstrap/lib/Button";
import CardHeader from "reactstrap/lib/CardHeader";
class Manager extends Component {
    render() {
        return (
            <div style={{background: 'rgba(203,203,210,.15)'}} className="content">
                <Row>
                    <Col md="10">
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
                              <Button size="sm" onClick={this.delete} color="danger">Xóa</Button>
                              <Button size="sm" onClick={this.download1} color="info">Chỉnh Sửa</Button>
                              <Button size="sm" onClick={this.download1} color="success">Xác Nhận</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Hư bàn phím</td>
                            <td>Thay bàn phím</td>
                            <td>Cần gấp</td>
                            
                            <td>
                              <Button size="sm" onClick={this.delete} color="danger">Xóa</Button>
                              <Button size="sm" onClick={this.download1} color="info">Chỉnh Sửa</Button>
                              <Button size="sm" onClick={this.download1} color="success">Xác Nhận</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Hư chuột</td>
                            <td>Thay chuột</td>
                            <td>Không gấp</td>
                            
                            <td>
                              <Button size="sm" onClick={this.delete} color="danger">Xóa</Button>
                              <Button size="sm" onClick={this.download1} color="info">Chỉnh Sửa</Button>
                              <Button size="sm" onClick={this.download1} color="success">Xác Nhận</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Hư màn hình</td>
                            <td>Thay màn hình</td>
                            <td>Cần gấp</td>
                            <td>
                              <Button size="sm" onClick={this.delete} color="danger">Xóa</Button>
                              <Button size="sm" onClick={this.download1} color="info">Chỉnh Sửa</Button>
                              <Button size="sm" onClick={this.download1} color="success">Xác Nhận</Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                </CardBody>
              </Card>
            </Col>
                </Row>
            </div>
        );
    }
}

export default Manager;
