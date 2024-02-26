README for expo react native template

Stack:

1. Expo SDK 50 (React Native)
2. React Native Stylesheet (Styling)

To run development:

1. Add `eas.json` to .gitignore if planning to use secrets
2. `yarn start`

To build for production:

1. `npx expo-doctor` and resolve any errors

To build .apk/.aab:

- using java version 17.0.9, use jenv to switch java version if required

1. Run `eas build --profile preview --platform android --local` to build .apk
2. Run `eas build --profile production --platform android --local` to build .aab

To build .ipa:

1. Run `eas build --profile preview --platform ios --local` to build .ipa locally

To submit to app store:

1. Locally build ios first for app to appear in Transporter and xCode organiser
2. Check email to see if submission is successful, resolve issues if unsuccessful
