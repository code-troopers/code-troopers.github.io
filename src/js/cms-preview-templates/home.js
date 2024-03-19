import React from "react";

export default class HomePreview extends React.Component {
  render() {
    const { entry, widgetFor } = this.props;

    return <div>
      <div className="cms mw6">
        <p>{entry.getIn(["data", "description"])}</p>
        {widgetFor("body")}
      </div>
    </div>;
  }
}
