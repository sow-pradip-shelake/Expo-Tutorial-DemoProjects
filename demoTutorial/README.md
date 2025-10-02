# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Building APK with EAS and OTA Updates ( Testing Guide )

### Step 1: Install necessary tools

```bash
npm install -g eas-cli
npm install -g expo-cli
```

Make sure Node.js and npm are installed.

Log in to Expo:

```bash
eas login
```

### Step 2: Configure EAS

Inside your project directory, run:

```bash
eas build:configure
```

This generates `eas.json` if it doesn't exist.

Make sure your preview build profile has a channel set (for OTA updates):

```json
"preview": {
  "distribution": "internal",
  "channel": "main"
}
```

This ensures your APK will fetch updates from the main branch.

### Step 3: Set app version (optional but recommended)

In `app.json`:

```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    }
  }
}
```

Increment `versionCode` each time you make a new APK to upload to Play Store.

### Step 4: Build the APK

You have two options:

**Option 1: Cloud Build**
```bash
eas build -p android --profile preview
```

Expo builds the APK in the cloud.

After the build finishes, you'll get a download link for the APK.

**Option 2: Local Build (requires Android Studio + Gradle)**
```bash
eas build -p android --profile preview --local --output=app.apk
```

The APK will be generated locally in your project folder.

### Step 5: Install APK on device

Transfer the APK to your Android device and install it.

Or, if you have adb installed:

```bash
adb install app.apk
```

### Step 6: Push OTA updates (for JS changes)

After making JS changes (like updating text), run:

```bash
eas update --branch main --message "Updated text"
```

- **For Expo Go**: run `npx expo start` and reload the app (If you change in code then need to run this command to reflect js changes in standalone apk).
- **For standalone APK**: close and reopen the app → OTA update will be applied.

✅ **No need to rebuild APK if it's only JS/asset changes.**

### Step 7: Debug OTA updates (optional)

```javascript
import * as Updates from 'expo-updates';
console.log(Updates.channel);    // branch the app listens to
console.log(Updates.updateId);   // changes when a new update is fetched
```

This helps confirm your app is fetching updates from the correct branch.

### Workflow Summary

1. Configure EAS & channels → Build once APK (preview profile).
2. Install APK on device.
3. For JS/asset changes: run `eas update` → reload app → see updates instantly.
4. Only rebuild APK when native dependencies or config changes.

## Production Release Guide

### 1️⃣ Android: Play Store Release

#### Step 1: Set correct version & build type

In `app.json`:

```json
{
  "expo": {
    "version": "1.0.0",             // visible to users
    "android": {
      "versionCode": 2,             // must increment for every new release
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

- `package` must match the package name you registered in Google Play Console.
- Increment `versionCode` for every release.

#### Step 2: Build for production

```bash
eas build -p android --profile production
```

`production` profile in `eas.json` should be configured for Play Store (`distribution: store`).

You'll get an **AAB (Android App Bundle)**, which is preferred for Play Store.

**Example eas.json:**

```json
"production": {
  "distribution": "store",
  "channel": "production",
  "android": {
    "buildType": "app-bundle"
  }
}
```

#### Step 3: Upload to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app (if first release)
3. Upload the `.aab` file
4. Fill in required details (store listing, screenshots, privacy policy)
5. Submit for review

### 2️⃣ iOS: App Store Release

#### Step 1: Set correct version & build number

In `app.json`:

```json
"ios": {
  "buildNumber": "1",         // increment each release
  "bundleIdentifier": "com.yourcompany.yourapp"
}
```

- `bundleIdentifier` must match your App Store record.

#### Step 2: Build for production

```bash
eas build -p ios --profile production
```

EAS will handle signing (you need an Apple Developer account).

You'll get an `.ipa` file.

#### Step 3: Upload to App Store

1. Install [Transporter](https://apps.apple.com/us/app/transporter/id1450874784) on Mac
2. Upload the `.ipa` file
3. Go to App Store Connect → create new app record → submit for review

### 3️⃣ Using EAS Update after production release

Once your app is live, you can continue using `eas update` to push JS/asset changes without a full rebuild.

- Production app must be linked to the correct channel (e.g., `"channel": "production"`)
- OTA updates can't change native code, only JS & assets

### ✅ Summary

| Step | Testing APK | Production Release |
|------|-------------|-------------------|
| Version code/build number | Increment optional | Must increment every release |
| Build command | `--profile preview` | `--profile production` |
| Android output | APK | AAB |
| iOS output | IPA (for device) | IPA (App Store) |
| Deployment | Install manually | Upload to Play Store / App Store |
| OTA updates | Works | Works (only JS/asset changes) |

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.





