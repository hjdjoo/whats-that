import { useEffect, useState, useRef } from "react";

interface Position {
  x: number
  y: number
  width: number
  height: number
  scrollY: number
}

export default function Display() {

  const [selection, setSelection] = useState<string>("");
  const position = useRef<Position>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scrollY: 0
  });

  const [showBlurb, setShowBlurb] = useState<boolean>(false);

  // register event listeners on load
  useEffect(() => {

    function handleSelectionChange(_e: Event) {
      const selection = document.getSelection();
      if (!selection) return;

      const selectionRange = selection.getRangeAt(0);
      const boundingRect = selectionRange.getBoundingClientRect();
      const { x, y, width, height } = boundingRect;
      const { scrollY } = window

      position.current = {
        x: x,
        y: y,
        width: width,
        height: height,
        scrollY: scrollY
      };
      setSelection(selection.toString());
    }

    function handleMouseMove(e: MouseEvent) {

      const { clientX, clientY } = e;
      const { x, y, width, height } = position.current;

      if ((clientX > x && clientX < x + width)
        && (clientY > y && clientY < y + height)) {
        setShowBlurb(true);
      } else {
        setShowBlurb(false);
      };
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, []);

  return (
    <>
      {showBlurb &&
        <div
          className={`absolute z-[100] flex-col-reverse bg-sky-800 rounded-md`}
          style={{
            left: position.current.x,
            top: position.current.y + position.current.scrollY
          }}>
          <p>{selection}</p>
        </div>}
    </>
  )
}