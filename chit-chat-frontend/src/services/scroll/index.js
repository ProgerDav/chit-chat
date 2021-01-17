export const isScrolledToBottom = (elementRef, minimalDistance = 1) =>
  elementRef.scrollTop + elementRef.clientHeight >=
  elementRef.scrollHeight - minimalDistance;

export const scrollToBottom = (elementRef) => {
  elementRef.scrollTop = elementRef.scrollHeight;
};
