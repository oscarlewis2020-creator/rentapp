import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch } from "../../store/hooks";

const pageConfig = [
  {
    ttl: "Welcome to Rent Hub",
    img: require("../../../assets/welcome.png"),
    txt: "Instantly link landlords, property managers, and tenants with a single button press.",
  },
  {
    ttl: "Rental searches",
    img: require("../../../assets/rental-search.png"),
    txt: "Easily discover and connect with the ideal rental properties by tapping on your phone.",
  },
  {
    ttl: "Apply for lease",
    img: require("../../../assets/lsApproval.png"),
    txt: "Apply for leases, fill forms, and make payments in-app for a hassle-free property rental process. Get started now!",
  },
  {
    ttl: "Automate payments",
    img: require("../../../assets/payment.png"),
    txt: "Streamline rental payments effortlessly with our automated system for a hassle-free experience.",
  },
  {
    ttl: "Instant Messaging",
    img: require("../../../assets/chat.png"),
    txt: "Ease landlord-tenant communication; get quick answers with a few taps for fast and efficient interactions",
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Track the current visible slide page item
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // Next / Finish action handler
  const handleNext = () => {
    if (currentIndex < pageConfig.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to the welcome screen instead of completing the state here
      router.push("/welcome-screen");
    }
  };

  // Back button handler
  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. The Carousel Slider */}
      <FlatList
        data={pageConfig}
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.ttl}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image
              source={item.img}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.ttl}</Text>
            <Text style={styles.description}>{item.txt}</Text>
          </View>
        )}
      />

      {/* 2. Visual Dot Indicators */}
      <View style={styles.indicatorContainer}>
        {pageConfig.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* 3. Lower Control Action Bar */}
      <View style={styles.footer}>
        {/* Left Action: Prev Button */}
        <View style={styles.buttonWrapper}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Right Action: Next Button / Checkmark Sign-in routing */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === pageConfig.length - 1 && styles.finishButton,
            ]}
            onPress={handleNext}
          >
            {currentIndex === pageConfig.length - 1 ? (
              <>
                <Text style={[styles.buttonText, styles.finishButtonText]}>
                  Get Started
                </Text>
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
              </>
            ) : (
              <>
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={24} color="#007AFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  // Inside styles definition:
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    // 💡 Center the card content beautifully on desktop web layout viewports
    maxWidth: 600,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    maxHeight: 300, // Caps size on desktop browsers
    marginBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  indicatorContainer: {
    flexDirection: "row",
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#007AFF",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "#E5E5EA",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    height: 80,
  },
  buttonWrapper: {
    minWidth: 100,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  finishButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  finishButtonText: {
    color: "#FFF",
  },
});
