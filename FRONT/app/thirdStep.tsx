import styles from "@/styles/styles";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export default function ThirdStep() {
  const { selectedLabel, comment, city, street } = useLocalSearchParams<{
    selectedLabel: string;
    comment?: string;
    city: string;
    street: string;
  }>();

  const [image, setImage] = useState<string | null>(null);
  const [isReportSent, setIsReportSent] = useState(false);

  const takePhoto = async () => {
    // Demander l'accès et prendre une photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Vous n'avez pas autorisé l'accès à la caméra");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const sendEmail = async () => {
    if (!image) {
      Alert.alert("Une photo est indispensable pour signaler");
      return;
    }

    try {
      // Essaie d'envoyer l'email
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
      const response = await fetch("http://192.168.1.185:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedLabel,
          comment,
          city,
          street,
          image: `data:image/jpeg;base64,${base64Image}`,
        }),
      });

      if (response.ok) {
        Alert.alert("Votre signalement a été transmis avec succès.", "", [
          {
            text: "OK",
            onPress: () => setIsReportSent(true),
          },
        ]);
      } else {
        Alert.alert("Échec. Réessayez plus tard ou contactez le support");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Échec. Réessayez plus tard ou contactez le support");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isReportSent ? (
        <Link href="/">
          <Text style={styles.link}>Retour à l'accueil</Text>
        </Link>
      ) : (
        <>
          <View>
            <Text style={styles.paragraph}>Option sélectionnée :</Text>
            <Text style={[styles.paragraph, styles.highlight]}>
              {selectedLabel}
            </Text>
            {comment && (
              <>
                <Text style={styles.paragraph}>Commentaire :</Text>
                <Text style={styles.paragraph}>{comment}</Text>
              </>
            )}
            <Text style={styles.paragraph}>Commune :</Text>
            <Text style={[styles.paragraph, styles.highlight]}>{city}</Text>
            <Text style={styles.paragraph}>Rue :</Text>
            <Text style={[styles.paragraph, styles.highlight]}>{street}</Text>
          </View>
          <Text style={styles.paragraph}>
            Vous pouvez désormais prendre une photo. Cette étape est
            indispensable, elle nous permet de bien prendre la mesure de votre
            signalement.
          </Text>
          {!image && (
            <Pressable onPress={takePhoto}>
              <Text style={styles.button}>Prendre une photo</Text>
            </Pressable>
          )}
          {image && <Image source={{ uri: image }} style={styles.photo} />}
          {image && (
            <Pressable onPress={sendEmail}>
              <Text style={[styles.button, styles.finalButton]}>
                Transmettre le signalement
              </Text>
            </Pressable>
          )}
        </>
      )}
    </ScrollView>
  );
}
