import { useEffect, useState } from "react";
import {
  attachParamsToUrl,
  initRequester,
  Iframe,
} from "@chhoukdavy/react-postmessage";
import "./App.css";

const URL = "http://localhost:3001";
const TEST_DATA = {
  test: "sth from app1",
};

type Data = {
  test: string;
};

function App() {
  const [data, setData] = useState<Data>({ test: "" });
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    initRequester<Data>({
      url: URL,
      data: TEST_DATA,
      checkOrigin: true,
      hook: setData,
      close: () => setShow(false),
    });
  }, []);

  const formedURL = attachParamsToUrl(URL, [
    {
      name: "fromOrigin",
      value: window?.location?.origin,
    },
  ]);

  return (
    <div className="App">
      <h1>App1</h1>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        Data: {JSON.stringify(data)}
      </div>

      {show && (
        <div style={{ marginTop: 20 }}>
          <Iframe url={formedURL} width={400} height={250} />
        </div>
      )}
    </div>
  );
}

export default App;
