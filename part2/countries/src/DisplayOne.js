const DisplayOne = ({country, show}) =>{
    return(
        <li key={country.name}>
            {country.name}
            <button value={country.name} onClick={show}>
                Show
            </button>
        </li>
    )
}

export default DisplayOne