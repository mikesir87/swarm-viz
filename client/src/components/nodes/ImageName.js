import * as React from "react";

const IMAGE_PARSE_REGEX = /^(.+):(.*?)(?:@sha256)?:(.*)/;

class ImageName extends React.Component {
  render() {
    const { imageSpec } = this.props;
    const match = imageSpec.match(IMAGE_PARSE_REGEX);
    let value, name, tag, hash;
    if (match === null) {
      name = imageSpec;
      tag = "";
    }
    else {
      [ value, name, tag, hash ] = match;
    }

    return (
        <div className="image-spec-display">
          <span className="image-name">{ name }</span>:<span className="image-tag">{ tag }</span>
        </div>
    );
  }
}

export default ImageName;
