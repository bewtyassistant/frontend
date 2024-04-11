import { keyframes } from "@emotion/react"

export default function useGetAnimation(keyFramesValue?: string) {
  return `${keyframes`${
    keyFramesValue ||
    `  
      0% {
        transform: scale(.96);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(.96);
      }
    `
  }`} infinite 2s linear`
}
