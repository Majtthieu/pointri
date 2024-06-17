import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import problems from "../assets/data/problems.json";
import styles from "../styles/styles";

export default function SelectComponent() {
  const [selectedValue, setSelectedValue] = useState(""); // valeur sélectionnée
  const [selectedLabel, setSelectedLabel] = useState(""); // description de la valeur sélectionnée
  const [comment, setComment] = useState(""); // commentaire joint à l'option "autre"
  const [showButton, setShowButton] = useState(false); // affichage du bouton boolléen
  const router = useRouter();

  // Ajoute une option par défaut en début de liste
  const pickerItems = [{ value: "", label: "- Toucher ici -" }, ...problems];

  // Fonction de sélection d'une option qui modifie les variables de statut et affiche le bouton sauf pour la dernière option
  const handleSelection = (itemValue: string) => {
    const selectedItem = pickerItems.find((item) => item.value === itemValue);
    if (selectedItem) {
      setSelectedValue(itemValue);
      setSelectedLabel(selectedItem.label);
      if (itemValue === "other") {
        setShowButton(false);
      } else {
        setShowButton(itemValue !== ""); // N'affiche le bouton que si une option valide est sélectionnée
        setComment("");
      }
    }
  };

  // Fonction pour l'option "autre". Affiche le bouton si il y a du commentaire
  const handleCommentChange = (text: string) => {
    setComment(text);
    setShowButton(text.length > 0);
  };

  // Passe les valeurs de statut vers le composant suivant dans le routage
  const handleNavigation = () => {
    router.push({
      pathname: "/secondStep",
      params: {
        selectedLabel,
        comment,
      },
    });
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.paragraph}>
        Indiquez le problème que vous rencontrez parmi les options proposées
        ci-dessous. Si aucune de ces options ne vous convient, choississez
        "autre" et préciser ce que vous souhaitez signaler. Vous pourrez ensuite
        passer à l'étape suivante.
      </Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.paragraph}>Sélectionnez une option :</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => handleSelection(itemValue)}
        >
          <Picker.Item
            label="- toucher ici -"
            value=""
            style={styles.defaultOption}
          />
          {pickerItems.slice(1).map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
        {selectedValue === "other" && (
          <TextInput
            style={styles.textInput}
            placeholder="Veuillez préciser..."
            value={comment}
            onChangeText={handleCommentChange}
          />
        )}
      </View>
      {showButton && (
        <Pressable onPress={handleNavigation}>
          <Text style={styles.button}>étape suivante</Text>
        </Pressable>
      )}
    </View>
  );
}
