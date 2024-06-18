import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import pav from "../assets/data/pav.json";
import styles from "../styles/styles";

type Point = {
  adresse: string;
  latitude: number;
  longitude: number;
};

type City = {
  ville: string;
  points: Point[];
};

const pointsData: City[] = pav;

// Calcul de la distance entre deux points géographiques
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const earthRadius = 6371;

  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = lat2 - lat1;

  return Math.sqrt(x * x + y * y) * earthRadius;
};

export default function SecondStep() {
  const { selectedLabel, comment } = useLocalSearchParams<{
    selectedLabel: string;
    comment?: string;
  }>();
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null); // Géolocalisation
  const [nearestPoint, setNearestPoint] = useState<
    (Point & { ville: string }) | null
  >(null); // Le point le plus proche
  const [useLocation, setUseLocation] = useState<boolean>(false);
  const [city, setCity] = useState<string>(""); // La commune que l'utilisateur entre
  const [streets, setStreets] = useState<string[]>([]); // Les rues ou endroits des points de la commune
  const [street, setStreet] = useState<string>(""); // le point sélectionné
  const [filteredCities, setFilteredCities] = useState<City[]>([]); // Les communes en fonction du texte entré

  useEffect(() => {
    // Si la géoloc est autorisée, parcourt la liste des points pour trouver le plus proche
    if (useLocation) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Vous n'avez pas donné l'autorisation pour utiliser la localisation"
          );
          setUseLocation(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        let closestPoint: (Point & { ville: string }) | null = null;
        let minDistance = Infinity;

        pointsData.forEach((city) => {
          city.points.forEach((point) => {
            const distance = calculateDistance(
              loc.coords.latitude,
              loc.coords.longitude,
              point.latitude,
              point.longitude
            );
            if (distance < minDistance) {
              minDistance = distance;
              closestPoint = { ville: city.ville, ...point };
            }
          });
        });

        setNearestPoint(closestPoint);
      })();
    }
  }, [useLocation]);

  const handleCityChange = (text: string) => {
    // Autre méthode pour filtrer les communes en commençant à taper du texte
    setCity(text);
    if (text.length > 0) {
      const matches = pointsData.filter((c) =>
        c.ville.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredCities(matches);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (selectedCity: City) => {
    setCity(selectedCity.ville);
    setStreets(selectedCity.points.map((point) => point.adresse));
    setFilteredCities([]);
  };

  const canProceed = useLocation ? !!nearestPoint : !!city && !!street;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.paragraph}>
        Merci de nous indiquer maintenant le point de tri concerné.
        L'utilisation de la géolocalisation est recommandée. Cependant, vous
        pouvez également renseigner le lieu vous-même.
      </Text>
      <Text style={styles.paragraph}>Option sélectionnée précédemment :</Text>
      <Text style={[styles.paragraph, styles.highlight]}>{selectedLabel}</Text>
      {comment && (
        <>
          <Text style={styles.paragraph}>Commentaire :</Text>
          <Text style={styles.paragraph}>{comment}</Text>
        </>
      )}
      <View style={styles.pickerContainer}>
        {!useLocation && (
          <>
            <Pressable onPress={() => setUseLocation(true)}>
              <Text style={styles.button}>utiliser ma géolocalisation</Text>
            </Pressable>

            <Text style={styles.paragraph}>Ou entrez une commune :</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez les premières lettres"
              value={city}
              onChangeText={handleCityChange}
            />
            {filteredCities.length > 0 && (
              <View style={styles.suggestions}>
                {filteredCities.map((c, index) => (
                  <Text
                    key={index}
                    style={styles.suggestions}
                    onPress={() => handleCitySelect(c)}
                  >
                    {c.ville}
                  </Text>
                ))}
              </View>
            )}
            {streets.length > 0 && (
              <>
                <Text style={styles.paragraph}>
                  Sélectionnez une rue ou un lieu :
                </Text>
                <Picker
                  selectedValue={street}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStreet(itemValue)}
                >
                  {streets.map((street, index) => (
                    <Picker.Item key={index} label={street} value={street} />
                  ))}
                </Picker>
              </>
            )}
          </>
        )}
        {useLocation && nearestPoint && (
          <>
            <Text style={styles.paragraph}>Point le plus proche :</Text>
            <Text style={styles.paragraph}>{nearestPoint.ville}</Text>
            <Text style={styles.paragraph}>{nearestPoint.adresse}</Text>
          </>
        )}
      </View>
      {canProceed && (
        <Link
          href={{
            pathname: "/thirdStep",
            params: {
              selectedLabel,
              comment,
              city: nearestPoint ? nearestPoint.ville : city,
              street: nearestPoint ? nearestPoint.adresse : street,
            },
          }}
          asChild
        >
          <Pressable onPress={() => {}}>
            <Text style={styles.button}>étape suivante</Text>
          </Pressable>
        </Link>
      )}
    </ScrollView>
  );
}
