import React, { useRef, useState } from "react"

function App() {
  const dragItem = useRef<string>(null!);
  const [l, setL] = useState([
    {
      id: 0,
      text: "moro",
    },
    {
      id: 1,
      text: "orekworwerew",
    },
    {
      id: 2,
      text: "kkejlkfdjlkdsj",
    }
  ]);

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragItem.current = e.currentTarget.id;
    e.currentTarget.style.opacity = "50%";
    console.log("dragging");
  }

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "100%";
    
    dragItem.current = null!;
    console.log("not dragging");
  }

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.replace("border-black", "border-blue-500")
  }

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("border-blue-500", "border-black")
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.replace("border-blue-500", "border-black")
  };

  return (
    <div className="flex flex-col items-center border rounded-md gap-y-2">
      {l.map(item => (
        <div
          key={item.id}
          id={item.id.toString()}
          draggable
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragOver={dragOver}
          onDrop={drop}
          className='border border-black rounded-md'
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}

export default App
