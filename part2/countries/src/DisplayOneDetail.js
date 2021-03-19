const DisplayOneDetail = ({country}) =>{
    return(
        <div>
        <h2>{country.name}</h2>
        <p>
          capital {country.capital} <br />
          population {country.population}
        </p>
        <h3>Languages</h3>
        <div>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
        </div>
        <img src={country.flag} alt="flag" width="100px" />
      </div>
    )
}
export default DisplayOneDetail