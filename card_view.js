let CardView = class {
  constructor(speaker) {
    this.speaker = speaker
    speaker.addListener(this)

    this.cfpDayYellow = "#FFFF80";
    this.black = "#26353F"
    this.backgroundColour = this.black;

    this.primaryTextColour = this.cfpDayYellow
    this.secondaryTextColour = "white"

    this.rhsLeftPadding = 450;

    this._redrawView()
  }

  modelChanged() {
    this._redrawView()
  }

  _roundedImage(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }

  _drawPicture(filename, x, y, width, height, context) {
    if(filename == null || filename == "") {
      return
    }

    var img = new Image();
    var roundedImage = this._roundedImage
    img.onload = function(){
        context.imageSmoothingEnabled = true;

        context.save()
        roundedImage(context, x, y, width, height, 10)
        context.clip()
        context.drawImage(img, x, y, width, height);
        context.restore();
    }
    img.src = filename
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
      var testWidth = metrics.width - 80;
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
    context.fillStyle = this.primaryTextColour
    context.fillText(name, x, y);
  }

  _drawTwitter(twitter, context) {
    var x = parseInt(this.speaker.twitterX)
    var y = parseInt(this.speaker.twitterY)

    context.font = this.speaker.twitterFontSize + " Comfortaa";
    context.fillStyle = this.secondaryTextColour
    context.fillText(twitter, x, y);
  }

  _drawTalk(talk, context) {
    var maxWidth = 300;
    var lineHeight = 30;

    var x = parseInt(this.speaker.talkX)
    var y = parseInt(this.speaker.talkY)

    context.font = this.speaker.talkFontSize + ' Comfortaa';
    context.fillStyle = this.secondaryTextColour

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
    context.fillStyle = this.primaryTextColour
    context.fillText("Sat 20th Feb 2021", leftPadding, y);
    context.fillStyle = this.secondaryTextColour

    var timingLeftPadding = leftPadding + 92
    var startTimes = this.speaker.startTimes.concat(["", "", "", ""])

    context.fillText(startTimes[0], timingLeftPadding, this._calculateYStartTimeFor(y, 0, fontSize) );
    context.fillText(startTimes[1], timingLeftPadding, this._calculateYStartTimeFor(y, 1, fontSize) );
    context.fillText(startTimes[2], timingLeftPadding, this._calculateYStartTimeFor(y, 2, fontSize) );
    context.fillText(startTimes[3], timingLeftPadding, this._calculateYStartTimeFor(y, 3, fontSize) );
  }

  _drawFooter(canvas, context) {
    context.font = '25px Comfortaa';
    context.fillStyle = this.primaryTextColour
    context.fillText("global diversity CFP day", 30, 425);
    context.fillText("@gdcfpday", 620, 470);

    context.font = '25px Comfortaa';
    context.fillText(this.speaker.continent, 30, 470);
  }

  _canvas() {
    return document.getElementsByTagName("canvas")[0]
  }

  _redrawView() {
    var name = this.speaker.name
    var talk = this.speaker.talk
    var twitter = this.speaker.twitter
    var picture = this.speaker.profilePicture()
    var canvas = this._canvas()
    var context = canvas.getContext("2d");

    context.fillStyle = this.backgroundColour
    context.fillRect(0, 0, canvas.width, canvas.height);

    this._drawName(name, context)
    this._drawTwitter(twitter, context)
    this._drawTalk(talk, context)
    this._drawTiming(context)
    this._drawFooter(canvas, context)
    this._drawPicture(picture, 30, 30, 350, 350, context)
  }

}

