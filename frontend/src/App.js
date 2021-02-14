import React, { Component } from "react";
import InputField from "./components/InputField";
import MemeDisplay from "./components/MemeDisplay";
import NavBar from "./components/navbar";
import axios from "./utils/Axios";
import { Grid } from "semantic-ui-react";

class App extends Component {
  state = {
    memes: [],
  };

  //Fetching memes from database
  componentDidMount() {
    axios.get("/memes").then((res) => {
      const result = res.data;
      this.setState({ memes: result.reverse() });
    });
  }

  //Deleting selected Meme by ID from the database
  deleteMeme = (id) => {
    axios.delete(`/memes/${id}`).then((res) => {
      console.log(res.data);

      const memes = this.state.memes.filter((item) => item.id !== id);
      this.setState({ memes });
      window.location = "/memes"; //This line of code will redirect you once the submission is succeed
    });
  };

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="App">
          <Grid divided="vertically">
            <Grid.Row floated="right">
              <Grid.Column>
                <InputField
                  meme={this.state.memes}
                  sendMeme={() => this.sendMeme}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <MemeDisplay
                  meme={this.state.memes}
                  onDelete={this.deleteMeme}
                  onUpdate={this.updateMeme}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
