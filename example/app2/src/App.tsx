import { useEffect, useState } from "react";
import { initReceiver, cleanUp } from "react-postmessage";
import "./App.css";

const FROM_ORIGIN = "http://localhost:3000";

type HookData = {
  test: string;
};

function App() {
  const [data, setData] = useState<HookData>();

  useEffect(() => {
    initReceiver<HookData>({
      fromOrigin: FROM_ORIGIN,
      checkOrigin: false,
      hook: setData,
    });

    return () => {
      cleanUp();
    };
  }, []);

  return (
    <div className="App">
      <h1>App2</h1>
      <p>Data: {data?.test}</p>
    </div>
  );
}

export default App;
