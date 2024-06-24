import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const [copy, setCopy] = useState(false);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let pass = "";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|<>?/~";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    setCopy(false);
    passRef.current?.select();

    window.navigator.clipboard.writeText(password);
    setCopy(true);
    
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center flex-col items-center h-[100vh] bg-slate-800 p-[6rem] text-white">
        <h1 className="text-4xl">Password Generator</h1>
        {/* <h1>he you are </h1> */}

        

        <div className="flex justify-center items-center m-4 flex-col">
          <div>
            <input
              type="text"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-[20rem] px-4 py-2 outline-none rounded-md text-black"
            />

            <button
              onClick={copyToClipboard}
              className="w-[6rem] px-4 py-2 rounded-md ml-1 bg-blue-700"
            >
              {copy  ? "coppied!" : "copy"}
            </button>
          </div>

          <div className="flex justify-center items-center gap-10 mt-2">
            <div>
              <input
                type="range"
                min={6}
                max={100}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />

              <label htmlFor=""> length: {length}</label>
            </div>

            <div>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charAllowed"
                onChange={() => {
                  setcharAllowed((prev) => !prev);
                }}
              />

              <label htmlFor="charAllowed">Char</label>
            </div>

            <div>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberAllowed"
                onChange={() => {
                  setnumberAllowed((prev) => !prev);
                }}
              />

              <label htmlFor="numberAllowed">Number</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
