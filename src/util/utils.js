export default {
  // 增加className
  addClass(el, name) {
    let className = el.className;
    let arr = className.split(" ");
    let newArr = arr.filter(value => {
      return value === name;
    });
    if (newArr.length !== 0) return;
    el.className += " " + name;
  },
  //移除claaName
  removeClass(el, name) {
    let className = el.className;
    let arr = className.split(" ");
    let filter = arr.filter(value => {
      return value !== name;
    });
    filter.join(" ");
    el.className = filter.join(" ");
  },
  // 是否包含该classname
  hasClass(el, name) {
    let className = el.className;
    let arr = className.split(' ');
    let filter = arr.filter(value => {
      return value === name;
    })
    return filter.length === 0 ? false : true;
  }
}