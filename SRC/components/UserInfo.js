class UserInfo {
  constructor(userNameSelector, userInfoSelector, userPhotoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userPhoto = document.querySelector(userPhotoSelector);
  }

  getUserInfo() {
    this._userInfoList = {};
    this._userInfoList.name = this._userName.textContent;
    this._userInfoList.info = this._userInfo.textContent;
    return this._userInfoList;
  }

  setUserInfo(newName = this._userName, newInfo = this._userInfo, newPhoto = this._userPhoto.src) {
    this._userName.textContent = newName;
    this._userInfo.textContent = newInfo;
    this._userPhoto.src = newPhoto;
  }
}
export {UserInfo};