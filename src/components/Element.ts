export type ElementConstructor = {
  type?: string;
  className?: string;
};

class Element {
  type;
  body;
  className;

  constructor(params: ElementConstructor = { type: 'div', className: undefined }) {
    const { type, className } = params;

    this.type = type;
    this.body = document.createElement(this.type || 'div');

    if (className?.length) {
      const classNameList = className.split(' ');
      for (const name of classNameList) this.body.classList.add(name);
      this.className = className;
    }
  }

  setStyle = (prop: string, value: string | number) => {
    this.body.style[prop] = value;
  };

  destroy = () => {
    this.body.parentNode?.removeChild(this.body);
  };
}

export default Element;
