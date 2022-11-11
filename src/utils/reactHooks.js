import React from "react";

/**
 * Set title of the page when the component is loaded
 * @param {string} title
 */
export function usePageTitle(title) {
  React.useEffect(() => (document.title = title), [title]);
}
