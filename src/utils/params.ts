export const getOriginFromUrl = (url: string) => {
  return new URL(url)?.origin;
};

export const getParam = (href: string, name: string): string | null => {
  const cleanedHref = href?.replace("#", "");
  const params = new URL(cleanedHref)?.searchParams;
  return params?.get(name);
};

type Param = {
  name: string;
  value: string | undefined;
};
export const attachParamsToUrl = (url: string, params: Param[]): string => {
  if (!url || !params?.length) return url;

  let attachedUrl = url;

  const indexParam = url?.indexOf("?");
  if (indexParam !== -1) {
    params?.forEach((p) => {
      if (p?.name && p?.value) {
        attachedUrl = `${attachedUrl}&${p?.name}=${p?.value}`;
      }
    });
    return attachedUrl;
  }

  params?.forEach((p, i) => {
    if (p?.name && p?.value) {
      if (i === 0) {
        attachedUrl = `${attachedUrl}?${p?.name}=${p?.value}`;
      } else {
        attachedUrl = `${attachedUrl}&${p?.name}=${p?.value}`;
      }
    }
  });

  return attachedUrl;
};
