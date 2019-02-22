import * as React from "react";

class FormRow extends React.Component {
  render() {
    const { children, label } = this.props;
    return (
        <div className="form-group">
          <label className="col-md-3 control-label">{ label }</label>
          <div className="col-md-9">
            <div className="form-control-static">{ children }</div>
          </div>
        </div>
    );
  }
}

export default FormRow;
