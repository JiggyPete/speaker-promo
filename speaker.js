let Speaker = class {
  constructor(name, talk, twitter, picture) {
    this.name = name;
    this.talk = talk;
    this.twitter = twitter;
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

  setTalk(talk) {
    this.talk = talk
    this._notifyListener();
  }

  setTwitter(twitter) {
    this.twitter = twitter
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
