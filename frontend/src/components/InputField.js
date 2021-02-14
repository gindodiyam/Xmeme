import React, { Component } from "react";
import { Button, Form, Grid, Header, Label, Segment } from "semantic-ui-react";
import axios from "../utils/Axios";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      caption: "",
      url: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  //Submiting meme to the database
  handleSubmit = (event) => {
    event.preventDefault();
    const meme = {
      name: this.state.name,
      caption: this.state.caption,
      url: this.state.url,
    };

    axios
      .post("http://localhost:8081/memes", {
        name: meme.name,
        caption: meme.caption,
        url: meme.url,
      })
      .then((res) => {
        console.log(res.data);
        window.location = "/memes"; //This line of code will redirect you once the submission is succeed
      })
      .catch((error) => console.log(error.response));
  };

  render() {
    const { name, caption, url, sendMeme } = this.state;

    return (
      <div
        style={{
          backgroundImage: `url("data:image/jpeg;base64,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")`,
          //backgroundColor: "hsl(165, 90%, 72%)",
        }}
      >
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ height: "70vh" }}
        >
          <Grid.Column style={{ maxWidth: 550 }}>
            <Label>
              <Header as="h1" color="black" textAlign="center">
                Meme Stream
              </Header>
            </Label>
            <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Enter your name here"
                  value={name}
                  onChange={this.changeHandler}
                  name="name"
                ></Form.Input>
                <Form.Input
                  fluid
                  icon="pencil alternate"
                  iconPosition="left"
                  placeholder="write caption here"
                  value={caption}
                  onChange={this.changeHandler}
                  name="caption"
                />

                <Form.Input
                  fluid
                  icon="server"
                  iconPosition="left"
                  placeholder="Enter your meme URL"
                  value={url}
                  onChange={this.changeHandler}
                  name="url"
                />
                <Button color="teal" fluid size="large">
                  Submit Meme
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default InputField;
