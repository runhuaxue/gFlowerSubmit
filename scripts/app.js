//jquery
(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);

var example = (function() {

    "use strict";
    var scene = new THREE.Scene(),//
        renderer = new THREE.WebGLRenderer( { antialias: true } ),
        camera,
        leaf01,leaf02,eyes,face,mouth,bigbox,round,handle,roll,tapes,tapetag, keys; //

    var lights = [];
        lights[ 0 ] = new THREE.AmbientLight( 0xffffff, 0.5, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 0.6, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 0.6, 0 );

        lights[ 0 ].position.set( 0, 150, 250 );
        lights[ 1 ].position.set( 40, -130, 250 );
        lights[ 2 ].position.set( - 40, -130, 250 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );

    var objLeaf = [];
    var objLeaf2 = [];
    var objFace = [];
    var objEyes = [];
    var objMouth = [];
    var objBoombox = [];

    //colors
    var cLeaf = [0xff6666,0xffffcc,0xffd633,0x99ccff,0xff9999,0xbb99ff,0xff8c1a];
    var cL1 = jQuery.rand(cLeaf);

    var cLeaf2 = [0xff6666,0xffffcc,0xffd633,0x99ccff,0xff9999,0xbb99ff,0x2eb8b8];
    var cL2 = jQuery.rand(cLeaf2);
    var cFace = [0xffff4d,0xffdb4d];
    var cF = jQuery.rand(cFace);


    function initScene() {

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.set(0, -10, 60);

        scene.add(camera);

        var flowerTilt = 90;
        var texture = THREE.ImageUtils.loadTexture('assets/grass.jpg', {}, function() {//将图片导入到纹理中
                    renderer.render(scene, camera);
                });

        var geometry = new THREE.BoxGeometry( 800, 800, 1 );
        var material = new THREE.MeshBasicMaterial({ map:texture });
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        cube.position.z = -120;

        var loader = new THREE.JSONLoader();

//~~~~~~~~~~~~~~~~~~~~~boombox~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//bigbox
    loader.load("models/bigbox.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0xf38f00,
            wireframe: false
        });
        bigbox = new THREE.Mesh(geometry, material);
        objBoombox.push(bigbox);
        bigbox.rotation.x = 3.14/4;
        bigbox.position.y = 17;
        scene.add(bigbox);
        render();
    });

//handle
    loader.load("models/handle.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0xec491e,
            wireframe: false
        });
        handle = new THREE.Mesh(geometry, material);
        objBoombox.push(handle);
        handle.rotation.x = 3.14/4;
        handle.position.y = 17;
        scene.add(handle);
        render();
    });

//roll
    loader.load("models/roll.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0x9c00ff,
            wireframe: false
        });
        roll = new THREE.Mesh(geometry, material);
        objBoombox.push(roll);
        roll.rotation.x = 3.14/4;
        roll.position.y = 17;
        scene.add(roll);
        render();
    });

//tapes
    loader.load("models/tapes.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            wireframe: false
        });
        tapes = new THREE.Mesh(geometry, material);
        objBoombox.push(tapes);
        tapes.rotation.x = 3.14/4;
        tapes.position.y = 17;
        scene.add(tapes);
        render();
    });

//tapetag
    loader.load("models/tapetag.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0x00a6f3,
            wireframe: false
        });
        tapetag = new THREE.Mesh(geometry, material);
        objBoombox.push(tapetag);
        tapetag.rotation.x = 3.14/4;
        tapetag.position.y = 17;
        scene.add(tapetag);
        render();
    });

//keys
    loader.load("models/keys.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0x333333,
            wireframe: false
        });
        keys = new THREE.Mesh(geometry, material);
        objBoombox.push(keys);
        keys.rotation.x = 3.14/4;
        keys.position.y = 17;
        scene.add(keys);
        render();
    });
//round
    loader.load("models/round.js", function(geometry, materials) {
        var material = new THREE.MeshLambertMaterial({
            color: 0x272727,
            wireframe: false
        });
        round = new THREE.Mesh(geometry, material);
        objBoombox.push(round);
        round.rotation.x = 3.14/4;
        round.position.y = 17;
        scene.add(round);
        render();
    });

//~~~~~~~~~~~~~~~~~~~~~~~~sound~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );
    // create a global audio source
    var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'assets/2814.mp3', function( buffer ) {
    	sound.setBuffer( buffer );
    	sound.setLoop( true );
    	sound.setVolume( 0.8 );
      sound.autoplay=true;
    	sound.play();
    });
    scene.add( sound );

//leaf1
    loader.load("models/leaf01.js", function(geometry, materials) {
        var material = new THREE.MeshBasicMaterial({
            color: cL1,
            wireframe: false

        });
        leaf01 = new THREE.Mesh(geometry, material);
        objLeaf.push(leaf01);

        leaf01.rotation.x = flowerTilt;
        leaf01.position.y = 7;
        scene.add(leaf01);

        console.log(objLeaf);
        render();
    });

//leaf2
    loader.load("models/leaf02.js", function(geometry, materials) {
            var material = new THREE.MeshBasicMaterial({
                color: cL2,
                wireframe: false
            });
            leaf02 = new THREE.Mesh(geometry, material);
            objLeaf2.push(leaf02);
            leaf02.rotation.x = flowerTilt;
            leaf02.position.y = 7;
            scene.add(leaf02);
            render();
    });

//eyes
    loader.load("models/eyes.js", function(geometry, materials) {
            var material = new THREE.MeshBasicMaterial({
                color: 0x000000,
                wireframe: false
            });

            eyes = new THREE.Mesh(geometry, material);
            objEyes.push(eyes);
            eyes.rotation.x = flowerTilt;
            eyes.position.y = 7;
            scene.add(eyes);
            render();
    });

//face
    loader.load("models/face.js", function(geometry, materials) {
            var material = new THREE.MeshLambertMaterial({
                color: cF,
                wireframe: false,
                emissive:0x0
            });

            face = new THREE.Mesh(geometry, material);
            objFace.push(face);
            face.rotation.x = flowerTilt;
            face.position.y = 7;
            scene.add(face);
            render();
    });

//mouse
    loader.load("models/mouth.js", function(geometry, materials) {
            var material = new THREE.MeshBasicMaterial({
                color: 0xff0012,
                wireframe: false
            });

            mouth = new THREE.Mesh(geometry, material);
            objMouth.push(mouth);
            mouth.position.y = 7;
            scene.add(mouth);
            render();
    });

    var posx;//-10--+15//13-571
    var posy ;

///////////////////////////////////////////////////////////////////////////////
function showFlower(e){
      var mx = e.clientX;
      var my = e.clientY;
      console.log(mx);
      console.log(my);
      var loader = new THREE.JSONLoader();

      //leaf01
      loader.load("models/leaf01.js", function(geometry, materials) {
          var material = new THREE.MeshBasicMaterial({
              color:  jQuery.rand(cLeaf),
              wireframe: false
          });
          leaf01 = new THREE.Mesh(geometry, material);
          objLeaf.push(leaf01);

          leaf01.rotation.x = flowerTilt;
          posx=leaf01.position.y =Math.floor(Math.random()*(15-(-10)+1)+(-10));//-10--+15//13-571
          posy=leaf01.position.x=Math.floor(Math.random()*(21-(-21)+1)+(-21));//-+21//102-1255
          scene.add(leaf01);

          console.log(objLeaf);
          render();
      });


      //leaf02
      loader.load("models/leaf02.js", function(geometry, materials) {
          var material = new THREE.MeshBasicMaterial({
              color:  jQuery.rand(cLeaf2),
              wireframe: false
          });
          leaf02 = new THREE.Mesh(geometry, material);
          objLeaf2.push(leaf02);

          leaf02.rotation.x = flowerTilt;
          leaf02.position.y =posx;//-10--+15//13-571
          leaf02.position.x=posy;//-+21//102-1255

          scene.add(leaf02);
          render();
      });

      //eyes
      loader.load("models/eyes.js", function(geometry, materials) {
          var material = new THREE.MeshBasicMaterial({
              color: 0x000000,
              wireframe: false
          });

          eyes = new THREE.Mesh(geometry, material);
          objEyes.push(eyes);
          eyes.rotation.x = flowerTilt;
          eyes.position.y =posx;//-10--+15//13-571

          eyes.position.x=posy;//-+21//102-1255
          scene.add(eyes);
          render();
      });

      //face
      loader.load("models/face.js", function(geometry, materials) {
          var material = new THREE.MeshLambertMaterial({
              color: cF,
              wireframe: false,
              emissive:0x0
          });

          face = new THREE.Mesh(geometry, material);
          objFace.push(face);
          face.rotation.x = flowerTilt;
          face.position.y =posx;//-10--+15//13-571

          face.position.x=posy;//-+21//102-1255
          scene.add(face);
          render();
      });

      //mouth
      loader.load("models/mouth.js", function(geometry, materials) {
          var material = new THREE.MeshBasicMaterial({
              color: 0xff0012,
              wireframe: false
          });

          mouth = new THREE.Mesh(geometry, material);
          objMouth.push(mouth);
          mouth.position.y = posx;
            mouth.position.x = posy;
          scene.add(mouth);
          render();
      });
}

    window.addEventListener("click",showFlower);
        controls = new THREE.OrbitControls(camera);
        controls.addEventListener('change', render);
    };

    function mousePOS(e){
        var mx = e.clientX;
        var my = e.clientY;
        var wwh = window.innerWidth/2;
        var whh = window.innerHeight/2;
        var rotIndex = ((wwh-mx)/wwh)*0.6;
        var rotIndex2 = ((wwh-mx)/wwh)*0.3;
        var rotIndex3 = ((my-whh)/whh)*0.2+3.1415926*(2/3);

        for (var i = 0; i < objLeaf.length; i++) {
            objLeaf[i].rotation.x = rotIndex3;
            objLeaf[i].rotation.y = rotIndex;
            objLeaf[i].rotation.z = rotIndex;

            objLeaf2[i].rotation.x = rotIndex3;
            objLeaf2[i].rotation.y = rotIndex;
            objLeaf2[i].rotation.z = rotIndex;

            objEyes[i].rotation.x = rotIndex3;
            objEyes[i].rotation.y = rotIndex;
            objEyes[i].rotation.z = rotIndex;

            objFace[i].rotation.x = rotIndex3;
            objFace[i].rotation.y = rotIndex;
            objFace[i].rotation.z = rotIndex;
        }
    }

    function mouseBoombox(e){
        var mx = e.clientX;
        var my = e.clientY;
        var wwh = window.innerWidth/2;
        var whh = window.innerHeight/2;
        
        for (var i = 0; i < objBoombox.length; i++) {
            objBoombox[i].position.x= (mx-wwh)*0.1;
            objBoombox[i].position.y= -(my-whh)*0.1;
        }
    }

    window.addEventListener("mousemove", mousePOS);
    window.addEventListener("mousemove", mouseBoombox);

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    window.onload = initScene;

})();
