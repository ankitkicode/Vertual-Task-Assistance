export const getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };
  
  export const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              location: "User's Location"
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
            reject(error);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  
  export const getDeviceInfo = () => {
    return {
      browser: navigator.userAgent,
      device: navigator.platform,
      model: "Demo"
    };
  };
  