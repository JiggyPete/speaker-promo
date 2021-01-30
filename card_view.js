let CardView = class {
  constructor(speaker) {
    this.speaker = speaker
    speaker.addListener(this)

    this.cfpDayYellow = "#FFFF80";
    this.backgroundColour = "#26353F";
    this.rhsLeftPadding = 450;

    this._redrawView()
  }

  modelChanged() {
    this._redrawView()
  }

  _drawPicture(filename, x, y, width, height, context) {
    if(filename == null || filename == "") {
      return
    }

    var img = new Image();
    img.onload = function(){
        context.imageSmoothingEnabled = true;
        context.drawImage(img, x, y, width, height);
    }
    img.src = this.speaker.picture
  }

  _wrapText(context, text, x, y, maxWidth, lineHeight) {
    if( text == null || text == "" ) {
      return;
    }

    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  _drawName(name, context) {
    var x = parseInt(this.speaker.nameX)
    var y = parseInt(this.speaker.nameY)

    context.font = this.speaker.nameFontSize + " Comfortaa";
    context.letterSpacing = "100px"
    context.fillStyle = this.cfpDayYellow
    context.fillText(name, x, y);
  }

  _drawTwitter(twitter, context) {
    var x = parseInt(this.speaker.twitterX)
    var y = parseInt(this.speaker.twitterY)

    context.font = this.speaker.twitterFontSize + " Comfortaa";
    context.fillStyle = "white"
    context.fillText(twitter, x, y);
  }

  _drawTalk(talk, context) {
    var maxWidth = 300;
    var lineHeight = 25;

    var x = parseInt(this.speaker.talkX)
    var y = parseInt(this.speaker.talkY)

    context.font = this.speaker.talkFontSize + ' Comfortaa';
    context.fillStyle = 'white';

    this._wrapText(context, talk, x, y, maxWidth, lineHeight);
  }

  _calculateYStartTimeFor(y, index, fontSize) {
    return y + ( (index + 1)*30)
  }

  _drawTiming(context) {
    var fontSize = this.speaker.startTimesFontSize
    var leftPadding = parseInt(this.speaker.startTimesX)
    var y = parseInt(this.speaker.startTimesY)
    context.font = fontSize + ' Comfortaa';
    context.fillStyle = this.cfpDayYellow
    context.fillText("Sat 20th Feb 2021", leftPadding, y);
    context.fillStyle = "white"

    var timingLeftPadding = leftPadding + 85
    var startTimes = this.speaker.startTimes.concat(["", "", "", ""])

    context.fillText(startTimes[0], timingLeftPadding, this._calculateYStartTimeFor(y, 0, fontSize) );
    context.fillText(startTimes[1], timingLeftPadding, this._calculateYStartTimeFor(y, 1, fontSize) );
    context.fillText(startTimes[2], timingLeftPadding, this._calculateYStartTimeFor(y, 2, fontSize) );
    context.fillText(startTimes[3], timingLeftPadding, this._calculateYStartTimeFor(y, 3, fontSize) );
  }

  _drawFooter(canvas, context) {
    context.font = '25px Comfortaa';
    context.fillStyle = this.cfpDayYellow
    context.fillText("global diversity CFP day", 40, 460);
    context.fillText("@gdcfpday", 600, 500);

    context.font = '25px Comfortaa';
    context.fillText(this.speaker.continent, 40, 500);

  }

  _canvas() {
    return document.getElementsByTagName("canvas")[0]
  }

  _redrawView() {
    var name = this.speaker.name
    var talk = this.speaker.talk
    var twitter = this.speaker.twitter
    var picture = this.speaker.picture
    var canvas = this._canvas()
    var context = canvas.getContext("2d");

    context.fillStyle = this.backgroundColour
    context.fillRect(0, 0, canvas.width, canvas.height);

    this._drawPicture(picture, 0, 0, 400, 400, context)
    this._drawName(name, context)
    this._drawTwitter(twitter, context)
    this._drawTalk(talk, context)
    this._drawTiming(context)
    this._drawFooter(canvas, context)
  }

}

