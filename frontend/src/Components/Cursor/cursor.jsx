// import { useEffect, useRef, useState } from "react";

// const CustomCursor = () => {
//   const dotRef = useRef(null);
//   const ringRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);

//   const mouse = useRef({ x: 0, y: 0 });
//   const ring = useRef({ x: 0, y: 0 });
//   const animFrameRef = useRef(null);

//   useEffect(() => {
//     const dot = dotRef.current;
//     const ringEl = ringRef.current;

//     // Hide default cursor globally
//     document.body.style.cursor = "none";

//     const onMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;

//       if (dot) {
//         dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
//       }

//       if (!isVisible) setIsVisible(true);
//     };

//     const onMouseEnter = () => setIsVisible(true);
//     const onMouseLeave = () => setIsVisible(false);
//     const onMouseDown = () => setIsClicking(true);
//     const onMouseUp = () => setIsClicking(false);

//     // Hover detection for interactive elements
//     const onHoverStart = () => setIsHovering(true);
//     const onHoverEnd = () => setIsHovering(false);

//     const interactables = document.querySelectorAll(
//       "a, button, input, textarea, select, [role='button'], label"
//     );

//     interactables.forEach((el) => {
//       el.addEventListener("mouseenter", onHoverStart);
//       el.addEventListener("mouseleave", onHoverEnd);
//     });

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseenter", onMouseEnter);
//     document.addEventListener("mouseleave", onMouseLeave);
//     document.addEventListener("mousedown", onMouseDown);
//     document.addEventListener("mouseup", onMouseUp);

//     // Smooth ring follow animation
//     const animateRing = () => {
//       ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
//       ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

//       if (ringEl) {
//         ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
//       }

//       animFrameRef.current = requestAnimationFrame(animateRing);
//     };

//     animFrameRef.current = requestAnimationFrame(animateRing);

//     return () => {
//       document.body.style.cursor = "auto";
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseenter", onMouseEnter);
//       document.removeEventListener("mouseleave", onMouseLeave);
//       document.removeEventListener("mousedown", onMouseDown);
//       document.removeEventListener("mouseup", onMouseUp);
//       interactables.forEach((el) => {
//         el.removeEventListener("mouseenter", onHoverStart);
//         el.removeEventListener("mouseleave", onHoverEnd);
//       });
//       cancelAnimationFrame(animFrameRef.current);
//     };
//   }, []);

//   const styles = {
//     // ✅ DOT - Clean, no shadow/inverse effects
//     dot: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: isClicking ? "6px" : "8px",
//       height: isClicking ? "6px" : "8px",
//       borderRadius: "50%",
//       backgroundColor: isHovering ? "#ffffff" : "#f5a623",
//       pointerEvents: "none",
//       zIndex: 99999,
//       opacity: isVisible ? 1 : 0,
//       transition: "opacity 0.3s ease, width 0.15s ease, height 0.15s ease, background-color 0.2s ease",
//       willChange: "transform",
//       // ❌ Removed: mixBlendMode, boxShadow (black/inverse effects)
//     },
    
//     // ✅ RING - Clean border only, no blur or inner shadow
//     ring: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: isHovering ? "52px" : isClicking ? "30px" : "38px",
//       height: isHovering ? "52px" : isClicking ? "30px" : "38px",
//       borderRadius: "50%",
//       border: isHovering ? "1.5px solid rgba(245, 166, 35, 0.9)" : "1.5px solid rgba(245, 166, 35, 0.55)",
//       pointerEvents: "none",
//       zIndex: 99998,
//       opacity: isVisible ? 1 : 0,
//       transition: "opacity 0.3s ease, width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.2s ease",
//       willChange: "transform",
//       // ❌ Removed: backdropFilter (blur effect)
//     },
//   };

//   return (
//     <>
//       {/* Dot */}
//       <div ref={dotRef} style={styles.dot} />
//       {/* Ring - inner element removed */}
//       <div ref={ringRef} style={styles.ring} />
//     </>
//   );
// };

// export default CustomCursor;

const CustomCursor = () => null;

export default CustomCursor;