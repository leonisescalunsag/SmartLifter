import { StyleSheet, Text, View } from "react-native";

export default function ProgramScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Workout</Text>
      <Text style={styles.text}>• Monday: Chest & Triceps</Text>
      <Text style={styles.text}>• Tuesday: Back & Biceps</Text>
      <Text style={styles.text}>• Wednesday: Rest</Text>
      <Text style={styles.text}>• Thursday: Legs</Text>
      <Text style={styles.text}>• Friday: Shoulders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 8 },
});
