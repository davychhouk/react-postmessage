import { IFRAME_ID, TYPES } from "../constants";
import { getOriginFromUrl, getParam } from "./params";

type RequesterArgs = {
  url: string;
  fromOrigin: string;
  checkOrigin?: boolean;
};
export function initRequester<Data>({
  url,
  checkOrigin,
  data,
  hook,
  close,
}: RequesterArgs & {
  data?: Data;
  hook?: (args: Data) => void;
  close?: () => void;
}) {
  if (window && document) {
    const iframeElement = document?.getElementById(
      IFRAME_ID
    ) as HTMLIFrameElement;
    const iframeWindow = iframeElement?.contentWindow;

    /**
     * Register listener
     */
    window?.addEventListener(
      "message",
      (e) => {
        if (checkOrigin && e?.origin !== getOriginFromUrl(url)) return;
        /**
         * Handshake when iframe widow loaded
         * Send data
         */
        const type = e?.data?.type;
        if (type === TYPES.handshake) {
          iframeWindow?.postMessage(
            {
              type: TYPES?.request,
              payload: data,
            },
            e?.origin
          );
          return;
        }

        /**
         * Listen for transfer
         * And hook the data transfer
         */
        const payload = e?.data?.payload;
        if (type === TYPES.response && payload) {
          hook && hook(payload);
          return;
        }

        /**
         * Listen for close
         * Cleanup on close
         */
        if (type === TYPES.close) {
          close && close();
          window?.removeEventListener("message", () => {});
          return;
        }
      },
      false
    );
  }
}

type ResponderArgs = {
  fromOrigin: string;
  setFromOrigin: (o: string) => void;
  checkOrigin?: boolean;
};
export function initReceiver<Data>({
  fromOrigin,
  setFromOrigin,
  checkOrigin,
  hook,
}: ResponderArgs & { hook: (args: Data) => void }) {
  if (window) {
    /**
     * Listen for transfer
     */
    window.addEventListener(
      "message",
      (e) => {
        if (checkOrigin && e?.origin !== fromOrigin) return;
        const type = e?.data?.type;
        const payload = e?.data?.payload;
        if (type === TYPES.request && payload) {
          hook(payload);
          return;
        }
      },
      false
    );

    /**
     * Handshake origin
     */
    const origin = getParam(window?.location?.href, "fromOrigin");
    if (origin) {
      setFromOrigin(origin);
      window?.parent?.postMessage({ type: TYPES.handshake }, origin);
    }
  }
}

export function postMessage<Data>(data: Data, targetOrigin: string) {
  if (window?.parent) {
    window.parent?.postMessage(
      {
        type: TYPES.response,
        payload: data,
      },
      targetOrigin
    );
  }
}

export function signalClose(targetOrigin: string) {
  if (window?.parent) {
    window.parent?.postMessage(
      {
        type: TYPES.close,
      },
      targetOrigin
    );
  }
}

/**
 * Clean up on unmount
 */
export const cleanUp = () => {
  return () => window?.removeEventListener("message", () => {});
};
