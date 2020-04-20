import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import moment from 'moment';

import * as api from './lib/api';

class App extends Component {
  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
  }

  getAPOD = async (date) => {
    if (this.state.loading) return;
    
    this.setState({
      loading: true,
    })

    try {
      const response = await api.getAPOD(date);
      const { date: retrivedDate, url, media_type: mediaType } = response.data;

      if (!this.state.maxDate) {
        this.setState({
          maxDate: retrivedDate
        })
      }

      this.setState({
        date: retrivedDate,
        mediaType,
        url
      })
    } catch(e) {
      console.log(e);
    }

    this.setState({
      loading: false,
    })
  }

  handlePrev = () => {
    const {date} = this.state;
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(prevDate);
  }

  handleNext = () => {
    const {date, maxDate} = this.state;
    if (date === maxDate) return;

    const prevDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(prevDate);
  }

  componentDidMount(){
    this.getAPOD();
  }

  render() {
    const {url, mediaType, loading} = this.state;
    const {handlePrev, handleNext} = this;
    return (
      <div>
        <ViewerTemplate
          spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext} />}
          viewer={(
            <Viewer 
              url={url}
              mediaType={mediaType}
              loading={loading}
            />
          )}
        />
      </div>
    );
  }
}

export default App;