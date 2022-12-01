import React from "react";

/**
 * Set title of the page when the component is loaded
 * @param {string} title
 */
export function usePageTitle(title) {
  React.useEffect(() => {
    document.title = title?`${title} - Merch Paradise`:'Merch Paradise';
    return ()=>document.title="Merch Paradise"
  }, [title]);
}

/**
 * Hook to load the stuffs
 * @template T
 * @param {()=>Promise<T|null>} provider
 * @param {any[]} deps
 * @param {T|null} initialVal
 * @returns {T|null|Error}
 */
export function useContentLoader(provider, deps = [], initialVal = null) {
  const [value, setValue] = React.useState(initialVal);
  React.useEffect(() => {
    provider().then(setValue).catch(setValue);
  }, [setValue, ...deps]); //eslint-disable-line react-hooks/exhaustive-deps
  return value;
}
