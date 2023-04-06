

  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 1080;    // We will scale the photo width to this
  var height = 1920;     // This will be computed based on the input stream

  var windowOrientation = null;

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var videoBlur = null;
  var canvasOriginal = null;
  var canvas = null;
  var photo = null;
  var frame = null;

  var startbutton = null;
  var endbutton = null;
  var switchbutton = null;

  var mNormalbutton = null;
  var mClairbutton = null;
  var mSombrebutton = null;

  var readablePhotoButton = null;
  var unreadablePhotoButton = null;

  var userButtonsList = [];



  var webcamInput;
  var webcamSettings;
  var webcamTolerance = false;
  var webcamFacingMode = "environment";

  var webcamSwitchSingleton = false;


  var webcamBack = null;
  var webcamFront = null;

  var webcamFilter = "normal";



  /* PHOTOSHOT */
  var photoMode = null; // "app", "creation", "edition" 



  /* CANVAS */
  var context = null;
  var contextOriginal = null;



  var buttonsTransitionSingleton = false;





/*  =========================================================================
	 DEMO
	========================================================================= */

const NB_LAST_USERS = 5;

var usersFullList = [];
var lastUsers = [];
var currentUser = "";

var previousScreen;
var currentScreen = 0;


function isDeviceMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}


var isMobile = isDeviceMobile();
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);



function userInput(e) {
	if (/^[a-zàâçéèêëîïôûùüÿñæœ -]*$/i.test(e.key))
	{
		console.log(e.key);
		return;
	}
	return false;
};


function drawScreenshot()
{
	getWindowOrientation();
	let streamWidth = webcamInput.getVideoTracks()[0].getSettings().width;
	let streamHeight = webcamInput.getVideoTracks()[0].getSettings().height;
	let bestPossibleWidth = streamWidth;
	let bestPossibleHeight = streamHeight;
	if (streamWidth > streamHeight) {
		bestPossibleWidth = streamHeight * 9 / 16;
	}

	if(webcamFilter == "clair") {
    context.filter = "contrast(200%) brightness(80%)";
  }
  else if(webcamFilter == "sombre") {
    context.filter = "brightness(300%)";
  }

  if(photoMode == "creation") {
  	contextOriginal.drawImage(video, (streamWidth / 2) - (bestPossibleWidth / 2), 0, bestPossibleWidth, bestPossibleHeight, 0, 0, width, height);
  }
  context.drawImage(canvasOriginal, 0, 0, width, height, 0, 0, width, height);

  var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
}

function getWindowOrientation() {
	//let style = window.getComputedStyle(document.getElementById("video"), null);
	//style.getPropertyValue("height")

	if(window.innerWidth * 16 < window.innerHeight * 16) {
		windowOrientation = "portrait";
		//document.getElementById("videoBlur").classList.add("hidden");
		document.getElementById("video").classList.add("portrait");
	} else {
		windowOrientation = "landscape";
		//document.getElementById("videoBlur").classList.remove("hidden");
		document.getElementById("video").classList.remove("portrait");
	}

	if (width > height) {
		let temp = width;
		width = height;
		height = temp;
	}
}


function updateUsersList(new_user) {
	lastUsers.unshift(new_user);
	if(lastUsers.length > NB_LAST_USERS) {
		lastUsers.pop();
	}
}



async function pageLoading() {
	try {
		window.scrollTo(0, 1);
		tryFullscreen();
	}
	catch(e)
	{
		console.log("FULLSCREEN FAIL");
	}
	if(!window.fullscreen) {
		console.log(isMobile);
		if(isMobile)
		{
			document.getElementsByTagName("body")[0].classList.add("mobile");
		}
	}
	await new Promise(r => setTimeout(r, 4000));
	return;
}


function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}


async function pageOpening() {

	try{
		var lstorUsers = localStorage.getItem("lastUsers"); 
		lastUsers = JSON.parse(lstorUsers);
		lstorUsers = localStorage.getItem("usersFullList"); 
		usersFullList = JSON.parse(lstorUsers);
	}
	catch(e) {
		console.log("DATA : No last user found");
	}

	if(lastUsers.length > 1) {


		let usersSelection = document.getElementById("usersSelection");
		for (let i=0 ; i<lastUsers.length && i<NB_LAST_USERS; i++) {
			usersSelection.innerHTML += "<div class='user-option' id='user" + i + "'></div>\n";
		}

		let usersSuggestions = document.getElementById("usersSuggestions");
		for (let i=0 ; i<usersFullList.length; i++) {
			usersSuggestions.innerHTML += "<option value='" + usersFullList[i] + "'>" + usersFullList[i] + "</option>";
		}

		let userOptions = document.getElementsByClassName("user-option");
		for(let i=0 ; i<userOptions.length && i<lastUsers.length ; i++) {
			userOptions[i].innerText = lastUsers[i];
		}
	}





	await new Promise(r => setTimeout(r, 1000));
	//await nextScreen();





	//await pageLoading();




	// PAGE LOADING

	//await new Promise(r => setTimeout(r, 1750));


}




function buttonsActivation(activated) {
	if(activated === true || activated === false) {
		for(let i=0; i < userButtonsList.length ; i++) {
			userButtonsList[i].disabled = (!activated);
		}
	}
}

async function buttonsTransition(but1, but2) {
	if(!buttonsTransitionSingleton) {
		buttonsActivation(false);
		buttonsTransitionSingleton=true;
		document.getElementById(but1).classList.add("bottom-removalAnimation");
		document.getElementById(but2).classList.add("bottom-entranceAnimation");
		document.getElementById(but2).classList.remove("bottom-hidden");
		document.getElementById(but2).classList.add("bottom-entranceAnimation");
		document.getElementById(but2).classList.add("bottom-displayed");
		await new Promise(r => setTimeout(r, 1));
		document.getElementById(but2).classList.add("bottom-current");
		document.getElementById(but2).classList.remove("bottom-entranceAnimation");
		await new Promise(r => setTimeout(r, 700));
		document.getElementById(but1).classList.add("bottom-hidden");
		document.getElementById(but1).classList.remove("bottom-displayed");
		document.getElementById(but1).classList.remove("bottom-current");
		document.getElementById(but1).classList.remove("bottom-removalAnimation");

		console.log("BUTTON CHANGE : " + but1 + " -> " + but2);
		buttonsTransitionSingleton=false;
		buttonsActivation(true);
	}
}

async function displayNextScreen() {
	previousScreen = currentScreen;
	currentScreen++;

	document.getElementById("screen" + previousScreen).classList.add("removalAnimation");
	document.getElementById("screen" + currentScreen).classList.add("displayed");
	await new Promise(r => setTimeout(r, 1));
	document.getElementById("screen" + currentScreen).classList.add("current");
	await new Promise(r => setTimeout(r, 3000));
	document.getElementById("screen" + previousScreen).classList.remove("displayed");
	document.getElementById("screen" + previousScreen).classList.remove("current");

	console.log("SCREEN CHANGE : " + previousScreen + " -> " + currentScreen);
}


async function nextScreen()
{
	switch(currentScreen) {
		case 0 :
			await displayNextScreen();
			break;
		case 1 :
			await displayNextScreen();
			break; 
	}
}



	/*  ----------------------------------------
		 DEMO
		---------------------------------------- */





  function startup() {
  	try {
  		stoprecording();
  	}
  	catch(e) {}

    video = document.getElementById('video');
    videoBlur = document.getElementById('videoBlur');
    canvas = document.getElementById('canvas');
    canvasOriginal = document.getElementById('canvasOriginal');
    photo = document.getElementById('photo');
    frame = document.getElementById("frame");

    startbutton = document.getElementById('startbutton');
    endbutton = document.getElementById('endbutton');
    switchbutton = document.getElementById('switchbutton');

    mNormalbutton = document.getElementById('mNormalbutton');
    mClairbutton = document.getElementById('mClairbutton');
    mSombrebutton = document.getElementById('mSombrebutton');

    readablePhotoButton = document.getElementById("readablePhotoButton");
    unreadablePhotoButton = document.getElementById("unreadablePhotoButton");

    //List
    userButtonsList = [startbutton, switchbutton, readablePhotoButton, unreadablePhotoButton];


    if(webcamTolerance)
    { // MODE SANS ECHEC
    	navigator.mediaDevices.getUserMedia({audio: false, video: {
			    width: { min: 1080, max: 1080 },
			    height: { min: 1920, max: 1920 },
			    facingMode: { ideal: webcamFacingMode }
			  },
			})
	    .then((stream) => {
	    	getWindowOrientation();
	    	webcamFacingMode == "user";
	    	webcamFront = true;

	      video.srcObject = stream;
	      video.play();
	      videoBlur.srcObject = stream;
	      videoBlur.play();
	      console.log("STREAM RES : " + stream.getVideoTracks()[0].getSettings().height + " x " + stream.getVideoTracks()[0].getSettings().width);
	      webcamInput = stream;
	      getWindowOrientation();
	    })
	    .catch(function(err) {
	      console.log("ERROR - CRITICAL - NO CAM FOUND");
	      return;
	    });
    }
    else // MODE NORMAL
    {
			navigator.mediaDevices.getUserMedia({audio: false, video: {
			    width: { min: 1080, max: 1080 },
			    height: { min: 1920, max: 1920 },
			    facingMode: { exact: webcamFacingMode }
			  },
			})
	    .then((stream) => {
	    	getWindowOrientation();
	      video.srcObject = stream;
	      video.play();
	      videoBlur.srcObject = stream;
	      videoBlur.play();
	      webcamInput = stream;

	      if(webcamFacingMode == "environment") {
	      	webcamBack = true;
	      }
	      else if (webcamFacingMode == "user") {
	      	webcamFront = true;
	      }
	      getWindowOrientation();
	    })
	    .catch(function(err) {
	      console.log("NO EXACT ENV NAMED " + webcamFacingMode);

	      if((!(webcamBack||webcamFront)) && webcamBack != null && webcamFront != null) {
	      	console.log("ERROR : no camera found ");
	      }
	      
	      if(webcamFacingMode == "environment" && (!webcamTolerance)) {
	      	webcamFacingMode = "user";
	      	webcamBack = false;
	      	startup();
	      	return;
	      }
	      else if (webcamFacingMode == "user" && (!webcamTolerance)) {
	      	webcamFront = false;
	      	webcamTolerance = true;
	      	webcamFacingMode == "environment";
	      	startup();
	      	return;
	      }
	    });
    }

    video.addEventListener('canplay', function(ev){
    	webcamSettings = webcamInput.getVideoTracks()[0].getSettings();
    	width = webcamSettings.width;
    	height = webcamSettings.height;
    	console.log("CAM DATA : " + width + ":" + height);
      if (!streaming) {
        //height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
      /*
        if (isNaN(height)) {
          height = width / (4/3);
        }
        */


        getWindowOrientation();
      
        video.setAttribute('width', Math.max(width, height));
        video.setAttribute('height', Math.min(width, height));
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvasOriginal.setAttribute('width', width);
        canvasOriginal.setAttribute('height', height);

        frame.classList.add("displayed");
        //frame.setAttribute('style', "height:"+Math.max(width, height)+"px; width:"+Math.min(width, height)+"px");
        //video.setAttribute('style', "height:"+Math.min(width, height)+"px; width:"+Math.max(width, height)+"px");
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    
    endbutton.addEventListener('click', function(ev){
      stoprecording();
      ev.preventDefault();
    }, false);

    restartbutton.addEventListener('click', function(ev){
      startup();
      ev.preventDefault();
    }, false);

    mNormalbutton.addEventListener('click', function(ev){
  	try { video.classList.remove("normal"); videoBlur.classList.remove("normal"); } catch(e) {}
  	try { video.classList.remove("clair"); videoBlur.classList.remove("clair"); } catch(e) {}
  	try { video.classList.remove("sombre"); videoBlur.classList.remove("sombre"); } catch(e) {}
  	video.classList.add("normal");
  	videoBlur.classList.add("normal");
  	mSombrebutton.disabled = false;
  	mNormalbutton.disabled = true;
  	mClairbutton.disabled = false;
  	webcamFilter="normal";
  	if(photoMode == "edition") {
  		changeFilter();
  	}
    ev.preventDefault();
   }, false);

  mClairbutton.addEventListener('click', function(ev){
  	try { video.classList.remove("normal"); videoBlur.classList.remove("normal"); } catch(e) {}
  	try { video.classList.remove("clair"); videoBlur.classList.remove("clair"); } catch(e) {}
  	try { video.classList.remove("sombre"); videoBlur.classList.remove("sombre"); } catch(e) {}
  	video.classList.add("clair");
  	videoBlur.classList.add("clair");
  	mSombrebutton.disabled = false;
  	mNormalbutton.disabled = false;
  	mClairbutton.disabled = true;
  	webcamFilter="clair";
  	if(photoMode == "edition") {
  		changeFilter();
  	}
    ev.preventDefault();
   }, false);

  mSombrebutton.addEventListener('click', function(ev){
  	try { video.classList.remove("normal"); videoBlur.classList.remove("normal"); } catch(e) {}
  	try { video.classList.remove("clair"); videoBlur.classList.remove("clair"); } catch(e) {}
  	try { video.classList.remove("sombre"); videoBlur.classList.remove("sombre"); } catch(e) {}
  	video.classList.add("sombre");
  	videoBlur.classList.add("sombre");
  	mSombrebutton.disabled = true;
  	mNormalbutton.disabled = false;
  	mClairbutton.disabled = false;
  	webcamFilter="sombre";
  	if(photoMode == "edition") {
  		changeFilter();
  	}
    ev.preventDefault();
   }, false);

  	readablePhotoButton.addEventListener('click', function(ev){
      nextScreen();
      ev.preventDefault();
    }, false);

    unreadablePhotoButton.addEventListener('click', function(ev){
    	document.getElementById("photo").classList.remove("displayed");
      photoMode = "creation";
      buttonsTransition("photoValidationButtons", "photoshotButtons");
      clearphoto();
      ev.preventDefault();
    }, false);




    if(!webcamSwitchSingleton) {
    	webcamSwitchSingleton = true;
    	switchbutton.addEventListener('click', function(ev){

	    	if(webcamFacingMode == "environment") {
		    	webcamFacingMode = "user";
		    }
		    else if(webcamFacingMode == "user") {
		    	webcamFacingMode = "environment";
		    }
		    setTimeout(() => {
	    		startup();
	    		//webcamSwitchSingleton = false;
	    	}, 300);
   		  ev.preventDefault();
	    }, false);
    }
    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function stoprecording() {
    video.srcObject.getTracks().forEach(track => track.stop());
  }



  function changeFilter() {
  	context = canvas.getContext('2d');
		if(webcamFilter == "clair") {
     	context.filter = "contrast(200%) brightness(80%)";
     }
     else if(webcamFilter == "sombre") {
      context.filter = "brightness(300%)";
     }
     else
     {
     	context.filter = "contrast(100%) brightness(100%)";
     }
     drawScreenshot();
  }

  function takepicture() {
  	photoMode = "creation";
  	context = canvas.getContext('2d');
  	contextOriginal = canvasOriginal.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      canvasOriginal.width = width;
      canvasOriginal.height = height;
      drawScreenshot();

      document.getElementById("photo").classList.add("displayed");

      photoMode = "edition";
      buttonsTransition("photoshotButtons", "photoValidationButtons");
    } else {
      clearphoto();
    }
  }





		/*  ---------------
			 DEMO
			--------------- */

document.addEventListener('DOMContentLoaded', function(event)
{
	getWindowOrientation();

	if (hasGetUserMedia()) {
	  // Set up our event listener to run the startup process once loading is complete.
	  window.addEventListener('load', startup, false);
	}
	else {
	    alert('getUserMedia() is not supported in your browser');
	}





	//screen.orientation.lock("portrait-primary");
	//var locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
	//locOrientation('portrait-primary');
	var myScreenOrientation = window.screen.orientation;
	try {
		myScreenOrientation.lock("portrait-primary");
	}
	catch(e) { console.log("WARNING - SCREEN ORIENTATION LOCK UNAVAILABLE"); }

	//urrentDeviceOrientation = screen.orientation.type;
	var nomTemp = ['Robert', 'Jean-Claude', 'Abdel', "Arnaud", "Stéphane", "Kim-Jong Un"];
	localStorage.setItem("usersFullList", JSON.stringify(nomTemp));
	localStorage.setItem("lastUsers", JSON.stringify(nomTemp.slice(0,NB_LAST_USERS)));
	localStorage.setItem("currentUser", "Robert");
	//localStorage.clear();
	pageOpening();
	document.querySelector('input').onkeydown = userInput;
});

window.onresize = async function(event) {
	document.getElementsByTagName("body")[0].classList.add("resized");
	await new Promise(r => setTimeout(r, 1000));
	document.getElementsByTagName("body")[0].classList.remove("resized");
	getWindowOrientation();
};