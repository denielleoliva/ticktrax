import heicConvert from "heic-convert";

//This function performs an expensive operation and should be run on a separate thread.
export async function convertHeicToPNG(buffer) {
  const png8BitArray = await heicConvert({ buffer, format: 'PNG' });

  const base64img = btoa(png8BitArray.reduce((data, byte) => `${data}${String.fromCharCode(byte)}`, ''));

  return `data:image/png;base64,${base64img}`;

}
