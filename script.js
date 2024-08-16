async function getGitHubStars() {
    const searchButton = document.getElementById('buttonSearch');
    const login = document.getElementById('login').value;
    const resultDiv = document.getElementById('result');

    searchButton.disabled = true;

    resultDiv.classList.remove('error');

    if (!login) {
        resultDiv.textContent = 'Введите имя пользователя!';
        resultDiv.classList.add('error');
        searchButton.disabled = false;
        return;
    }

    resultDiv.textContent = 'Загрузка...';

    try {
        const response = await fetch(`https://api.github.com/users/${login}/repos`);

        if (response.status === 404) {
            resultDiv.textContent = 'Пользователь не найден';
            resultDiv.classList.add('error');
            searchButton.disabled = false;
            return;
        }

        const responseJSON = await response.json();

        let sumStars = responseJSON.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        resultDiv.textContent = '';
        const loginNode = document.createElement('strong');
        loginNode.textContent = login;
        resultDiv.appendChild(document.createTextNode('Количество звезд у пользователя '));
        resultDiv.appendChild(loginNode);
        resultDiv.appendChild(document.createTextNode(`: ${sumStars}`));
    } catch (error) {
        resultDiv.textContent = 'Произошла ошибка при запросе';
        resultDiv.classList.add('error');
    } finally {
        searchButton.disabled = false;
    }
}

document.getElementById('login').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getGitHubStars();
    }
});

document.getElementById('buttonSearch').addEventListener('click', getGitHubStars);
