let ApartamentFinder = async (x,y, subway, school, market, park, custom, minPrice, maxPrice) => {

let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
let location = 'location='+ x + ',' + y;
let radius = '&radius=500';
let key = '&key=AIzaSyCbTjcZ1zwnK65CcW1PRhL2CMBLO2RTWaQ';

let maxDistance = 500; // 500m pana la cea mai aproapiata scoala / metrou etc

let getApartments = async (customRad) => {
  console.log(location);
  if (customRad) {
    radius = '&radius=' + customRad;
  }
  let type = '&type=apartment';
  let keyword = '&keyword=apartment';
  console.log(url+location+radius+type+keyword+key);
  return await fetch(url + location + radius + type + keyword + key)
  .then(response => response.json())
  .then(data => data);
}

let getSchools = async () => {
  let type = '&type=establishment';
  let keyword = '&keyword=secondary_school';
  return await fetch(url + location + radius + type + keyword + key)
  .then(response => response.json())
  .then(data => data);
}

let getCustom = async () => {
  let type = '&type=establishment';
  let keyword = '&keyword=' + custom;
  return await fetch(url + location + radius + type + keyword + key)
  .then(response => response.json())
  .then(data => data);
}

let getSuperMarkets = async () => {
  let type = '&type=establishment';
  let keyword = '&keyword=store|supermarket'
  if (park) {
    keyword += '|park';
  }
  return await fetch(url + location + radius + type + keyword + key) 
  .then(response => response.json())
  .then(data => data);
}

let getSubwayStations = async () => {
  let type='&type=subway_station';
  console.log(url+localStorage+radius+type+key);
  return await fetch(url + location + radius + type + key)
  .then(response => response.json())
  .then(data => data);
}

let getGoodApartmentForClient = async () => {
  let goodAps = [];
  let apartment = [];
  await getApartments(1000).then(data => apartment = data.results);

  if (school) {
    let schools;
    await getSchools().then(data => schools = data.results);
    apartment.forEach(a => {
      let schoolsAround = schools.find(s => getDistance(a.geometry.location, s.geometry.location) < maxDistance) 
      if (schoolsAround) {
        goodAps.push(a);
      }
    });
  }

  if (subway && goodAps.length !== 0) {
    let subways;
    await getSubwayStations().then(data => subways = data.results);
    goodAps.forEach(a => {
      let subwayAround = subways.find(s => getDistance(a.geometry.location, s.geometry.location) < maxDistance)
      if (!subwayAround) {
        const index = goodAps.indexOf(a);
        if (index > -1) {
          goodAps.splice(index, 1);
        }
      }
    })
  } else if (subway) {
    let subways;
    await getSubwayStations().then(data => subways = data.results);
    apartment.forEach(a => {
      let subwayAround = subways.find(s => getDistance(a.geometry.location, s.geometry.location) < maxDistance)
      if (subwayAround) {
        goodAps.push(a);
      }
    })
  }
  
  if (market && goodAps.length !== 0) {
    let superMarkets;
    await getSuperMarkets().then(data => superMarkets = data.results);
    goodAps.forEach(a => {
      let marketAround = superMarkets.find(m => getDistance(a.geometry.location, m.geometry.location) < maxDistance);
      if (!marketAround) {
        const index = goodAps.indexOf(a);
        if (index > -1) {
          goodAps.splice(index, 1);
        }
      }
    })
  } else if (market) {
    let superMarkets;
    await getSuperMarkets().then(data => superMarkets = data.results);
    apartment.forEach(a => {
      let marketAround = superMarkets.find(m => getDistance(a.geometry.location, m.geometry.location) < maxDistance);
      if (marketAround) {
        goodAps.push(a);
      }
    })
  }

  if (custom !== '' && goodAps.length !== 0) {
    let customData;
    await getCustom().then(data => customData = data.results);
    goodAps.forEach(a => {
      let customAround = customData.find(c => getDistance(a.geometry.location, c.geometry.location) < maxDistance);
      if (!customAround) {
        const index = goodAps.indexOf(a);
        if (index > -1) {
          goodAps.slice(index, 1);
        }
      }
    })
  } else if (custom !== '') {
    let customData;
    await getCustom().then(data => customData = data.results);
    apartment.forEach(a => {
      let customAround = customData.find(c => getDistance(a.geometry.location, c.geometry.location) < maxDistance);
      if (customAround) {
        goodAps.push(a);
      }
    })
  }
  
  goodAps.forEach(element => {
    element.price = (Math.floor(Math.random() * (maxPrice - minPrice) ) + minPrice).toString() + ' euro';
  });

  return goodAps;
}


var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

  return await getGoodApartmentForClient();
}

export default ApartamentFinder;