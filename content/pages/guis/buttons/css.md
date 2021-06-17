# CSS Buttons

CSS imitations of [these buttons](index.md).

<style>
button, button:focus, button:active {
  border: none;
  padding: 0;
  box-shadow: none;
  font-weight: normal;
  border-radius: 0;
  font-size: inherit;
  margin: 0;
  outline: none;
  outline-offset: 0;
  color: #000;
}
.button-container {
  padding: 8px 32px;
  font-family: sans-serif;
}
.button-container button {
  font-family: inherit;
  font-size: inherit;
  outline: none;
  display: block;
  box-sizing: border-box;
}
.button-container button::-moz-focus-inner {
  border: none;
}

.alto {
  background-color: #fff;
  font-family: serif;
  font-size: 14px;
}
.alto button {
  background-color: #fff;
  color: #000;
  border: 4px solid #888;
  padding: 2px 16px;
}
.alto button:active {
  background-color: #000;
  color: #fff;
}

.star {
  background-color: #888;
  font-size: 12px;
}
.star button {
  background-color: #fff;
  color: #000;
  border: 0;
  border-radius: 2px;
  box-shadow: 2px 2px 0 #000;
  padding: 2px 5px;
}
.star button:active {
  background-color: #000;
  color: #fff;
  box-shadow: 2px 2px 0 #fff;
}

.lisa {
  background-color: #fff;
  font-size: 14px;
}
.lisa button {
  background-color: #fff;
  color: #000;
  font-weight: bold;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 0 16px;
}
.lisa button:active {
  background-color: #000;
  color: #fff;
}

.mac {
  background-color: #fff;
  font-size: 14px;
}
.mac button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 0 4px;
}
.mac button:active {
  background-color: #000;
  color: #fff;
  border: 1px solid #fff;
}

.workbench {
  background-color: #000022;
}
.workbench button {
  background-color: #0055AA;
  color: #fff;
  border: 2px solid #fff;
  padding: 1px 8px;
}
.workbench button:active {
  background-color: #FF8800;
  color: #000;
  box-shadow: inset -2px 0 0 #0055AA;
}

.win1 {
  background-color: #fff;
  font-size: 14px;
}
.win1 button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 1px 16px;
}
.win1 button:active {
  background-color: #000;
  color: #fff;
}
.win1 button:focus {
  text-decoration: underline;
  animation: win1Blink 1s step-end infinite;
}
.win1 button:active:focus {
  text-decoration: none;
}
@keyframes win1Blink { 50% { text-decoration: none; }}

.geos {
  background-color: #fff;
  font-size: 12px;
}
.geos button {
  background-color: #fff;
  color: #000;
  padding: 0 2px;
  border: 1px solid #000;
}
.geos button:active {
  background-color: #000;
  color: #fff;
  border: 1px solid #fff;
}

.os2 {
  background-color: #fff;
  font-size: 14px;
}
.os2 button {
  background-color: #d8d8d8;
  color: #000;
  padding: 2px 8px;
  border: 1px solid #a0a0a0;
  border-radius: 2px;
  box-shadow: inset 2px 2px 0 #fff, inset -2px -2px #a0a0a0;
}
.os2 button:active {
  box-shadow: inset 1px 1px 0 #a0a0a0;
  padding: 3px 7px 1px 9px;
}

.win2 {
  background-color: #fff;
  font-size: 14px;
}
.win2 button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 1px 8px;
  position: relative;
}
.win2 button:focus:after {
  content: '';
  display: block;
  position: absolute;
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
  border: 2px solid #000;
  border-radius: 3px;
}
.win2 button:focus:before {
  content: '';
  display: block;
  position: absolute;
  top: 2px;
  left: 6px;
  right: 6px;
  bottom: 2px;
  border: 1px dotted #000;
}
.win2 button:active {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
  margin: 0;
}


.openlook {
  background-color: #C8CCC8;
  font-size: 14px;
}
.openlook button {
  background-color: #C8CCC8;
  color: #000;
  border: 1px solid #F0F4F0;
  border-bottom-color: #606460;
  border-right-color: #606460;
  border-radius: 999px;
  padding: 0px 8px;
}
.openlook button:active {
  background-color: #B0B4B0;
  border-color: #606460;
  border-bottom-color: #F0F4F0;
  border-right-color: #F0F4F0;
}

.motif {
  background-color: #A0A0A0;
  font-size: 14px;
}
.motif button {
  background-color: #A0A0A0;
  color: #000;
  border: 2px solid #D7D7D7;
  border-bottom-color: #595959;
  border-right-color: #595959;
  padding: 2px 16px;
}
.motif button:active {
  background-color: #888888;
  border-color: #595959;
  border-bottom-color: #D7D7D7;
  border-right-color: #D7D7D7;
}
.motif button:focus {
  outline: 2px solid #fff;
}

.nextstep {
  background-color: #C0C0C0;
  font-size: 14px;
}
.nextstep button {
  background-color: #C0C0C0;
  color: #000;
  border: 1px solid #fff;
  border-bottom-color: #000;
  border-right-color: #000;
  box-shadow: inset -1px -1px 0 #787878;
  padding: 2px 4px;
}
.nextstep button:active {
  background-color: #fff;
  border-color: #000;
  border-bottom-color: #fff;
  border-right-color: #fff;
  box-shadow: none;
  padding: 3px 3px 1px 5px;
}

.workbench2 {
  background-color: #aaa;
  font-size: 14px;
}
.workbench2 button {
  background-color: #aaa;
  color: #000;
  border-top: 2px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 2px solid #000;
  border-right: 1px solid #000;
  padding: 2px 16px 0;
}
.workbench2 button:active {
  background-color: #5577AA;
  border-top-color: #000;
  border-left-color: #000;
  border-bottom-color: #fff;
  border-right-color: #fff;
}

.geoworks {
  background-color: #A8A8A8;
  font-size: 12px;
}
.geoworks button {
  background-color: #A8A8A8;
  color: #000;
  border: 1px solid #fff;
  border-bottom-color: #575757;
  border-right-color: #575757;
	box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #575757;
  padding: 2px 7px;
}
.geoworks button:focus {
  outline: 1px dotted #000;
	outline-offset: -3px;
}
.geoworks button:active {
  background-color: #575757;
  color: #fff;
  border-color: #000;
  border-bottom-color: #fff;
  border-right-color: #fff;
	box-shadow: none;
}

.viewmax {
  background-color: #fff;
  font-size: 14px;
}
.viewmax button {
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  padding: 0 16px;
}
.viewmax button:focus {
  outline: 2px dotted #000;
}
.viewmax button:active {
  outline: 0;
  background-color: #000;
  color: #fff;
}

.win3 {
  background-color: #fff;
  font-size: 12px;
}
.win3 button {
  background-color: #c0c0c0;
  color: #000;
  border: 1px solid #000;
  border-radius: 2.5px;
  padding: 2px 32px;
  position: relative;
	box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #fff, 
    inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
	outline: none;
}
.win3 button:focus {
 box-shadow: inset 1px 1px 0 #000, inset -1px -1px 0 #000,
    inset -2px -2px 0 #808080, inset 2px 2px 0 #fff, 
    inset -3px -3px 0 #808080, inset 3px 3px 0 #fff;
}
.win3 button:focus:before {
  content: '';
  display: block;
  position: absolute;
  top: 2px;
  left: 30px;
  right: 30px;
  bottom: 2px;
  border: 1px dotted #000;
}
.win3 button:active {
  box-shadow: inset 1px 1px 0 #000, inset -1px -1px 0 #000, inset 2px 2px 0 #808080;
  padding: 3px 31px 1px 33px;
}
.win3 button:active:focus:before {
  top: 3px;
  left: 31px;
  right: 29px;
  bottom: 1px;
}

.viewmax2 {
  background-color: #5dc6c6;
  font-size: 14px;
}
.viewmax2 button {
  background-color: #5dc6c6;
  color: #000;
  border: 1px solid #000;
  border-radius: 2px;
  box-shadow: inset -2px -2px 0 #575757, inset 2px 2px 0 #fff;
  padding: 2px 16px;
}
.viewmax2 button:active {
  box-shadow: inset 3px 3px 0 #575757, inset 4px 4px 0 #fff;
  padding: 4px 14px 0 18px;
}
.viewmax2 u {
  text-decoration: underline 2px solid #f00;
}

.os22 {
  background-color: #D7D7D7;
  font-size: 14px;
}
.os22 button {
  background-color: #D7D7D7;
  color: #000;
  border: 1px solid #808080;
  border-bottom-width: 2px;
  border-right-width: 2px;
  border-radius: 2px;
  box-shadow: inset 1px 1px 0 #fff;
  padding: 1px 8px;
}
.os22 button:active {
  box-shadow: inset -1px -1px 0 #fff;
  border-width: 1px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.cde {
  background-color: #AEB2C3;
  font-size: 14px;
}
.cde button {
  background-color: #AEB2C3;
  color: #000;
  border: 1px solid #DCDEE5;
  border-bottom-color: #5D6069;
  border-right-color: #5D6069;
  padding: 0 2px;
}
.cde button:active {
  background-color: #9397A5;
  border-color: #5D6069;
  border-bottom-color: #DCDEE5;
  border-right-color: #DCDEE5;
}
.cde button:focus {
  outline: 1px solid #B24D7A;
}

.system7 {
  background-color: #eee;
  font-size: 14px;
}
.system7 button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 1px 16px;
}
.system7 button:active {
  background-color: #000;
  color: #fff;
}

.bob {
  background-color: #FFFFE0;
  font-size: 14px;
  font-family: serif;
}
.bob button {
  background-color: #FFFF98;
  border: 1px solid #000;
  border-radius: 999px;
  box-shadow: inset 0 1px 0 #CFCFFF, inset 0 -1px 0 #CFCFFF, inset 1px 0 0 #CFCFFF, inset -1px 0 0 #CFCFFF,
    inset 0 2px 0 #000, inset 0 -2px 0 #000, inset 2px 0 0 #000, inset -2px 0 0 #000,
    inset 0 3px 0 #FFCF30, inset 0 -3px 0 #FFCF30, inset 3px 0 0 #FFCF30, inset -3px 0 0 #FF9898,
    inset 0 4px 0 #FFFFFF, inset 4px 0 0 #FFFFFF, inset -4px 0 0 #FFCF30;
  padding: 3px 20px;
  min-width: 100px;
}
.bob button:hover {
  box-shadow: inset 0 1px 0 #98FFCF, inset 0 -1px 0 #98FFCF, inset 1px 0 0 #98FFCF, inset -1px 0 0 #98FFCF,
    inset 0 2px 0 #000, inset 0 -2px 0 #000, inset 2px 0 0 #000, inset -2px 0 0 #000,
    inset 0 3px 0 #FFCF30, inset 0 -3px 0 #FFCF30, inset 3px 0 0 #FFCF30, inset -3px 0 0 #FF9898,
    inset 0 4px 0 #FFFFFF, inset 4px 0 0 #FFFFFF, inset -4px 0 0 #FFCF30;
}
.bob button:active {
  padding: 4px 19px 2px 21px;
  box-shadow: inset 0 1px 0 #98FFCF, inset 0 -1px 0 #98FFCF, inset 1px 0 0 #98FFCF, inset -1px 0 0 #98FFCF,
    inset 0 2px 0 #000, inset 0 -2px 0 #000, inset 2px 0 0 #000, inset -2px 0 0 #000,
    inset 0 3px 0 #CF9830, inset 0 -3px 0 #FFCF30, inset 3px 0 0 #FF9898, inset -3px 0 0 #CF9830,
    inset 0 4px 0 #FFCF30, inset 4px 0 0 #FFCF30, inset -4px 0 0 #FFCF30;
}

.win95 {
  background-color: #C0C0C0;
  font-size: 14px;
}
.win95 button {
  background-color: #C0C0C0;
  color: #000000;
  border: 1px solid #000000;
  border-top: 1px solid #FFFFFF;
  border-left: 1px solid #FFFFFF;
  box-shadow: inset 1px 1px 0 #DFDFDF, inset -1px -1px 0 #808080;
  padding: 1px 10px 1px 10px;
  min-width: 75px;
  text-align: center;
}
.win95 button:focus {
  border: 1px solid #000000;
  outline: 1px dotted #000000;
  box-shadow: inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #000000,
    inset 2px 2px 0 #DFDFDF, inset -2px -2px 0 #808080;
  outline-offset: -4px;
}
.win95 button:active {
  border: 1px solid #000000;
  box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #808080;
  padding: 2px 9px 0 11px;
}

.warp4 {
  background-color: #D7D7D7;
  font-size: 14px;
}
.warp4 button {
  background-color: #D7D7D7;
  color: #000000;
  border: 2px solid #FFFFFF;
  border-bottom: 2px solid #808080;
  border-right: 2px solid #808080;
  box-shadow: -1px -1px 0 #808080, 1px 1px 0 #FFFFFF;
  padding: 1px 10px 1px 10px;
  min-width: 75px;
  text-align: center;
}
.warp4 button:focus {
  outline: 2px solid #000000;
  outline-offset: 0;
}
.warp4 button:active {
  border-color: #808080;
  border-bottom-color: #FFFFFF;
  border-right-color: #FFFFFF;
  padding: 2px 9px 0 11px;
}

.macos8 {
  background-color: #DDDDDD;
  font-size: 14px;
}
.macos8 button {
  background-color: #DDDDDD;
  color: #000000;
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: inset 1px 1px 0 #DDDDDD, inset 2px 2px 0 #fff, inset -1px -1px 1px #555;
  padding: 2px 10px;
  min-width: 75px;
  text-align: center;
}
.macos8 button:active {
  background-color: #666666;
  color: #fff;
  box-shadow: inset 1px 1px 1px #333, inset -1px -1px 1px #999;
}

.kde1 {
  background-color: #C0C0C0;
  font-size: 14px;
}
.kde1 button {
  background-color: #C0C0C0;
  color: #000000;
  border: 1px solid #000000;
  border-top: 1px solid #F8FCF8;
  border-left: 1px solid #F8FCF8;
  box-shadow: inset 1px 1px 0 #D8DCD8, inset -1px -1px 0 #606060;
  padding: 4px 10px 4px 10px;
  min-width: 100px;
  text-align: center;
}
.kde1 button:active {
  border: 1px solid #000000;
  border-bottom: 1px solid #F8FCF8;
  border-right: 1px solid #F8FCF8;
  box-shadow: inset 1px 1px 0 #606060;
  padding: 5px 9px 3px 11px;
}


.win2000 {
  background-color: #D4D0C8;
  font-size: 14px;
}
.win2000 button {
  background-color: #D4D0C8;
  color: #000000;
  border: 1px solid #000000;
  border-top: 1px solid #FFFFFF;
  border-left: 1px solid #FFFFFF;
  box-shadow: inset -1px -1px 0 #808080;
  padding: 3px 10px 3px 10px;
  min-width: 100px;
  text-align: center;
}
.win2000 button:focus {
  border: 1px solid #000000;
  box-shadow: inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #000000,
    inset 2px 2px 0 #DFDFDF, inset -2px -2px 0 #808080;
}
.win2000 button:active {
  border: 1px solid #000000;
  box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #808080;
  padding: 4px 9px 2px 11px;
}

.winxp {
  background-color: #F4F3EE;
  font-size: 14px;
}
.winxp button {
  background: linear-gradient(180deg, #ffffff 0%, #F0F0EA 100%);
  color: #000;
  border: 1px solid #003C74;
  border-radius: 3px;
  padding: 1px 16px;
  box-shadow: -1px -1px 0 #E2DED4, 1px 1px 0 #FBFAF8, inset -1px -2px 1px #D6D0C5;
  position: relative;
  overflow: hidden;
}
.winxp button:active {
  background: #E2E1D9;
  box-shadow: inset 1px 2px 1px #D1CCC1, inset 0 -1px 1px #fff;
}
.winxp button:after {
  content: '';
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
}
.winxp button:focus:after {
  display: block;
  border: 3px solid #6F98CF;
}
.winxp button:hover:after {
  display: block;
  border: 3px solid #F5C05D;
}
.winxp button:active:after {
  display: none;
}
</style>


 <div class="button-container alto">
  <button>Quit</button>
</div>

<div class="button-container star">
  <button>Show Previous</button>
</div>

<div class="button-container lisa">
  <button>Enter</button>
</div>

<div class="button-container mac">
  <button>Add City</button>
</div>

<div class="button-container workbench">
  <button>Last Saved</button>
</div>

<div class="button-container win1">
  <button>Change All</button>
</div>

<div class="button-container geos">
  <button>Cancel</button>
</div>

<div class="button-container os2">
  <button><u>I</u>con&hellip;</button>
</div>

<div class="button-container win2">
  <button><u>C</u>lear</button>
</div>

<div class="button-container openlook">
  <button>No</button>
</div>

<div class="button-container motif">
  <button>Sync</button>
</div>

<div class="button-container nextstep">
  <button>Expert&hellip;</button>
</div>

<div class="button-container workbench2">
  <button>Use</button>
</div>

<div class="button-container geoworks">
  <button><u>R</u>e-Deal Cards</button>
</div>

<div class="button-container viewmax">
  <button><u>A</u>ssign</button>
</div>

<div class="button-container win3">
  <button>OK</button>
</div>

<div class="button-container viewmax2">
  <button><u>F</u>ind</button>
</div>

<div class="button-container os22">
  <button><u>D</u>elete</button>
</div>

<div class="button-container cde">
  <button>Show Access Control List</button>
</div>

<div class="button-container system7">
  <button>Switch Disk</button>
</div>

<div class="button-container bob">
  <button>A-OK</button>
</div>

<div class="button-container win95">
  <button>Sa<u>v</u>e As&hellip;</button>
</div>

<div class="button-container warp4">
  <button><u>E</u>dit&hellip;</button>
</div>

<div class="button-container macos8">
  <button>Set Time Zone&hellip;</button>
</div>

<div class="button-container kde1">
  <button><u>A</u>dd &hellip;</button>
</div>

<div class="button-container win2000">
  <button>Power&hellip;</button>
</div>

<div class="button-container winxp">
  <button>Advanced</button>
</div>

