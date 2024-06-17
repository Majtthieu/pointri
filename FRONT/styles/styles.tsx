import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#06d6a0",
    paddingTop: Platform.OS === "android" ? 50 : 0,
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
});

export default styles;
