import {React} from "../global";

const {useState, useEffect} = React
export const getTargetElement = (target, defaultElement = window) => {
  if (!target) {
    return defaultElement
  }

  let targetElement;

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    if (target.current) {
      targetElement = target.current
    } else {
      return defaultElement
    }
  } else {
    targetElement = target
  }

  return targetElement
}

const useSize = (target) => {
  const [state, setState] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const targetElement = getTargetElement(target)
    if (!targetElement) {
      return
    }

    const observer = new ResizeObserver(function elResizeChange(entries) {
      // 每次被观测的元素尺寸发生改变这里都会执行
      entries.forEach((entry) => {
        const {width, height} = entry.target.getBoundingClientRect()
        setState({
          width: width,
          height: height,
        });
      });
    })
    observer.observe(targetElement) // 观测DOM元素

    return () => {
      observer.disconnect()
    }
  }, [target])

  return {
    ...state
  }
}

export default useSize
