import requests


def add_request(user_id, description):
    url = 'http://localhost:3000/requests'
    data = {'userId': user_id, 'description': description}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print('Заявка добавлена:', response.json())
    else:
        print('Ошибка при добавлении заявки:', response.json())


def get_requests(user_id):
    url = f'http://localhost:3000/requests/{user_id}'
    response = requests.get(url)
    if response.status_code == 200:
        print('Заявки пользователя:', response.json())
    else:
        print('Ошибка при получении заявок:', response.json())
