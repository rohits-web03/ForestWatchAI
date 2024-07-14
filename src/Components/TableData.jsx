const TableData=(props)=>{
    const data=props.value;
    return(
        <>{
            data.map((tableData)=>{
                const {_id,Temperature,capturetime,capturelocation}=tableData;
                return (
                    <tr key={_id}>
                        <td >{Temperature}</td>
                        <td >{capturetime}</td>
                        <td >{capturelocation}</td>
                    </tr>
                )
            })
        }
        </>
    );
}

export default TableData;
