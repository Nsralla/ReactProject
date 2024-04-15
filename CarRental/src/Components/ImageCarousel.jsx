    import { useState } from "react";

    const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
        }}
        >
        <div
            style={{
            width: "100%",
            maxWidth: "600px",
            height: "400px",
            overflow: "hidden",
            borderRadius: "30px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
        >
            <img
            src={images[currentImageIndex]}
            alt="Car Image"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius:'30px' }}
            />
        </div>
        <div style={{ marginTop: "10px" }}>
            <button
            onClick={prevImage}
            style={{
                marginRight: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            >
            ❮
            </button>
            <button
            onClick={nextImage}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            >
            ❯
            </button>
        </div>
        </div>
    );
    };

    export default ImageCarousel;
