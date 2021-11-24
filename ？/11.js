"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(userData) {
        this.token = userData.token;
        this.config = userData.config;
        this.name = userData.name;
        this.userNo = userData.userNo;
        this.setLocalStorage();
    }
    User.prototype.setToken = function (token) {
        this.token = token;
        this.setLocalStorage();
    };
    User.prototype.setConfig = function (config) {
        this.config = config;
        this.setLocalStorage();
    };
    User.prototype.setName = function (name) {
        this.name = name;
        this.setLocalStorage();
    };
    User.prototype.setLocalStorage = function () {
        var data = {
            token: this.token,
            name: this.name,
            userNo: this.userNo,
            config: this.config
        };
        localStorage.setItem('userData' + data.userNo, JSON.stringify(data));
    };
    User.prototype.removeLocalStorage = function () {
        localStorage.removeItem('userData' + this.userNo);
    };
    User.prototype.setUserData = function (userData) {
        this.token = userData.token;
        this.config = userData.config;
        this.name = userData.name;
        this.userNo = userData.userNo;
        this.setLocalStorage();
    };
    return User;
}());
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.userNoNow = localStorage.getItem('userNoNow');
        this.userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];
        this._setUser();
        this.config = localStorage.getItem('globeConfig') ? JSON.parse(localStorage.getItem('globeConfig')) : null;
    }
    LocalStorage.prototype._setUser = function () {
        var userData = localStorage.getItem('userData' + this.userNoNow);
        if (this.userList && this.userNoNow && this.userList.includes(this.userNoNow) && userData) {
            this.user = new User(JSON.parse(userData));
        }
    };
    LocalStorage.prototype._setUserList = function () {
        localStorage.setItem('userList', JSON.stringify(this.userList));
    };
    LocalStorage.prototype._setUserNoNow = function (userNo) {
        this.userNoNow = userNo;
        localStorage.setItem('userNoNow', this.userNoNow);
        if (!this.userList.includes(this.userNoNow)) {
            this.userList.push(this.userNoNow);
            this._setUserList();
        }
    };
    LocalStorage.prototype.getAllConfig = function () {
        return this.config;
    };
    LocalStorage.prototype.setAllConfig = function (config) {
        this.config = config;
        localStorage.setItem('globeConfig', JSON.stringify(config));
    };
    LocalStorage.prototype.getUserConfig = function () {
        var _a;
        return (_a = this.user) === null || _a === void 0 ? void 0 : _a.config;
    };
    LocalStorage.prototype.setUserConfig = function (config) {
        if (this.user) {
            this.user.setConfig(config);
            return true;
        }
        else {
            return false;
        }
    };
    LocalStorage.prototype.getUserToken = function () {
        var _a;
        return (_a = this.user) === null || _a === void 0 ? void 0 : _a.token;
    };
    LocalStorage.prototype.setUserToken = function (token) {
        if (this.user) {
            this.user.setToken(token);
            return true;
        }
        else {
            return false;
        }
    };
    LocalStorage.prototype.getUserName = function () {
        var _a;
        return (_a = this.user) === null || _a === void 0 ? void 0 : _a.name;
    };
    LocalStorage.prototype.setUserName = function (name) {
        if (this.user && this.userNoNow) {
            this.userList[this.userList.indexOf(this.userNoNow)] = name;
            this.userNoNow = name;
            this.user.setName(name);
            return true;
        }
        else {
            return false;
        }
    };
    LocalStorage.prototype.createUser = function (userData) {
        if (typeof userData === 'string') {
            this._setUserNoNow(userData);
            if (this.userList && this.userList.includes(userData)) {
                this._setUser();
            }
            else {
                this.user = new User({
                    userNo: userData
                });
            }
        }
        else {
            this._setUserNoNow(userData.userNo);
            this.user = new User(userData);
        }
    };
    LocalStorage.prototype.dropUser = function () {
        var _a, _b;
        if (this.userNoNow) {
            (_a = this.userList) === null || _a === void 0 ? void 0 : _a.splice(this.userList.indexOf(this.userNoNow), 1);
            this._setUserList();
            (_b = this.user) === null || _b === void 0 ? void 0 : _b.removeLocalStorage();
            this.user = null;
            this.userNoNow = null;
            localStorage.removeItem('userNoNow');
            return true;
        }
        else {
            return false;
        }
    };
    LocalStorage.prototype.setUserData = function (userData) {
        var _a;
        (_a = this.user) === null || _a === void 0 ? void 0 : _a.setUserData(userData);
    };
    return LocalStorage;
}());
var LocalStorageUtil = new LocalStorage();
exports["default"] = LocalStorageUtil;
