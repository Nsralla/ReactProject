import { useSelector } from "react-redux";

export function History() {
    const rentedCars = useSelector((state) => state.rentedCars);
    return (
        <table className="history-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#000', textAlign: 'center' }}>
                    <th style={{ padding: '8px' }}>Car ID</th>
                    <th style={{ padding: '8px' }}>Car Name</th>
                    <th style={{ padding: '8px' }}>Start Date</th>
                    <th style={{ padding: '8px' }}>End Date</th>
                    <th style={{ padding: '8px' }}>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {rentedCars.map((car)=>{
                    return(<tr key={car.name}>
                    <td style={{ padding: '8px' }}>{car.id}</td>
                    <td style={{ padding: '8px' }}>{car.car}</td>
                    <td style={{ padding: '8px' }}>{car.from}</td>
                    <td style={{ padding: '8px' }}>{car.to}</td>
                    <td style={{ padding: '8px' }}>{car.totalCost}</td>
                </tr>);
                })}
                
            </tbody>
        </table>
    );
}
