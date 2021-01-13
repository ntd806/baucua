let startBtn, dice, dice_position,
startTitle, canvas, startTitle_hideTime, 
height_stop, div_holder, bg_default = 0.0, 
count_distance_left, div_bord1,
 panel_score,
scale,
total_distance_left = 0.0, speed = 0.0, bg_up = 0.0,
is_sound_climb = false, dice_move = 0, is_click = false, dice_top, time_set_up, time_flag = 0, time,
soundFinish_Loop = 0, result, flag_sound = false, time_place;

// Keep track of our socket connection
var socket;
function setup() {
   newGame();
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect();
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('bet',
    // When we receive data
    function(data) {
      console.log("Got: " + data);
    }
  );
}

function draw() {
   // run sound
   if(!soundsBegin.isPlaying()){
      soundsBegin.loop();
   }

   // run sound
   if(!soundsFinish.isPlaying() && flag_sound == true){
      soundFinish_Loop ++;
      if (soundFinish_Loop > 3) {
         noLoop();
         result.send();
      }
      else{
         soundsFinish.play();
      }
   }

   if(millis() > START_WAITING_TIME){
     wellcome();
   }
}

/**
 * Load the sound
 */
function preload() {
   // define sounds
   soundsBegin = loadSound("../audio/bgm.mp3");
   soundsCancel = loadSound("../audio/cancel1.mp3");
   soundsEnding = loadSound("../audio/drum-roll1.mp3");
   soundsFinish = loadSound("../audio/dondonpafupafu1.mp3");
 }

/**
 * Create new a game video
 */
function newGame() {
   // fixed frame rate
   frameRate(60);
   // define canvas
   canvas = select("#game2");
   // height stop
   height_stop = canvas.height/2;
   // Set scale for screen
   scale = canvas.width/CANVAS_HEIGHT;
   // define div holder
   div_holder = select("#holder");
   // define dice
   dice = select(".gastan");
   dice.show();
   dice.position(height_stop,height_stop);
   dice.hide();
   dice.attribute('flag', '0');
   // Set positison background
   bg_default = BACKGROUNG_DEFAULT * scale;

   var loaddingScreen = select("#loadding");
   loaddingScreen.remove();
}

function wellcome(){
  
   //replace display == block for button start
   if(startTitle.style("display") == "block"){
      // get position current
      var startTitlePosition = startTitle.position();
      // set stop position
      var startTitleStopPosition = canvas.width * (150/CANVAS_HEIGHT);
      if(startTitlePosition.x > startTitleStopPosition){
         startTitle.position(startTitlePosition.x - 5, startTitlePosition.y);
      }
      else
      {
         startBtn.mousePressed(startBtnClicked);
      }

      if(millis() >= startTitle_hideTime){
         startTitle.hide();
         is_click = true;
         time_set_up =  millis();
         // run effect
         //count_distance_left.show();
         //count_distance_left.html(total_distance_left);
      }
   }
}

/**
 * handle button start to click
 */
function startBtnClicked(){
   dice.show();
   time_flag ++;
   // if(time_flag == 1){
   //    time_set_up =  millis();
   // }
   
   if(is_click){
      sound_dice_climb();
      show_distance_left();
      dice_changes_image();
      // dice change position with images change
      var dice_position_recent = dice.position();
      if(dice_position_recent.y >= height_stop) {
         dice.position(dice_position, dice_position_recent.y - speed);
      }
      else {
        bg_default += speed;
        bg2.position(0,bg_default);
      }
      // check stop
      if (bg_default >= condition_stop_background) {
         set_dice_stop();
         var requirePoint = new KYTypeRequirement(TYPE_REQUIRE_POINT_1, TYPE_REQUIRE_POINT_2);
         result           = new KYResult(GAME_ID, time, requirePoint);
      }
   }
}
