

import { useState, useRef } from "react"

import { BsArrowsMove } from "react-icons/bs";

export default function DragNDropPhotos({ gallery }) {
    console.log(gallery, "gallery")
    // Sample image data
    const [images, setImages] = useState(gallery?.map((item, idx) => {
        return {
            ...item,
            position: idx,
            src: item?.path,
            id: `img${idx + 1}`,
            alt: `Image ${idx + 1}`
        }
    }) || [])

    const [draggedItem, setDraggedItem] = useState(null)
    const [positionLog, setPositionLog] = useState([])
    const draggedOverItemId = useRef(null)

    // Sort images by position
    const sortedImages = [...images].sort((a, b) => a.position - b.position)

    // Handle drag start
    const handleDragStart = (e, item) => {
        setDraggedItem(item)
        // Set the drag image to be the element itself
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move"
            e.dataTransfer.setData("text/plain", item.id)
        }
        // Add a class to the dragged element for styling
        setTimeout(() => {
            const element = document.getElementById(item.id)
            if (element) element.classList.add("opacity-50")
        }, 0)
    }

    // Handle drag over
    const handleDragOver = (e, item) => {
        e.preventDefault()
        if (!draggedItem || draggedItem.id === item.id) return
        draggedOverItemId.current = item.id
    }

    // Handle drop
    const handleDrop = (e, targetItem) => {
        e.preventDefault()
        if (!draggedItem || draggedItem.id === targetItem.id) return

        // Swap positions
        const updatedImages = images.map((img) => {
            // If this is the dragged item, update its position to the target position
            if (img.id === draggedItem.id) {
                return { ...img, position: targetItem.position }
            }

            // If this is the target item or any item between the dragged and target positions
            if (draggedItem.position < targetItem.position) {
                // Moving forward: decrease position of items between old and new positions
                if (img.position > draggedItem.position && img.position <= targetItem.position) {
                    return { ...img, position: img.position - 1 }
                }
            } else {
                // Moving backward: increase position of items between new and old positions
                if (img.position < draggedItem.position && img.position >= targetItem.position) {
                    return { ...img, position: img.position + 1 }
                }
            }

            return img
        })

        setImages(updatedImages)

        // Log the position change
        const logMessage = `Moved ${draggedItem.alt} from position ${draggedItem.position + 1} to position ${targetItem.position + 1}`
        setPositionLog((prev) => [logMessage, ...prev])

        // Reset drag state
        setDraggedItem(null)
        draggedOverItemId.current = null
    }

    // Handle drag end
    const handleDragEnd = () => {
        if (draggedItem) {
            const element = document.getElementById(draggedItem.id)
            if (element) element.classList.remove("opacity-50")
        }
        setDraggedItem(null)
        draggedOverItemId.current = null
    }

    return (
        <div className="container mx-auto p-4 w-full">
            <h1 className="text-2xl font-bold mb-6">Draggable Image Grid</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {sortedImages.map((image) => (
                    <div
                        id={image.id}
                        key={image.id}
                        className={`
              relative border-2 rounded-lg overflow-hidden cursor-move
              transition-all duration-200 hover:shadow-lg
              ${draggedOverItemId.current === image.id ? "border-primary" : "border-gray-200"}
              ${draggedItem?.id === image.id ? "ring-2 ring-primary" : ""}
            `}
                        draggable
                        onDragStart={(e) => handleDragStart(e, image)}
                        onDragOver={(e) => handleDragOver(e, image)}
                        onDrop={(e) => handleDrop(e, image)}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="aspect-square relative ">
                            <img src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover h-full w-full" />
                            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                                Position: {image.position + 1}
                            </div>
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full">
                                <BsArrowsMove size={16} />
                            </div>
                        </div>
                        <div className="p-2 bg-white text-center">{image.alt}</div>
                    </div>
                ))}
            </div>

            <div className="mt-8 border rounded-lg p-4 bg-muted/20">
                <h2 className="text-xl font-semibold mb-2">Position Change Log</h2>
                {positionLog.length > 0 ? (
                    <ul className="space-y-1">
                        {positionLog.map((log, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                                {log}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">Drag and drop images to see position changes logged here.</p>
                )}
            </div>
        </div>
    )
}

