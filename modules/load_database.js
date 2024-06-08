const stations = [
    { name: 'Station 1', latitude: 36.413972, longitude: 5.940637 },
    { name: 'Station 2', latitude: 36.413962, longitude:  5.940608 }
  ];
  
  // Fonction pour trouver une station par coordonnées
  function findStation(lat, long) {
    return stations.find(station => station.latitude === lat  && station.longitude === long);
  }
  
  module.exports = { findStation };
