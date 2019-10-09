function initTmap(center, markers, isQuestMap, onClick) {
  var map = new window.Tmap.Map({
    div: 'map_div',
    width : '100%',
    height : '90vh',
  });

  const markerLayer = new window.Tmap.Layer.Markers();//마커 레이어 생성
  map.addLayer(markerLayer);//map에 마커 레이어 추가

  var centerLonlat = new window.Tmap.LonLat(center.longitude, center.latitude).transform("EPSG:4326", "EPSG:3857");//좌표 설정
  var centerSize = new window.Tmap.Size(24, 38);//아이콘 크기 설정
  var centerOffset = new window.Tmap.Pixel(-(centerSize.w / 2), -(centerSize.h));//아이콘 중심점 설정
  // var centerIcon = new window.Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_a.png',centerSize, centerOffset);//마커 아이콘 설정
  var centerIcon = new window.Tmap.Icon('/home.png',centerSize, centerOffset);//마커 아이콘 설정

  const centerMarker = new window.Tmap.Marker(centerLonlat, centerIcon);//마커 생성
  markerLayer.addMarker(centerMarker);//레이어에 마커 추가

  const markerIconPath = isQuestMap ? '/quest.png' : '/activity.png';
  if (markers) {
    for (let i = 0; i < markers.length; i++) {
      const currentMarker = markers[i];
      // const markerLayer = new window.Tmap.Layer.Markers();//마커 레이어 생성
      // map.addLayer(markerLayer);//map에 마커 레이어 추가
      
      var lonlat = new window.Tmap.LonLat(currentMarker.longitude, currentMarker.latitude).transform("EPSG:4326", "EPSG:3857");//좌표 설정
      var size = new window.Tmap.Size(30, 30);//아이콘 크기 설정
      var offset = new window.Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
      var icon = new window.Tmap.Icon(markerIconPath,size, offset);//마커 아이콘 설정
      
      const activityMarker = new window.Tmap.Marker(lonlat, icon);//마커 생성

      markerLayer.addMarker(activityMarker);//레이어에 마커 추가

      if (onClick) {
        // console.log(onClick);
        // marker.events.register('click', marker, me);//마커 마우스 클릭 이벤트 등록
        activityMarker.events.register("click", activityMarker, (e) => onClick(currentMarker));
        activityMarker.events.register("touchstart", activityMarker, (e) => onClick(currentMarker));
      }
      
    }
  }

  map.setCenter(centerLonlat, 15);
  map.ctrl_nav.disableZoomWheel();
  return map;
}

export default initTmap;