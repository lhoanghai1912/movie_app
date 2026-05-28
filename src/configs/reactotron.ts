// import Reactotron from "reactotron-react-native";

// if (__DEV__) {
//   Reactotron.configure({ name: "Tủ Phim" })
//     .useReactNative({
//       networking: {
//         ignoreUrls: /\/logs$/,
//       },
//     })
//     .connect();
// }

import Reactotron from "reactotron-react-native";

const tron = Reactotron.configure({
  name: "Tủ Phim",
})
  .useReactNative({
    networking: {
      ignoreUrls: /\/logs$/,
    },
  })
  .connect();

console.tron = tron;

export default tron;
