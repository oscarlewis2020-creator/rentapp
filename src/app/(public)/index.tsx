import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../../hooks";
import { completeOnboarding } from "../../store/authSlice";

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
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // 💡 Desktop responsive viewport capping constraint calculation
  const slideWidth = Platform.OS === "web" ? Math.min(width, 600) : width;

  // 💡 Robust cross-platform index calculation based on actual scroll offset distance
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    // Rounding accounts for decimal width discrepancies on desktop browser viewports
    const calculatedIndex = Math.round(scrollOffset / slideWidth);

    // Boundary safety verification check guards
    if (calculatedIndex >= 0 && calculatedIndex < pageConfig.length) {
      if (calculatedIndex !== currentIndex) {
        setCurrentIndex(calculatedIndex);
      }
    }
  };

  // Next / Finish action handler
  const handleNext = async () => {
    if (currentIndex < pageConfig.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      }, 10);
    } else {
      // 🔥 FIX: Dispatch completion to persistent storage & Redux BEFORE updating the layout route
      await dispatch(completeOnboarding());
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
      <View style={styles.centerCardEnvelope}>
        {/* 1. The Carousel Slider */}
        <View style={styles.listContainer}>
          <FlatList
            data={pageConfig}
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.ttl}
            // onViewableItemsChanged={onViewableItemsChanged}
            // viewabilityConfig={viewConfigRef}
            // 💡 Swapped out onViewableItemsChanged hook for structural math event handler calculations
            onScroll={handleScroll}
            scrollEventThrottle={16} // Fires smoothly at 60fps frame rate markers
            // 🔥 CRITICAL WEB FIX: Forces explicit layout calculations per slide item
            getItemLayout={(_, index) => ({
              length: slideWidth,
              offset: slideWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={[styles.slide, { width: slideWidth }]}>
                {/* 💡 Use ScrollView internal padding context to safeguard readable textual areas */}
                <ScrollView
                  contentContainerStyle={styles.slideScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <Image
                    source={item.img}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>{item.ttl}</Text>
                  <Text style={styles.description}>{item.txt}</Text>
                </ScrollView>
              </View>
            )}
          />
        </View>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  // 💡 Centers and restricts everything on wide desktop browser windows
  centerCardEnvelope: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    backgroundColor: "#FFF",
  },
  listContainer: {
    flex: 1, // Dynamically occupies remaining space above indicators/footer rows
  },
  // Inside styles definition:
  slide: {
    flex: 1,
    height: "100%",
  },
  slideScrollContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.33, // Locks dimensions to standard 4:3 safely
    maxHeight: 220, // 💡 Hard ceiling limits prevent vertical displacement clipping
    marginBottom: 24,
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
    ...Platform.select({
      web: { cursor: "pointer", userSelect: "none" },
    }),
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
