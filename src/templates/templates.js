export function createCountriesMarkup(countrie){
    return countrie
        .map(
            ({ name: { official }, flags: { png } }) =>
                `<li><img src="${png}" alt="${official}" width="60" height="40">${official}</li>`)
        .join('');
};

export function createCountryMarkup(countrie){
  return countrie.map(
    ({ name:{official}, capital, population, flags:{png}, languages }) =>
      `<h1><img src="${png}" alt="${official}" width="40" height="40">${official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
    );
};