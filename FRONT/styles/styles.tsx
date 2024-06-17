import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#06d6a0",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  pickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  image: { width: 250, height: 62 },
  paragraph: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "left",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    backgroundColor: "#3e4a57",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "90%",
  },
  defaultOption: {
    color: "gray", // Style pour l'option "toucher ici"
  },
  pickerItem: {
    color: "black", // Style pour les autres options
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  suggestions: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    maxHeight: 100,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default styles;
