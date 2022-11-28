import { useEffect, useState } from "react";
import {
  initReceiver,
  cleanUp,
  postMessage,
  signalClose,
} from "@chhoukdavy/react-postmessage";
import "./App.css";

type HookData = {
  test: string;
};

function App() {
  const [fromOrigin, setFromOrigin] = useState<string>("");
  const [data, setData] = useState<HookData>();

  useEffect(() => {
    initReceiver<HookData>({
      fromOrigin,
      setFromOrigin,
      hook: setData,
      checkOrigin: true,
    });
    return cleanUp();
  }, [fromOrigin]);

  return (
    <div className="App">
      <h1>App2</h1>
      {data && (
        <>
          <p>Data: {JSON.stringify(data)}</p>
          <div>
            <button
              style={{ marginRight: 10 }}
              onClick={() => postMessage({ test: "sth from app2" }, fromOrigin)}
            >
              Send
            </button>
            <button onClick={() => signalClose(fromOrigin)}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
