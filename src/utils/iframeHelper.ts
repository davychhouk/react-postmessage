import { IFRAME_ID, TYPES } from "../constants";
import { getOriginFromUrl, getParam } from "./params";

type RequesterArgs = {
  url: string;
  fromOrigin: string;
  checkOrigin?: boolean;
};
export function initRequester<Data, HookData>({
  url,
  checkOrigin,
  data,
  hook,
}: RequesterArgs & { data: Data; hook: (d: HookData) => void }) {
  if (window && document) {
    const iframeElement = document?.getElementById(
      IFRAME_ID
    ) as HTMLIFrameElement;
    const iframeWindow = iframeElement?.contentWindow;

    /**
     * Register listener
     */
    window?.addEventListener("message", (e) => {
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
        hook(payload);
        return;
      }

      /**
       * Listen for close
       * Cleanup on close
       */
      if (type === TYPES.close) {
        window?.removeEventListener("message", () => {});
        return;
      }
    });
  }
}

type ResponderArgs = {
  fromOrigin: string;
  checkOrigin?: boolean;
};
export function initReceiver<HookData>({
  fromOrigin,
  checkOrigin,
  hook,
}: ResponderArgs & { hook: (args: HookData) => void }) {
  if (window) {
    /**
     * Listen for transfer
     */
    window.addEventListener("message", (e) => {
      if (checkOrigin && e?.origin !== fromOrigin) return;
      const type = e?.data?.type;
      const payload = e?.data?.payload;
      if (type === TYPES.request && payload) {
        hook(payload);
        return;
      }
    });

    /**
     * Handshake origin
     */
    const origin = getParam(window?.location?.href, "fromOrigin");
    if (origin) {
      window?.parent?.postMessage({ type: TYPES.handshake }, origin);
    }
  }
}

/**
 * Clean up on unmount
 */
export const cleanUp = () => {
  return () => window?.removeEventListener("message", () => {});
};
