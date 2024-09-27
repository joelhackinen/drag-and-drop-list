import React, { ComponentProps, useRef, useState } from "react"


interface DraggableItemProps extends ComponentProps<"div"> {
  data: {
    id: number,
    text: string,
  },
  order: number
}

const DraggableItem = (props: DraggableItemProps) => {
  const upperRef = useRef<HTMLDivElement>(null!);
  const lowerRef = useRef<HTMLDivElement>(null!);

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.replace("opacity-100", "opacity-50")
    console.log("dragging");
  }

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.replace("opacity-50", "opacity-100")
    console.log("not dragging");
  }

  const dragLeave = (_e: React.DragEvent<HTMLDivElement>) => {
    upperRef.current.classList.replace("visible", "invisible");
    lowerRef.current.classList.replace("visible", "invisible");
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;

    if (e.clientY < midY) {
      upperRef.current.classList.replace("invisible", "visible");
      lowerRef.current.classList.replace("visible", "invisible");
    } else {
      lowerRef.current.classList.replace("invisible", "visible");
      upperRef.current.classList.replace("visible", "invisible");
    }
  }

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    lowerRef.current.classList.replace("visible", "invisible");
    upperRef.current.classList.replace("visible", "invisible");

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;

    if (e.clientY < midY) {
      // UPPER HALF
    } else {
      // LOWER HALF
    }
  };

  return (
    <div
      {...props}
      className="relative w-full text-center h-16 flex justify-center items-center"
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragLeave={dragLeave}
      onDragOver={dragOver}
      onDrop={drop}
    >
      <span className="">{props.data.text}</span>
      <div className="invisible absolute h-[2px] bg-blue-500 w-full top-0" ref={upperRef} />
      <div className="invisible absolute h-[2px] bg-blue-500 w-full bottom-0" ref={lowerRef} />
    </div>
  )
}

function App() {
  const [l, _setL] = useState([
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
    },
    {
      id: 3,
      text: "aaasj",
    },
    {
      id: 4,
      text: "fffsfdsddsj",
    }
  ]);

  return (
    <div className="flex flex-col items-center w-80 mt-10 ring-8" >
      {l.map((item, i) => 
        <DraggableItem
          key={item.id}
          id={item.id.toString()}
          order={i}
          data={item}
        />
      )}
    </div>
  )
}

export default App
