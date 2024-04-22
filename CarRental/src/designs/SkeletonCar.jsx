import "./Skeleton.scss"; // Assume this is where your CSS lives

export default function SkeletonCar () {
    return (
        <div className="skeleton-wrapper">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text small"></div>
        </div>
    );
}


