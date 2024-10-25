var viewer = pannellum.viewer('panorama', {
    "autoLoad": true,
    "autoRotate": 0,
    "showControls": false,  
    "default": {
        "firstScene": "image-1",
    },

    "scenes": {
        "image-1": {
            "type": "equirectangular",
            "panorama": "19m.JPG", 
            "hfov":200,
            "yaw":0,
            "compass":true,
            "northOffset": 0
        },
  
        "image-2": {
        "type": "equirectangular",
        "panorama": "21.5m.JPG",
        "hfov":200,
        "haov": 360,
        "vaov":150,
        "minPitch":-25,
        "maxPitch": 25,
        "yaw": 0,
        "compass":true,
        "northOffset": 0
      },

       "image-3": {
         "type": "equirectangular",
        "panorama": "24m.JPG",
        "hfov":200,
        "haov": 360,
        "vaov":150,
        "minPitch":-25,
        "maxPitch": 25,
        "yaw": 0,
        "compass":true,
        "northOffset": 0
      },

      "image-4":{
        "type": "equirectangular",
         "panorama": "NA",
         "hfov":200,
         "haov": 360,
         "vaov":150,
         "minPitch":-25,
         "maxPitch": 25,
         "yaw": 150,
         "compass":true,
         "northOffset": 210
        
    //   }, 
    }
}});
function togglePopupBackground(containerId, isHover) {
var container = document.getElementById(containerId);
if (isHover) {
    container.style.backgroundColor = '';
} else {
    container.style.backgroundColor = 'rgb(0, 0, 0)';
}
}
function togglePopupWindows() {
        var popupContainer1 = document.getElementById('popup-container-1');
        var popupContainer2 = document.getElementById('popup-container-2');
        if (popupContainer1.style.display === 'block' || popupContainer2.style.display === 'block') {
            popupContainer1.style.display = 'none';
            popupContainer2.style.display = 'none';
        } else {
            popupContainer1.style.display = 'block';
            popupContainer2.style.display = 'block';
        }
        var popupContainer3 = document.getElementById('popup-container-3');
        var popupContainer4 = document.getElementById('popup-container-4');
        if (popupContainer3.style.display === 'block' || popupContainer4.style.display === 'block') {
            popupContainer3.style.display = 'none';
            popupContainer4.style.display = 'none';
        } else {
            popupContainer3.style.display = 'block';
            popupContainer4.style.display = 'block';
    }
   
    } 

// Event listener for height button
document.getElementById('switch-panorama').addEventListener('click', function() {
    togglePopupWindows();
});
// Event listeners for image selection
document.getElementById('image-1').addEventListener('click', function() {
    viewer.loadScene('image-1');
    togglePopupWindows();
});

document.getElementById('image-2').addEventListener('click', function() {
    viewer.loadScene('image-2');
    togglePopupWindows();
});

 document.getElementById('image-3').addEventListener('click', function() {
     viewer.loadScene('image-3');
     togglePopupWindows();
 });

 document.getElementById('image-4').addEventListener('click', function() {
     viewer.loadScene('image-4');
     togglePopupWindows();
 });
// Function to update degree scale
function updateDegreeScale() {
    // Get the element where the degree scale will be displayed
    var degreeScale = document.getElementById('degreeScale');
  
    // Get the current scene (active image) from the Pannellum viewer
    var currentScene = viewer.getScene();
  
    // Define initial yaw values for each image (adjust these as needed)
    var initialYaw = {
      "image-1": 0,
      "image-2": 0,
      "image-3": 0,
      "image-4": 0
    };
  
    // Get the adjusted yaw value based on the current scene and initial yaw
    var adjustedYaw = viewer.getYaw() - initialYaw[currentScene];
  
    // Handle negative adjusted yaw values
    if (adjustedYaw < 0) {
      adjustedYaw += 360;
    }
    if (adjustedYaw < 0) {
        adjustedYaw += 360;
      }
  
    // Update the text content of the degree scale element
    degreeScale.innerText = `${adjustedYaw.toFixed(1)}°`;
  }
  

// Event listeners for control buttons
document.getElementById('pan-up').addEventListener('click', function() {
    viewer.setPitch(viewer.getPitch() + 10);
    updateDegreeScale();
});
document.getElementById('pan-down').addEventListener('click', function() {
    viewer.setPitch(viewer.getPitch() - 10);
    updateDegreeScale();
});
document.getElementById('pan-left').addEventListener('click', function() {
    viewer.setYaw(viewer.getYaw() - 10);
    updateDegreeScale();
});
document.getElementById('pan-right').addEventListener('click', function() {
    viewer.setYaw(viewer.getYaw() + 10);
    updateDegreeScale();
});
document.getElementById('zoom-in').addEventListener('click', function() {
    viewer.setHfov(viewer.getHfov() - 10);
    updateDegreeScale();
});
document.getElementById('zoom-out').addEventListener('click', function() {
    viewer.setHfov(viewer.getHfov() + 10);
    updateDegreeScale();
});
document.getElementById('fullscreen').addEventListener('click', function() {
    viewer.toggleFullscreen();
    updateDegreeScale();
});

// Event listener to update degree scale during view change
viewer.on('viewchange', updateDegreeScale);

// Function to continuously update the degree scale during auto-rotation
viewer.on('mousedown', function() {
    setInterval(updateDegreeScale, 100);
});
