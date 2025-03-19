import React, { useState, useRef, useEffect } from "react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useSpring, animated } from "react-spring";
import { FaChevronDown } from "react-icons/fa";

import "./styles.css";

const options = [
  { value: 'Next', label: 'Next', icon: "/assets/next-logo.png" },
  { value: 'React', label: 'React', icon: "/assets/react-logo.png" },
  { value: 'Tailwind', label: 'Tailwind', icon: "/assets/tailwind-logo.png" },
  { value: 'Typescript', label: 'Typescript', icon: "/assets/typescript-logo.png" },
];

function App(props) {
  return (
    <main className="relative h-screen bg-gradient-to-r from-slate-600 to-slate-800">
        <h1 className="text-center text-3xl font-bold mb-6 pt-14 mx-10 text-white opacity-80">Custom Select</h1>
        <CustomSelect />
    </main>
  );
}

const CustomSelect = () => {
  const [isToggled, setToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setTimeout(() => {
      setToggle(false);
    }, "300");
  };

  const menubg = useSpring({ background: isToggled ? "#34D399" : "#020617", border: isToggled ? "4px solid #059669" : "4px solid rgba(255, 255, 255, 0.6)" });
  const { y } = useSpring({
    y: isToggled ? 180 : 0
  });
  const menuAppear = useSpring({
    transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
    opacity: isToggled ? 1 : 0
  });
  const menuRef = useRef(null);


  useEffect(() => {
    const handleOutsideClicks =(event)=>{
      if(isToggled && menuRef?.current && !menuRef?.current?.contains(event.target)){
          setToggle(false);
       };
    };

    document.addEventListener("mousedown", handleOutsideClicks);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [isToggled]);
 
  return (
    <div style={{ position: "relative", width: "300px", margin: "0 auto" }} ref={menuRef}>
      <animated.button
        style={menubg}
        className="w-[300px] rounded-2xl text-md lg:text-lg py-2 px-4 outline-none shdow-lg lg:shadow-xl shadow-slate-500/40 cursor-pointer"
        onClick={() => setToggle(prev => !prev)}
      >
        <div className="flex items-center gap-x-4 justify-between">
          <div className="flex items-center gap-x-4">
            <img src={selectedOption?.icon || "/assets/configurations.png"} alt={selectedOption?.label} className="rounded-full" width={40} height={40} />
            <p className={isToggled ? "text-slate-950" : "text-white opacity-80"}>
              {selectedOption?.label || "Select one tool"}
            </p>
          </div>
          <animated.div
           style={{ transform: y.to(y => `rotateZ(${y}deg)`) }}
          >

            <FaChevronDown size={30} color={isToggled ? "#059669" : "rgba(255, 255, 255, 0.8)"} className="mt-[5px] pointer-events-none" />
          </animated.div>
        </div>
      </animated.button>
      <animated.div style={menuAppear}>
        {isToggled ? 
        <ul className="w-full list-none p-0 flex flex-col flex-nowrap items-start justify-center bg-slate-950 mt-6 rounded-2xl shdow-lg lg:shadow-xl shadow-slate-500/40 cursor-pointer overflow-hidden">
          {options.map((option, index) => {
            return (
              <li key={option.value} className="w-full border-l-4 border-transparent hover:border-l-4 focus:border-l-4 active:border-l-4 hover:border-l-emerald-600 focus:border-l-emerald-600 active:border-l-emerald-600 hover:bg-emerald-400 focus:bg-emerald-400 active:bg-emerald-400 transition-all delay-150 duration-300 ease-in-out" onClick={onOptionClicked(option)}>
                <div className="w-full py-6 px-4 flex items-center gap-x-4 text-white opacity-80 transition-all delay-400 ease-linear duration-300 hover:text-slate-950 focus:text-slate-950 active:text-slate-950">
                  <img src={option.icon} alt={option.label} className="rounded-full" width={40} height={40} />
                  {option.label}
                </div>
                <hr className={index === options.length - 1 ? "hidden" : "w-[94%] h-[1px] mx-auto bg-white opacity-30"} />
              </li>
            )
          })}
        </ul>
         : null}
      </animated.div>
    </div>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);