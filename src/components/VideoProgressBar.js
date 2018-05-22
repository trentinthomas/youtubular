import React from 'react';
import { Progress } from 'antd';

export default class VideoProgressBar extends React.Component {

  constructor(props) {
    super(props);


  }

  render() {
    const { info } = this.props;
    return(
      <div className="progress-container">
        <img  className="progress-thumbnail" src={info.thumbnail_url}/>
        <div className="progress-bar-container">
          <span className="progress-title">{info.title}</span>
          <Progress percent={Math.floor((this.props.totalDownloaded / this.props.totalLength) * 100)}/>
        </div>
      </div>
    );
  }
}
