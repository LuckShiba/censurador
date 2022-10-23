import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const modal = document.querySelector<HTMLDivElement>("#modal");
const image = document.querySelector<HTMLImageElement>("#crop-image");

const btnCancelar = document.querySelector<HTMLButtonElement>("#cancelar");
const btnConfirmar = document.querySelector<HTMLButtonElement>("#confirmar");

let callback: (() => void) | null = null;

let cropper: Cropper | null = null;

export const showModal = (imageUrl: string) => {
  return new Promise<string>((resolve, _reject) => {
    if (image) {
      image.addEventListener("load", () => {
        cropper?.destroy();
        cropper = new Cropper(image, {
          aspectRatio: 1,
          autoCropArea: 1,
          movable: false,
          zoomable: false,
        });
        modal?.classList.add("active");
        btnConfirmar?.focus();
      });
      image.src = imageUrl;

      callback = () => {
        if (cropper) {
          resolve(cropper.getCroppedCanvas().toDataURL());
        }
      };
    }
  });
};

export const closeModal = () => {
  modal?.classList.remove("active");
};

btnCancelar?.addEventListener("click", closeModal);
btnConfirmar?.addEventListener("click", () => {
  closeModal();
  callback?.();
});
