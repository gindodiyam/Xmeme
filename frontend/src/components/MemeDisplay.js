import { Button } from "semantic-ui-react";
import React, { Component } from "react";
import CurremtMeme from "./currentMeme";
import Popup from "reactjs-popup";

class MemeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, selectedMeme: "" };
    this.toggleUpdate = this.toggleUpdate.bind(this);
  }
  toggleUpdate = (meme) => {
    const { show } = this.state;
    this.setState({ show: !show, selectedMeme: meme });
  };

  render() {
    const { meme, onDelete, onUpdate } = this.props; //Destructuring props
    if (meme.length === 0)
      return (
        <h1>
          <center>
            <i>
              Currently there are no memes! <br />
              Please Create one
            </i>
          </center>
        </h1>
      );
    return (
      <div>
        <h1>
          <center>
            <i>Currently there are {meme.length} memes!</i>
          </center>
        </h1>
        <div>
          <div className="ui stackable three column grid ml-4 ">
            {meme.map((meme) => (
              <div
                style={{
                  backgroundColor: "hsl(294, 100%, 90%)",
                }}
                className="column ui segment px-5 "
                key={meme._id}
              >
                <center>
                  <h2 className="font-weight-bold">Posted By : {meme.name}</h2>
                  <h3 className="font-weight-bold">Caption : {meme.caption}</h3>
                  <img className="img-fluid" src={meme.url} />

                  <Popup
                    trigger={
                      <div className="btn btn-success ">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            this.toggleUpdate(meme);
                          }}
                        >
                          Edit Meme
                        </button>
                      </div>
                    }
                    position="right center"
                  >
                    {this.state.show && (
                      <CurremtMeme
                        onUpdate={onUpdate}
                        meme={this.state.selectedMeme}
                      />
                    )}
                  </Popup>
                  <Button
                    negative
                    className="m-4"
                    onClick={() => onDelete(meme._id)}
                  >
                    Delete
                  </Button>
                </center>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MemeDisplay;
