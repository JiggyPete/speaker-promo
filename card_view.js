let CardView = class {
  constructor(speaker) {
    this.speaker = speaker
    speaker.addListener(this)

    this.cfpDayYellow = "#FFFF80";
    this.backgroundColour = "#26353F";
    this.rhsLeftPadding = 450;
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
    img.src = speaker.picture
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
    context.font = "40px Comfortaa";
    context.letterSpacing = "100px"
    context.fillStyle = this.cfpDayYellow
    context.fillText(name, this.rhsLeftPadding, 90);
  }

  _drawTwitter(twitter, context) {
    context.font = "25px Comfortaa";
    context.fillStyle = "white"
    context.fillText(twitter, this.rhsLeftPadding, 130);
  }

  _drawTalk(talk, context) {
    var maxWidth = 300;
    var lineHeight = 25;
    var x = this.rhsLeftPadding;
    var y = 180;

    context.font = '16pt Comfortaa';
    context.fillStyle = 'white';

    this._wrapText(context, talk, x, y, maxWidth, lineHeight);
  }

  _drawTiming(context) {
    context.font = '25px Comfortaa';
    context.fillStyle = this.cfpDayYellow
    context.fillText("Sat 23rd Jan 2021", this.rhsLeftPadding + 80, 300);
    context.fillStyle = "white"

    context.fillText("- 09:00 PST", this.rhsLeftPadding + 165, 330);
    context.fillText("- 12:00 SGT", this.rhsLeftPadding + 165, 360);
    context.fillText("- 13:00 JST", this.rhsLeftPadding + 165, 390);
  }

  _drawFooter(canvas, context) {
    context.fillStyle = this.backgroundColour
    context.fillRect(0, 400, canvas.width, canvas.height);

    context.font = '25px Comfortaa';
    context.fillStyle = this.cfpDayYellow
    context.fillText("global diversity CFP day", 40, 460);
    context.fillText("@gdcfpday", 600, 460);
  }

  _canvas() {
    return document.getElementsByTagName("canvas")[0]
  }

  _redrawView() {
    var name = speaker.name
    var talk = speaker.talk
    var twitter = speaker.twitter
    var picture = speaker.picture
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

