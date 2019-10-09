import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serverApi from 'lib/serverApi';
// import axios from 'axios';
import tmap from 'utils/tmap';

import './Map.scss';
import Footer from 'components/common/Footer';

class Map extends Component {
  state = {
    center: {
      longitude: '',
      latitude: '',
    },
    map: null,
    activityList: [],
    focusedActivity: null,
  }

  focus = activity => {
    const { center, focusedActivity, map } = this.state;

    const check = activity === center || activity === focusedActivity;
    if (check) {
      this.setState({
        focusedActivity: null,
      });
    } else {
      this.setState({
        focusedActivity: activity,
      });
    }
    localStorage.setItem('lastMapPosition', JSON.stringify({
      longitude: activity.longitude,
      latitude: activity.latitude,
    }));

    if (check && activity !== center) {
      return;
    }

    let lonlat = new window.Tmap.LonLat(activity.longitude, activity.latitude).transform("EPSG:4326", "EPSG:3857");//좌표 설정
    map.setCenter(lonlat);
  }

  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {

      const center = {
        longitude: user.longitude,
        latitude: user.latitude,
      };

      const res = await serverApi('allActivity');
      console.log(res);
      let { ActivityList } = res.data;

      let activityMarkers = [];
      for (let a of ActivityList) {
        activityMarkers.push({
          ...a,
          markerImage: 'img',
        });
      }

      await this.setState({
        activityList: ActivityList,
        center: {
          longitude: center.longitude,
          latitude: center.latitude,
        },
        map: tmap(center, activityMarkers, false, this.focus),
      });
      if (localStorage.getItem('lastMapPosition')) {
        const lastMapPosition = JSON.parse(localStorage.getItem('lastMapPosition'));
        let lonlat = new window.Tmap.LonLat(lastMapPosition.longitude, lastMapPosition.latitude).transform("EPSG:4326", "EPSG:3857");//좌표 설정
        this.state.map.setCenter(lonlat, 15);
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { focusedActivity } = this.state;
    return (
      <div className="map__container">
        <Footer />


        {
          focusedActivity !== null && (
            <div className="focusedQuest">
              <div className="focusedQuest__name">{focusedActivity.name}</div>
              <div className="focusedQuest__menu">
                <div className="focusedQuest__menu__item"><Link to={`/activity/${focusedActivity.num}`}>장소프로필</Link></div>
              </div>
            </div>
          )
        }
        <div className="quest__container">
          <div
            onClick={() => this.focus(this.state.center)}
            className="quest__list__item home">
            HOME
          </div>
          <div className="quest__list__item home"><Link to="/taglist">취향별로 모아보기</Link></div>
        </div>
        <div id="map_div"></div>
      </div>
    );
  }
}

export default Map;