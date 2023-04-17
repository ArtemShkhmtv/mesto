class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    this._userInfoList = {};
    this._userInfoList.name = this._userName.textContent;
    this._userInfoList.info = this._userInfo.textContent;
    return this._userInfoList;
  }

  setUserInfo(newName, newInfo) {
    this._userName.textContent = newName;
    this._userInfo.textContent = newInfo;
  }
}
export {UserInfo};