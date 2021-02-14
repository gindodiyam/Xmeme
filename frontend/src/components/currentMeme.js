import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import axios from "../utils/Axios";

class CurremtMeme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      url: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  //Function to update Caption/Url/both of a Meme
  handleUpdate = () => {
    const meme = {
      caption: this.state.caption,
      url: this.state.url,
    };

    axios
      .patch(`/memes/${this.props.meme._id}`, {
        caption: meme.caption,
        url: meme.url,
      })
      .then((res) => {
        //  console.log(res.data);
      })
      .catch((error) => console.log(error.response));
  };

  render() {
    const { caption, url } = this.state;

    return (
      <Form onSubmit={this.handleUpdate(this.props.meme._id)}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="pencil alternate"
            iconPosition="left"
            placeholder="New Caption"
            value={caption}
            onChange={this.changeHandler}
            name="caption"
          />

          <Form.Input
            fluid
            icon="server"
            iconPosition="left"
            placeholder="New URL"
            value={url}
            onChange={this.changeHandler}
            name="url"
          />
          <Button
            color="teal"
            fluid
            size="large"
            onClick={() => (window.location = "/memes")}
          >
            Update Meme
          </Button>
        </Segment>
      </Form>
    );
  }
}

export default CurremtMeme;
