let Speaker = class {
  constructor(name, talk, twitter, picture) {
    this.name = name;
    this.nameFontSize = "40px"
    this.nameX = "450"
    this.nameY = "90"

    this.talk = talk;
    this.talkFontSize = "20px"
    this.talkX = "450"
    this.talkY = "200"

    this.twitter = twitter;
    this.twitterFontSize = "25px"
    this.twitterX = "450"
    this.twitterY = "130"

    this.continent = "Australia / Oceania"

    this.picture = picture;
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

  _notifyListener() {
    if( this.listener == null ) {
      return ;
    } else  {
      this.listener.modelChanged();
    }
  }
};
