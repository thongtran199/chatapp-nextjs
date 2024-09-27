import { UploadFile } from 'antd';
import callApi from '../api';

function getFileExtension(fileName: string): string {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

function isImage(fileName: string): boolean {
  const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  const extension = getFileExtension(fileName).toLowerCase();
  return validImageExtensions.includes(extension);
}

function isPDF(fileName: string): boolean {
  const validImageExtensions = ['pdf'];
  const extension = getFileExtension(fileName).toLowerCase();
  return validImageExtensions.includes(extension);
}

function fileToOpenURL(file: UploadFile): void {
  const reader = new FileReader();
  reader.onload = () => {
    const arrayBuffer = reader.result;
    if (!arrayBuffer) return;
    const blob = new Blob([arrayBuffer], { type: file.type });
    window.open(URL.createObjectURL(blob), '_blank', 'noopener,noreferrer');
  };
  reader.readAsArrayBuffer(file as unknown as Blob);
}

const downloadFileFromURL = (url?: string, name?: string) => {
  if (!url) return;
  const link = document.createElement('a');
  link.href = url;
  link.download = name ?? 'document.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

async function authenticateUrlToObjectUrl(url?: string): Promise<string> {
  if (!url) return '';
  const fileResponse = await callApi(url);
  const blob = await fileResponse.blob();
  return window.URL.createObjectURL(blob);
}
async function authenticateUrlToBlob(url?: string): Promise<Blob | null> {
  if (!url) return null;
  const fileResponse = await callApi(url);
  return await fileResponse.blob();
}

async function authenticateUrlToOpenUrl(url?: string) {
  const blobUrl = await authenticateUrlToObjectUrl(url);
  window.open(blobUrl, '_blank', 'noopener,noreferrer');
}

const downloadFileFromAuthenticateURL = async (url?: string, name?: string) => {
  const objectURL = await authenticateUrlToObjectUrl(url);
  downloadFileFromURL(objectURL, name);
};

async function createImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

async function combineImagesToNewTab({
  frontCardUrl,
  backCardUrl,
}: {
  frontCardUrl: string;
  backCardUrl: string;
}) {
  const blobFront: Blob | null = await authenticateUrlToBlob(frontCardUrl);
  const blobBack: Blob | null = await authenticateUrlToBlob(backCardUrl);
  if (!blobFront || !blobBack) return;
  const imgFront: HTMLImageElement = await createImageFromBlob(blobFront);
  const imgBack: HTMLImageElement = await createImageFromBlob(blobBack);

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Unable to get 2D context from canvas.');
  }

  canvas.width = imgFront.width + imgBack.width;
  canvas.height = Math.max(imgFront.height, imgBack.height);

  ctx.drawImage(imgFront, 0, 0);
  ctx.drawImage(imgBack, imgFront.width, 0);

  canvas.toBlob((combinedBlob) => {
    if (!combinedBlob) return;
    const combinedUrl = URL.createObjectURL(combinedBlob);
    window.open(combinedUrl, '_blank', 'noopener,noreferrer');
  });
}

function storedFileNameToUrl(storedFileName?: string) {
  return `user/enterprise-profile/download-file/${storedFileName}`;
}

export {
  getFileExtension,
  isImage,
  isPDF,
  fileToOpenURL,
  downloadFileFromURL,
  downloadFileFromAuthenticateURL,
  authenticateUrlToObjectUrl,
  authenticateUrlToOpenUrl,
  combineImagesToNewTab,
  storedFileNameToUrl,
};
