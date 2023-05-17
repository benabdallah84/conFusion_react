import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div key={comments.id}>
        <p>{comments.comment}</p>
        <p>
          -- {comments.author}, {comments.date}
        </p>
        {console.log(comments.id)}
      </div>
    );
  }
}
let RComments = [];
const DishDetail = (props) => {
  const CommentsDetail = (props) => {
    if (props != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {
            (RComments = props.comments.map((comments) => {
              return (
                <div key={comments.id}>
                  <p>{comments.comment}</p>
                  <p>
                    -- {comments.author}, {comments.date}
                  </p>
                  {console.log(comments.id)}
                </div>
              );
            }))
          }
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="row col-12 col-md-12">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        {/* <CommentsDetail comments={props.comments} /> */}
        {RComments}
      </div>
    </div>
  );
};
class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.comment);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" className="bg-primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default DishDetail;
