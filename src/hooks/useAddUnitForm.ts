// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import { Alert } from "react-native";

// export const UNIT_TYPES = [
//   "Bedsitter",
//   "Single Room",
//   "1 Bedroom",
//   "2 Bedroom",
//   "3 Bedroom",
// ];
// export const AMENITIES_LIST = [
//   "Hot Shower",
//   "Wi-Fi",
//   "Balcony",
//   "Parking",
//   "CCTV",
// ];

// interface UseAddUnitFormProps {
//   buildingName: string;
//   onSubmitUnit?: (unitData: any) => void;
// }

// export function useAddUnitForm({
//   buildingName,
//   onSubmitUnit,
// }: UseAddUnitFormProps) {
//   const [unitName, setUnitName] = useState("Room21");
//   const [unitType, setUnitType] = useState("Bedsitter");
//   const [bedrooms, setBedrooms] = useState("0");
//   const [bathrooms, setBathrooms] = useState("1");
//   const [monthlyRent, setMonthlyRent] = useState("5000");
//   const [amenities, setAmenities] = useState("Hot Shower");
//   const [duplicateCount, setDuplicateCount] = useState("");
//   const [description, setDescription] = useState("");
//   const [isEditingDescription, setIsEditingDescription] = useState(false);
//   const [images, setImages] = useState<string[]>([]);

//   const cycleOption = (
//     current: string,
//     list: string[],
//     setter: (val: string) => void,
//   ) => {
//     const nextIndex = (list.indexOf(current) + 1) % list.length;
//     setter(list[nextIndex]);
//   };

//   const handlePickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       const uris = result.assets.map((asset) => asset.uri);
//       setImages((prev) => [...prev, ...uris]);
//     }
//   };

//   const handleOpenCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert(
//         "Permission required",
//         "Camera permission is needed to take photos.",
//       );
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });

//     if (!result.canceled && result.assets[0]) {
//       setImages((prev) => [...prev, result.assets[0].uri]);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     const payload = {
//       buildingName,
//       unitName,
//       unitType,
//       bedrooms: Number(bedrooms),
//       bathrooms: Number(bathrooms),
//       monthlyRent: Number(monthlyRent),
//       amenities,
//       duplicateCount: duplicateCount ? Number(duplicateCount) : 1,
//       description,
//       images,
//     };

//     if (onSubmitUnit) {
//       onSubmitUnit(payload);
//     } else {
//       Alert.alert("Unit Submitted", JSON.stringify(payload, null, 2));
//     }
//   };

//   return {
//     state: {
//       unitName,
//       unitType,
//       bedrooms,
//       bathrooms,
//       monthlyRent,
//       amenities,
//       duplicateCount,
//       description,
//       isEditingDescription,
//       images,
//     },
//     setters: {
//       setUnitName,
//       setUnitType,
//       setBedrooms,
//       setBathrooms,
//       setMonthlyRent,
//       setAmenities,
//       setDuplicateCount,
//       setDescription,
//       setIsEditingDescription,
//     },
//     handlers: {
//       cycleOption,
//       handlePickImage,
//       handleOpenCamera,
//       handleRemoveImage,
//       handleSubmit,
//     },
//   };
// }
