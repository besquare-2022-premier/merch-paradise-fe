import RabbitLoaderImage from "./Components/common/assets/rabbit.svg";
import LogoImage from "./assets/logo.svg";

const resources = [RabbitLoaderImage, LogoImage];

export function preloadResources() {
  for (const resource of resources) {
    let element = document.createElement("link");
    element.rel = "preload";
    element.as = "image";
    element.href = resource;
    document.head.appendChild(element);
  }
}
