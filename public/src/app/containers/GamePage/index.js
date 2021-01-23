import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import * as config from './js/config';

export default memo(function GamePage() {
  return (
    <>
      <Helmet>
        <script src={config} type="text/javascript" />
      </Helmet>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div id="game2">
        <div id="holder">
            <div class="circle circle__item" id = "start_1" onclick="BtnClicked(this)" att = "1">
            </div>
            <div class="circle circle__item" id = "start_2" onclick="BtnClicked(this)" att = "2">
            </div>
            <div class="circle circle__item" id = "start_3" onclick="BtnClicked(this)" att = "3">
            </div>
            <div class="circle circle__item" id = "start_4" onclick="BtnClicked(this)" att = "4">
            </div>
            <div class="circle circle__item" id = "start_5" onclick="BtnClicked(this)" att = "5">
            </div>
            <div class="circle circle__item" id = "start_6" onclick="BtnClicked(this)" att = "6">
            </div>
            <div class="circle circle__item" id = "start_7" onclick="BtnClicked(this)" att = "7">
            </div>
            <div class="circle circle__item" id = "start_8" onclick="BtnClicked(this)" att = "8">
            </div>
            <div class="start_9" id = "start_9">
                <p><span >0.0</span></p>
            </div>
            <div class="circle circle__item" id ="oval" style="left: 3%;"></div>
            <div class="circle circle__item" id = "oval" style="right: 1%;"></div>
            <div class="circle circle__item" id = "start_10" onclick="BtnClicked(this)" att = "1">
            </div>
            <div class="circle circle__item" id = "start_11" onclick="BtnClicked(this)" att = "2">
            </div>
            <div class="circle circle__item" id = "start_12" onclick="BtnClicked(this)" att = "3">
            </div>
            <div class="circle circle__item" id = "start_13" onclick="BtnClicked(this)" att = "4">
            </div>
            <div class="circle circle__item" id = "start_14" onclick="BtnClicked(this)" att = "1">
            </div>
            <div class="circle circle__item" id = "start_15" onclick="BtnClicked(this)" att = "2">
            </div>
            <div class="circle circle__item" id = "start_16" onclick="BtnClicked(this)" att = "3">
            </div>
            <div class="circle circle__item" id = "start_17" onclick="BtnClicked(this)" att = "4">
            </div>
            <div class="circle circle__item" id = "start_18" onclick="BtnClicked(this)" att = "5">
            </div>
            <div class="circle circle__item" id = "start_19" onclick="BtnClicked(this)" att = "6">
            </div>
            <div class="circle circle__item" id = "start_20" onclick="BtnClicked(this)" att = "7">
            </div>
            <div class="circle circle__item" id = "start_21" onclick="BtnClicked(this)" att = "8">
            </div>
            <div class="circle circle__item" id = "start_22" onclick="BtnClicked(this)" att = "1">
            </div>
            <div class="circle circle__item" id = "start_23" onclick="BtnClicked(this)" att = "1">
            </div>
            <img src="../img/tc-01.png" id="light" style="display: none;">
          <img src="../img/bg2.png" id = "bg2" class="bg2">
        </div>
        </div>
        <div id="loadding"></div>`,
        }}
      />
    </>
  );
});
