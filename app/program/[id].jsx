import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProgramDetail() {
  const { id } = useLocalSearchParams();

  const programDetails = {
    ppl: [
      { exercise: "Incline Dumbbell Press", sets: "3x12", rest: "90 sec" },
      { exercise: "Flat Bench Press", sets: "4x10", rest: "2 min" },
      { exercise: "Overhead Press", sets: "3x10", rest: "90 sec" },
      { exercise: "Dumbbell Flys", sets: "3x12", rest: "90 sec" },
      { exercise: "Cable Chest Press", sets: "3x12", rest: "90 sec" },
      { exercise: "Arnold Press", sets: "3x10", rest: "90 sec" },
    ],
    fbb: [
      { exercise: "Squats", sets: "3x10", rest: "2 min" },
      { exercise: "Pull-ups", sets: "3x8", rest: "90 sec" },
      { exercise: "Push-ups", sets: "3x15", rest: "60 sec" },
      { exercise: "Lunges", sets: "3x12", rest: "90 sec" },
      { exercise: "Barbell Rows", sets: "4x10", rest: "2 min" },
      { exercise: "Dips", sets: "3x12", rest: "60 sec" },
    ],
    arms: [
      { exercise: "Barbell Bicep Curls", sets: "4x12", rest: "90 sec" },
      { exercise: "Skull Crushers", sets: "4x10", rest: "90 sec" },
      { exercise: "Hammer Curls", sets: "3x12", rest: "60 sec" },
      { exercise: "Close-Grip Bench Press", sets: "3x10", rest: "90 sec" },
      { exercise: "Concentration Curls", sets: "3x12", rest: "60 sec" },
      { exercise: "Overhead Tricep Extension", sets: "3x12", rest: "60 sec" },
    ],
    shoulders: [
      { exercise: "Overhead Press", sets: "4x8", rest: "2 min" },
      { exercise: "Lateral Raises", sets: "3x15", rest: "60 sec" },
      { exercise: "Face Pulls", sets: "3x12", rest: "60 sec" },
      { exercise: "Front Raises", sets: "3x12", rest: "60 sec" },
      { exercise: "Reverse Flys", sets: "3x12", rest: "60 sec" },
      { exercise: "Shrugs", sets: "4x12", rest: "90 sec" },
    ],
    strength: [
      { exercise: "Deadlift", sets: "5x5", rest: "3 min" },
      { exercise: "Squat", sets: "5x5", rest: "3 min" },
      { exercise: "Bench Press", sets: "5x5", rest: "3 min" },
      { exercise: "Overhead Press", sets: "5x5", rest: "3 min" },
      { exercise: "Barbell Rows", sets: "5x5", rest: "3 min" },
      { exercise: "Pull-Ups (Weighted if possible)", sets: "5x5", rest: "3 min" },
    ],
    hiit: [
      { exercise: "Burpees", sets: "5x20 sec", rest: "40 sec" },
      { exercise: "Jump Squats", sets: "5x20 sec", rest: "40 sec" },
      { exercise: "Mountain Climbers", sets: "5x20 sec", rest: "40 sec" },
      { exercise: "High Knees", sets: "5x20 sec", rest: "40 sec" },
      { exercise: "Jumping Lunges", sets: "5x20 sec", rest: "40 sec" },
      { exercise: "Push-Up to Plank Jack", sets: "5x20 sec", rest: "40 sec" },
    ],
  };

  const exercises = programDetails[id] || [];

  // 🔹 Animate title
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(titleTranslate, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Title */}
      <Animated.Text
        style={[
          styles.title,
          { opacity: titleOpacity, transform: [{ translateY: titleTranslate }] },
        ]}
      >
        Program Details
      </Animated.Text>

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <AnimatedCard item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function AnimatedCard({ item, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay: index * 120,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.03,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }, { scale }],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        <Text style={styles.exercise}>{item.exercise}</Text>
        <Text style={styles.details}>
          Sets/Reps: {item.sets} • Rest: {item.rest}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00D1FF",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 80,
  },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#222",
    shadowColor: "#00D1FF",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  exercise: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 4,
  },
});
