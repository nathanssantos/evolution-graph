class Element {
  constructor(props = {}) {
    const { type, className } = props;

    this.type = type || "div";
    this.body = document.createElement(this.type);

    if (className?.length) {
      const classNameList = className.split(" ");
      for (const name of classNameList) this.body.classList.add(name);
      this.className = className;
    }
  }

  setStyle = (prop, value) => {
    this.body.style[prop] = value;
  };

  destroy = () => {
    this.body.parentNode.removeChild(this.body);
  };
}

export default Element;
