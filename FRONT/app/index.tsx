import { Link, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "../styles/styles";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // cache le header
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/pointri_logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.paragraph, styles.title]}>
          Bienvenue et merci pour vos efforts de tri !
        </Text>
        <Text style={styles.paragraph}>
          Cette application vous permet de signaler un problème relatif à votre
          point de tri.
        </Text>
        <Text style={styles.paragraph}>
          Il suffit de remplir trois étapes. Appuyez sur "commencer" pour
          accéder à la première étape.
        </Text>
      </View>
      <Link href="/firstStep" asChild>
        <Pressable>
          <Text style={styles.button}>Commencer</Text>
        </Pressable>
      </Link>
    </View>
  );
}
