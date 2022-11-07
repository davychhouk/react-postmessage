# react-postmessage

Enable data communication between a react app and its embedded (via embed/iframe) react app.

## Installation

npm:

```sh
npm install react-postmessage
```

yarn:

```sh
yarn add react-postmessage
```

pnpm:

```sh
pnpm add react-postmessage
```

## How it works

![react-postmessage](https://user-images.githubusercontent.com/13924709/200339811-7e42552f-5d9c-405b-8a84-e9d61fdef313.png)

## Usage

### Coding example

![photo_2022-11-07 09 20 29](https://user-images.githubusercontent.com/13924709/200347186-5bb6e1ed-f592-4fd8-8d5f-efb5f798d46c.jpeg)

In `App1`:

```javascript
import { useEffect, useState } from "react";
import { attachParamsToUrl, Iframe, initRequester } from "react-postmessage";
import "./App.css";

const URL = "http://localhost:3001";
const testData = {
  test: "sth from app1",
};

type Data = {
  test: string,
};

function App() {
  const [data, setData] = useState < Data > { test: "" };
  const [show, setShow] = useState < boolean > true;

  useEffect(() => {
    initRequester <
      Data >
      {
        url: URL,
        checkOrigin: true,
        data: testData,
        hook: setData,
        close: () => setShow(false),
      };
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
```

In `App2`:

```javascript
import { useEffect, useState } from "react";
import {
  initReceiver,
  cleanUp,
  postMessage,
  signalClose,
} from "react-postmessage";
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

    return () => {
      cleanUp();
    };
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
```

For complete coding example, please find demonstration in the example folder.

### Run example

Terminal 1: Run app1 on port 3000.

```sh
cd example/app1
yarn install
yarn start
```

Terminal 2: Run app2 on port 3001.

```sh
cd example/app2
yarn install
yarn start
```

In you browser, go to [localhost:3000](http://localhost:3000).

## API Document

### Components

| Name     | Type        | Props                                                                      | Description                               |
| -------- | ----------- | -------------------------------------------------------------------------- | ----------------------------------------- |
| `Iframe` | `component` | `url`, `height` (Optional, Default: 450), `width` (Optional, Default: 450) | Iframe component to load another web app. |

### Utilities

| Name     | Type        | Props                                                                      | Description                               |
| -------- | ----------- | -------------------------------------------------------------------------- | ----------------------------------------- |
| `initRequester` | `func` | `url`, `checkOrigin` (Optional), `data` (Optional), `hook` (Optional), `close` (Optional) | Init listener in the origin app.   |
| `initReceiver`  | `func` | `fromOrigin`, `setFromOrigin`, `checkOrigin` (Optional), `hook`                           |Init listener in the destination app. |
| `postMessage`   | `func` | `data`, `targetOrigin`                                                                    | Post message back to requester.    |
| `signalClose`   |`func` |                                                                                           | Signal close from destination app. |
| `getParam`      | `func` | `href`, `name`                                                                            | Get params (name) from url.            |
| `attachParamsToUrl` | `func` | `url`, `params`                                                                           | Attach params to url.                 |

## TODO

- Support for `embed`.
- Add tests.
