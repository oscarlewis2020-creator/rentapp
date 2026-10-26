// import { useDispatch, useSelector } from "react-redux";
// // Assuming you have a standard clear action in a UI slice
// // import { clearError } from './uiSlice';

// export function GlobalNotification() {
//   // 1. Pull the error message captured by the addMatcher block
//   const error = useSelector((state) => state.ui.globalError);
//   const dispatch = useDispatch();

//   if (!error) return null; // Don't render anything if there's no error

//   return (
//     <div style={styles.banner}>
//       <span style={styles.text}>⚠️ Error: {error}</span>
//       <button
//         style={styles.closeBtn}
//         onClick={() => dispatch({ type: "ui/clearError" })} // or your specific action
//       >
//         Dismiss
//       </button>
//     </div>
//   );
// }

// const styles = {
//   banner: {
//     backgroundColor: "#ff4d4f",
//     color: "#fff",
//     padding: "12px 24px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     zIndex: 1000,
//     boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//   },
//   text: { fontWeight: "bold", fontFamily: "sans-serif" },
//   closeBtn: {
//     background: "transparent",
//     border: "1px solid #fff",
//     color: "#fff",
//     padding: "4px 8px",
//     cursor: "pointer",
//     borderRadius: "4px",
//   },
// };
