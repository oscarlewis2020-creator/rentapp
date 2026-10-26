// import { useSelector } from "react-redux";

// export function LoadingSpinner() {
//   // 1. Pull the loading state captured by the pending matcher
//   const isLoading = useSelector((state) => state.ui.globalLoading);

//   if (!isLoading) return null;

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.spinner}></div>
//       <p style={styles.loadingText}>Processing your request...</p>
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 2000,
//   },
//   spinner: {
//     width: "50px",
//     height: "50px",
//     border: "5px solid #f3f3f3",
//     borderTop: "5px solid #3498db",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
//   loadingText: {
//     color: "#fff",
//     marginTop: "15px",
//     fontFamily: "sans-serif",
//     fontWeight: "500",
//   },
// };

// // Note: For the actual spinning animation, add this CSS keyframe to your index.css:
// // @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
