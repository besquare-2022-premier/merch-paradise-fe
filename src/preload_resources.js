import RabbitLoaderImage from "./Components/common/assets/rabbit.svg";

const resources = [RabbitLoaderImage, "./img/LOGO.svg"];

export function preloadResources() {
  for (const resource of resources) {
    let element = document.createElement("link");
    element.rel = "preload";
    element.as = "image";
    element.href = resource;
    document.head.appendChild(element);
  }
}
