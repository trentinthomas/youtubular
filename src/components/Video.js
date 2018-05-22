import React from 'react';

import VideoProgressBar from './VideoProgressBar';
import { notification } from 'antd';
import ytdl from 'ytdl-core';
const fs = require('fs');
const path = require('path');
const os = require('os');

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      info: null,
      loaded: false,
      totalDownloaded: 0,
      totalLength: 0
    };

    let video = ytdl(props.url, {quality: 'highestaudio', filter: 'audioonly'});
    video.on('info', (info) => {
      this.setState({info, loaded: true})
      video.pipe(fs.createWriteStream(path.join(os.homedir(),'Downloads', `${info.title}.mp3`))).on('finish', () => {
        notification['success']({
          message: 'Download Complete',
          description: `${this.state.info.title} is done downloading`
        });
      })
    })

    video.on('progress', (chunk, totalDownloaded, totalLength) => {
      this.setState({totalDownloaded, totalLength});
    });
  }

  render() {
    let { loaded } = this.state;
    return (
      <div>
        {loaded &&
          <VideoProgressBar
            totalLength={this.state.totalLength}
            totalDownloaded={this.state.totalDownloaded}
            info={this.state.info}/>
        }
      </div>
    );
  }
}
