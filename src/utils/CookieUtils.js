/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable class-methods-use-this */
export default class Cookies {
  set(name, value, expires = 2) {
    let cookie = `${name}=${escape(value)}`;
    if (expires > 0) {
      let date = new Date(),
        ms = expires * 60 * 60 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += `; expires=${date.toGMTString()}`;
    }
    document.cookie = cookie;
  }
  get(name) {
    let arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
    if (arr != null) return unescape(arr[2]); return null;
  }
  delete(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.get(name);
    if (cval != null) {
      document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
    }
  }
}

