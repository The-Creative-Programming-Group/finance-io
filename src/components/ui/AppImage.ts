import { cssInterop } from "nativewind";
import { Image as ExpoImage } from "expo-image";

const AppImage = cssInterop(ExpoImage, { className: { target: "style" } });

export default AppImage;
