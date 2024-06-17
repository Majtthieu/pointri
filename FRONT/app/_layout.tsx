import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#06d6a0",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Accueil" }} />
      <Stack.Screen name="firstStep" options={{ title: "Première étape" }} />
      <Stack.Screen name="secondStep" options={{ title: "Deuxième étape" }} />
      <Stack.Screen name="thirdStep" options={{ title: "Dernière étape" }} />
    </Stack>
  );
}
