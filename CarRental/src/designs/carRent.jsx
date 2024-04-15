import './carRent.scss';
export default function CarRent({closeDialog}){

    function handleSubmit(event){
        event.preventDefault();
    }
    return(<>
        <div className="rent-car-container">
            <h2>Rent a Car</h2>
            <form onSubmit={(event)=>{handleSubmit(event)}} id="rent-car-form">
                <div className="form-group">
                    <label htmlFor="from-date">From</label>
                    <input type="date" id="from-date" name="from_date" placeholder="12 May 2016" />
                </div>
                <div className="form-group">
                    <label htmlFor="to-date">To</label>
                    <input type="date" id="to-date" name="to_date" placeholder="12 May 2016" />
                </div>
                <div className="form-group total-cost">
                    <label htmlFor="total-cost">Total Cost</label>
                    <input readOnly type="text" id="total-cost" name="total_cost" placeholder="$150" />
                </div>
                <div style={{display:'flex', gap:'10px', justifyContent:'center'}} className="form-actions">
                <button type="submit" id="rent">Rent</button>
                <button onClick={closeDialog}> Close</button>
                </div>
            </form>   
</div>
    </>);
}