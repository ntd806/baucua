let startBtn, rabbit, rabbit_position,
startTitle, canvas, startTitle_hideTime, 
height_stop, div_holder, bg_default = 0.0, div_renda, distance = 0.0, 
count_distance_left, div_bord1, is_finish = false, begin_climb = false,
panel_finish, div_bord2, div_kiroku, panel_score,
scale, condition_stop_background = 0.0,
total_distance_left = 0.0, speed = 0.0, bg_up = 0.0,
is_sound_climb = false, rabbit_move = 0, is_click = false, rabbit_top, time_set_up, time_flag = 0, time,
soundFinish_Loop = 0, result, flag_sound = false, time_place;

// Keep track of our socket connection
var socket;
function setup() {
   newGame();
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect(LOCALHOST);
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
   if(!soundsBegin.isPlaying() && startBtn.attribute("state") == 1){
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
   // Check begin_climb then show time 
   // if(begin_climb){
      if (is_click) {
         time = millis();
         time = (time - time_set_up)/1000;
         time_place -= time;
         div_bord1.html(time_place.toFixed(3));
      }
      
   // Show point
   // if(!is_finish){
      //div_bord1.html(time.toFixed(3));
      // panel_score.show();
      // panel_score.html(time.toFixed(3));
   // }
   // }
}

/**
 * Load the sound
 */
function preload() {
   // define sounds
   soundsBegin = loadSound("audio/bgm.mp3");
   soundsCancel = loadSound("audio/cancel1.mp3");
   soundsEnding = loadSound("audio/drum-roll1.mp3");
   soundsFinish = loadSound("audio/dondonpafupafu1.mp3");
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
   // define rabbit
   rabbit = select(".gastan");
   rabbit.show();
   rabbit.position(height_stop,height_stop);
   rabbit.hide();
   rabbit.attribute('flag', '0');
   rabbit_top = RABBIT_TOP_FINISH*scale;
   // set condition stop 
   condition_stop_background = CONDITION_STOP*scale;
   // Set positison background
   bg_default = BACKGROUNG_DEFAULT * scale;
   // set image bg2
   bg2 = select(".bg2");
   var bg2_width = bg2.width*scale;
   var bg2_height = bg2.height*scale;
   bg2.style("width",  bg2_width + "px");
   bg2.style("height", bg2_height + "px");
   bg2.position(0,bg_default);
   // set speed of rabbit 
   speed = DISTANCE*scale/TOTAL_STEPS;
   // set distance had left
   total_distance_left = TOTAL_STEPS;
   // define start title
   startTitle = select(".start");
   startTitle.show();
   startTitle.position(canvas.width + startTitle.width, startTitle.position().y);
   startTitle_hideTime = millis() + START_TITLE_SHOW_TIME + START_WAITING_TIME;
   // define start button
   startBtn = select("#startBtn");
   startBtn.attribute("state","1");
   startBtn.attribute('disabled', '');
   // define count_distance_left
   count_distance_left = select("#counter")
   count_distance_left.hide();
   //count_distance_left.html(total_distance_left);
   // define div_renda
   div_renda = select(".renda");
   div_renda.hide()
   // define div_bord1
   div_bord1 = select("#bord1");
   time_place = TIME_PLACE;
   time_place = time_place/60;
   div_bord1.html(time_place.toFixed(2));
   // define panel_finish
   panel_finish = select(".finish");
   panel_finish.hide();
   // define div_bord2
   div_bord2 = select("#bord2");
   div_bord2.hide();
   // define div_kiroku
   div_kiroku = select(".kiroku");
   div_kiroku.hide();
   // define panel_score
   panel_score = select(".score");
   panel_score.hide();


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
         count_distance_left.show();
         count_distance_left.html(total_distance_left);
      }
   }
}

/**
 * handle button start to click
 */
function startBtnClicked(){
   rabbit.show();
   time_flag ++;
   // if(time_flag == 1){
   //    time_set_up =  millis();
   // }
   
   if(is_click){
      // assigned for bolean show the time 
      if(!begin_climb){
      begin_climb = true;
      }

      sound_rabbit_climb();
      show_distance_left();
      rabbit_changes_image();
      // Rabbit change position with images change
      var rabbit_position_recent = rabbit.position();
      if(rabbit_position_recent.y >= height_stop) {
         rabbit.position(rabbit_position, rabbit_position_recent.y - speed);
      }
      else {
        bg_default += speed;
        bg2.position(0,bg_default);
      }
      // check stop
      if (bg_default >= condition_stop_background) {
         set_rabbit_stop();
         var requirePoint = new KYTypeRequirement(TYPE_REQUIRE_POINT_1, TYPE_REQUIRE_POINT_2);
         result           = new KYResult(GAME_ID, time, requirePoint);
      }
   }
}

/**
 * Rabbit changes image
 */
function rabbit_changes_image(){
   // Get flag attribute of rabbit
   var rabbit_flag = rabbit.attribute("flag");
   if(rabbit_flag == 0){
      rabbit.attribute('flag', '1');
      rabbit.attribute("src","img/gastan_2.png");
   }
   else {
      rabbit.attribute('flag', '0');
      rabbit.attribute("src","img/gastan_1.png");
   }
}

/**
 * Effect sound as rabbit stop
 */
function sound_rabbit_stop(){
   // Run sound 
   if (!is_sound_climb) {
   soundsCancel.stop();
   }
}

/**
 * Display finished
 */
function display_finish(){
   soundsEnding.play();
   setInterval(function(){
      div_bord1.hide();
      count_distance_left.hide();
   }, TIME_DELAY_FINISH);

   setTimeout(function(){
      rabbit.hide();
      div_bord2.show();
      panel_finish.show();
      div_kiroku.show();
      flag_sound = true;
   },TIME_DELAY_FINISH);
}

/**
 * Effect sound as rabbit climbs
 */
function sound_rabbit_climb(){
   is_sound_climb = true;
   // play sound climb
   if (is_sound_climb) {
      soundsCancel.play();
      is_sound_climb = false;
   }
}

/**
 * Show distance had left
 */
function show_distance_left(){
   // Calculation for distance
   total_distance_left -= 1;
   if (total_distance_left == 0) {
      bg_default = condition_stop_background;
      is_click = false;
   }
   // Distance left
   count_distance_left.html(total_distance_left);
   div_renda.show()
}

/**
 * Set rabbit position stop
 */
function set_rabbit_stop(){
   // define is_finish
   is_finish = true;
   // Set css for rabbit 
   rabbit.style('top', rabbit_top +'px');
   // set image stop and position
   rabbit.attribute("src","img/gastan_3.png");
   startBtn.hide();
   div_renda.hide();
   sound_rabbit_stop();
   display_finish();
}

function keyPressed(){
   return false;
}
