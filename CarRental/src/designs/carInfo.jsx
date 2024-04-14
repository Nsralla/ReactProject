import "./carinfo.scss";
export default function NewCar({closeDialog}) {

return (
    <>
        <div className="add-car-container">
            <h2>Add New Car</h2>
            <form id="add-car-form">
                <div className="form-group">
                    <label htmlFor="car-name">Name</label>
                    <input type="text" id="car-name" name="car_name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="cost-per-day">Cost Per Day</label>
                    <input type="text" id="cost-per-day" name="cost_per_day" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="upload-image">Upload Image</label>
                    <input type="file" id="upload-image" name="upload_image" accept="image/*"/>
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" rows="5"></textarea>
                </div>
                <div className="form-actions">
                    <button className="cancel-button" type="button" id="cancel" onClick={closeDialog}>Cancel</button>
                    <button className="cancel-button" type="submit" id="add">Add</button>
                </div>
            </form>
        </div>
    </>
);
}
