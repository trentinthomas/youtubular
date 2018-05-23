import React from 'react';
import '../assets/css/App.css';
import { Input, Spin, Button, Col, Row } from 'antd';
import ytdl from 'ytdl-core';
import _map from 'lodash/map';

import Video from './Video';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      loading: false
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(evt) {
    this.setState({url: evt.target.value});
  }

  handleSubmit() {
    this.saveFromUrl(this.state.url);
  }

  saveFromUrl(url) {
    let videos = this.state.videos;
    videos.push(url);
    this.setState({videos});
  }

  render() {
    const { videos } = this.state;
    return (
      <div className="youtubular-container">
        <h1 className="title">Youtubular</h1>
        <div>
          <Row>
            <Col offset={4} span={16}>
              <div className="download-container">
                {_map(videos, (video, index) => {
                    return (
                      <Video url={video} key={index}/>
                    );
                  })
                }
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
              <Col offset={4} span={14}>
                <Input
                  placeholder="https://www.youtube.com/watch?v=90VwPOLVYkw"
                  onChange={this.handleUrlChange}/>
              </Col>
              <Col span={4}>
                <Button
                  onClick={this.handleSubmit}>
                  Download
                </Button>
              </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
