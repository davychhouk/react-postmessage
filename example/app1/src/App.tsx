import { useEffect } from "react";
import { attachParamsToUrl, Iframe, initRequester } from "react-postmessage";
import "./App.css";

const URL = "http://localhost:3001";
const testData = {
  test: "sth from app1",
};

type Data = {
  test: string;
};

function App() {
  useEffect(() => {
    initRequester<Data, Data>({
      url: URL,
      fromOrigin: window?.location?.origin,
      checkOrigin: false,
      data: testData,
      hook: () => {},
    });
  }, []);

  const formedURL = attachParamsToUrl(URL, [
    {
      name: "fromOrigin",
      value: "http://localhost:3000",
    },
  ]);

  return (
    <div className="App">
      <h1>App1</h1>
      <div style={{ marginTop: 20 }}>
        <Iframe url={formedURL} width={300} height={300} />
      </div>
    </div>
  );
}

export default App;
