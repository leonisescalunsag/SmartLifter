import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../firebaseConfig";

// ✅ Fixed imports (correct names & spelling)
import PPLImage from "../../assets/images/PPL.jpg";
import ArmsImage from "../../assets/images/arms.webp";
import Fullimage from "../../assets/images/full.webp";
import HiitImage from "../../assets/images/push_up.webp";
import ShouldersImage from "../../assets/images/shoulder.webp";
import StrengthImage from "../../assets/images/strength.webp";

export default function ProgramScreen() {
  const router = useRouter();

  // 🔹 Header animation
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(headerTranslate, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/signin");
    } catch (error) {
      console.log("Logout error:", error);
      Alert.alert("Logout Failed", error.message);
    }
  };

  const workoutPrograms = [
    {
      id: "ppl",
      title: "Push Pull Legs",
      description: "Classic 6-day hypertrophy split.",
      image: PPLImage,
    },
    {
      id: "fbb",
      title: "Full Body Beginner",
      description: "3x/week, all major muscle groups.",
      image: Fullimage,
    },
    {
      id: "arms",
      title: "Arms Blast",
      description: "Grow biceps & triceps with high-volume training.",
      image: ArmsImage,
    },
    {
      id: "shoulders",
      title: "Shoulder Builder",
      description: "Sculpt wide shoulders with presses & raises.",
      image: ShouldersImage,
    },
    {
      id: "strength",
      title: "Strength Focus",
      description: "Heavy lifts to build raw strength.",
      image: StrengthImage,
    },
    {
      id: "hiit",
      title: "HIIT & Conditioning",
      description: "Burn fat with short, intense sessions.",
      image: HiitImage,
    },
  ];

  return (
    <View style={styles.container}>
      {/* 🔹 Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerFade,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        <Text style={styles.title}>Workout Programs</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={workoutPrograms}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
        renderItem={({ item, index }) => (
          <ProgramCard
            program={item}
            index={index}
            onPress={() => router.push(`/program/${item.id}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ProgramCard({ program, index, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  // 🔹 Animate on mount (staggered by index)
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 120, // stagger for each card
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
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start(() => onPress());
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }, { translateY }],
        opacity: fadeAnim,
        width: CARD_SIZE,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.programCard}
      >
        {/* ✅ Local image - no {uri: ...} */}
        <Image source={program.image} style={styles.programImage} />
        <Text style={styles.programTitle}>{program.title}</Text>
        <Text style={styles.programDesc}>{program.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const CARD_SIZE = Dimensions.get("window").width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00D1FF",
    marginTop: 60,
  },
  logoutBtn: {
    backgroundColor: "#3ceb25c2",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: "#FF4B4B",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 60,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  programCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#00D1FF",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    paddingBottom: 12,
  },
  programImage: {
    width: "100%",
    height: CARD_SIZE * 0.9,
    resizeMode: "cover", // Better for local images
    backgroundColor: "#111",
  },
  programTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 6,
  },
  programDesc: {
    fontSize: 13,
    color: "#bbb",
    textAlign: "center",
    paddingHorizontal: 6,
    marginTop: 2,
  },
});
