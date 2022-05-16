import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class Share extends Component {
  state = {
    copyUrl: "http://www.motd.r-e.kr/",
    copied: false,
  };
  closeCopied = () => {
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };
  onCopy = () => {
    this.setState({ copied: true }, () => this.closeCopied());
  };
  render() {
    return (
      <>
        <CopyToClipboard onCopy={this.onCopy} text={this.state.copyUrl}>
          <button className="share-btn">
            <img src="images/external-link.png" alt="url" />
          </button>
        </CopyToClipboard>
        {this.state.copied ? <span>url이 복사되었어요🚀</span> : null}
      </>
    );
  }
}
