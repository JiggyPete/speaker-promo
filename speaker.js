let Speaker = class {
  constructor(name, talk, twitter, picture) {
    this.name = name;

    if(this.name == undefined) {
      this.name = "Name here"
    } else {
      this.name = name;
    }
    this.nameFontSize = "40px"
    this.nameX = "450"
    this.nameY = "90"

    if(this.talk == undefined) {
      this.talk = "Talk title here"
    } else {
      this.talk = talk;
    }
    this.talkFontSize = "20px"
    this.talkX = "450"
    this.talkY = "200"

    if(this.twitter == undefined) {
      this.twitter = "Twitter here"
    } else {
      this.twitter = twitter;
    }
    this.twitterFontSize = "25px"
    this.twitterX = "450"
    this.twitterY = "130"

    this.continent = "Australia / Oceania"

    this.startTimes = [
      "- 09:00 AAA",
      "- 12:00 BBB"
    ]
    this.startTimesFontSize = "25px"
    this.startTimesX = "530"
    this.startTimesY = "330"


    if(this.picture == undefined) {
      this.picture = "images/hj-chen.png"
    } else {
      this.picture = picture;
    }

    this.listener = null;
  }

  addListener(listener) {
    this.listener = listener
  }

  setName(name) {
    this.name = name
    this._notifyListener();
  }
  setNameFontSize(fontSize) {
    this.nameFontSize = fontSize
    this._notifyListener();
  }
  setNameX(x) {
    this.nameX = x
    this._notifyListener();
  }
  setNameY(y) {
    this.nameY = y
    this._notifyListener();
  }


  setTalk(talk) {
    this.talk = talk
    this._notifyListener();
  }
  setTalkFontSize(fontSize) {
    this.talkFontSize = fontSize
    this._notifyListener();
  }
  setTalkX(x) {
    this.talkX = x
    this._notifyListener();
  }
  setTalkY(y) {
    this.talkY = y
    this._notifyListener();
  }


  setTwitter(twitter) {
    this.twitter = twitter
    this._notifyListener();
  }
  setTwitterFontSize(fontSize) {
    this.twitterFontSize = fontSize
    this._notifyListener();
  }
  setTwitterX(x) {
    this.twitterX = x
    this._notifyListener();
  }
  setTwitterY(y) {
    this.twitterY = y
    this._notifyListener();
  }

  setContinent(continent) {
    this.continent = continent
    this._notifyListener();
  }

  setPicture(picture) {
    this.picture = picture
    this._notifyListener();
  }

  setStartTimes(startTimes) {
    this.startTimes = startTimes.split("\n")
    this._notifyListener();
  }
  setStartTimesFontSize(fontSize) {
    this.startTimesFontSize = fontSize
    this._notifyListener();
  }
  setStartTimesX(x) {
    this.startTimesX = x
    this._notifyListener();
  }
  setStartTimesY(y) {
    this.startTimesY = y
    this._notifyListener();
  }

  _notifyListener() {
    if( this.listener == null ) {
      return ;
    } else  {
      this.listener.modelChanged();
    }
  }
};
