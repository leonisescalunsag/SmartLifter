import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function GetStarted() {
  const router = useRouter();

  // 🔹 Animations
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const quoteOpacity = useRef(new Animated.Value(0)).current;
  const quoteTranslate = useRef(new Animated.Value(20)).current;
  const buttonTranslate = useRef(new Animated.Value(50)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animations in sequence
    Animated.sequence([
      // Logo first
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      // Quote second
      Animated.parallel([
        Animated.timing(quoteOpacity, {
          toValue: 1,
          duration: 600,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.spring(quoteTranslate, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
      // Button last
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(buttonTranslate, {
          toValue: 0,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/bj.png")}
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        {/* 🔹 Logo with Animation */}
        <Animated.Image
          source={require("../assets/images/logo1.png")}
          style={[
            styles.logo,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        />

        {/* 🔹 Quote with Fade + Slide */}
        <Animated.Text
          style={[
            styles.quote,
            { opacity: quoteOpacity, transform: [{ translateY: quoteTranslate }] },
          ]}
        >
          "Stronger every day. Your journey starts here."
        </Animated.Text>

        {/* 🔹 Button with Slide Up + Fade */}
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ translateY: buttonTranslate }],
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/signin")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 250,
    resizeMode: "contain",
    marginBottom: 10,
    marginTop: 30,
  },
  quote: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 40,
    marginTop: 5,
    fontFamily: "serif",
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
