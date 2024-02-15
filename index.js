let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function createAndAppend(results) {
    let {
        link,
        title,
        description
    } = results;

    let resultElement = document.createElement('div');
    resultElement.classList.add('result-item');
    searchResults.appendChild(resultElement);


    let titleEL = document.createElement('a');
    titleEL.href = link;
    titleEL.target = "_blank";
    titleEL.textContent = title;
    titleEL.classList.add('result-title');
    resultElement.appendChild(titleEL);

    let breakEl = document.createElement('br');
    resultElement.appendChild(breakEl);

    let linkEl = document.createElement('a');
    linkEl.href = link;
    linkEl.target = "_blank";
    linkEl.textContent = link;
    linkEl.classList.add('result-url');
    resultElement.appendChild(linkEl);


    let breakEl1 = document.createElement('br');
    resultElement.appendChild(breakEl1);

    let descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;
    descriptionEl.classList.add('link-description');
    resultElement.appendChild(descriptionEl);




}


function displayResuts(search_results) {
    for (let results of search_results) {
        spinner.classList.add('d-none');
        createAndAppend(results);
    }
}


function searchWikipedia(event) {
    if (event.key === 'Enter') {
        spinner.classList.remove('d-none');
        searchResults.textContent = ""

        let searchInputValue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData)
                let {
                    search_results
                } = jsonData;
                displayResuts(search_results);
            })
    }
}

searchInput.addEventListener('keydown', searchWikipedia);