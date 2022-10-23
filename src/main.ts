import "./style.css";
import "./modal.ts";
import { showModal } from "./modal";

const arquivo = document.querySelector<HTMLInputElement>("#arquivo");

const btnEscolher = document.querySelector<HTMLButtonElement>("#escolher");
const btnBaixar = document.querySelector<HTMLButtonElement>("#baixar");

const dl = document.querySelector<HTMLAnchorElement>("#dl");

const canvas = document.querySelector<HTMLCanvasElement>("#imagem");
const ctx = canvas?.getContext("2d");

const image = new Image();
image.onload = () => {
  ctx?.drawImage(image, 0, 0);
};
image.src = "/censurada.png";

arquivo?.addEventListener("change", async () => {
  const file = arquivo?.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const croppedUrl = await showModal(url);

  const userImage = new Image();
  userImage.src = croppedUrl;
  userImage.onload = () => {
    ctx?.drawImage(userImage, 0, 0, 1200, 1200);
    ctx?.drawImage(image, 0, 0);
  };
});

btnEscolher?.addEventListener("click", () => {
  arquivo?.click();
});

btnBaixar?.addEventListener("click", () => {
  if (dl && canvas) {
    const url = canvas.toDataURL("image/png");
    dl.href = url;
    dl.download = "censurada.png";
    dl.click();
  }
});
