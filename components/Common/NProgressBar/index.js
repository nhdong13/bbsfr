import Router from "next/router"
import NProgress from "nprogress"
import { useEffect } from "react";

const NProgressBarComponent = (props) => {
  let timer = null
  
  const init = {
    color: "#ffb00f",
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3,
  }
  
  useEffect(() => {
    const { options } = props
    if (options) {
      NProgress.configure(options)
    }
    Router.events.on("routeChangeStart", routeChangeStart)
    Router.events.on("routeChangeComplete", routeChangeEnd)
    Router.events.on("routeChangeError", routeChangeEnd)
  }, [])

  const routeChangeStart = () => {
    NProgress.set(init.startPosition)
    NProgress.start()
  }

  const routeChangeEnd = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      NProgress.done(true)
    }, init.height)
  }
  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${init.color};
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: ${init.height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${init.color}, 0 0 5px ${init.color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }

      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  )
}
export default NProgressBarComponent
