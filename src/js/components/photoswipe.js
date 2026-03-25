import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";

const lightbox = new PhotoSwipeLightbox({
  gallery: ".gallery",
  children: "a",
  pswpModule: () => import("photoswipe"),

  paddingFn: (viewportSize) => {
    return {
      right: 70,
    };
  },
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
  type: "auto",
});

lightbox.init();
