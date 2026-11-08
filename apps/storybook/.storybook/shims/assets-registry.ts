// react-native-svg imports this for <Image href={require(...)}>, which the design system doesn't use.
// React Native 0.88 no longer installs @react-native/assets-registry, so Storybook aliases it here.
export function getAssetByID(): undefined {
  return undefined;
}
