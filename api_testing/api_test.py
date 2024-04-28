import requests
import yaml
import json
import os

"""
 example API call:
 api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c72a1db657f10258dc435143a44629e6
"""

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

def make_weather_api_call(lat: str, lon: str, endpoint: str, api_key: str) -> dict:
    base_url = "https://api.openweathermap.org/data/2.5/"
    api = base_url + "{0}?lat={1}&lon={2}&appid={3}"
    url = api.format(endpoint, lat, lon, api_key)
    res = requests.get(url)
    return res.json()


if __name__ == "__main__":

    with open(os.path.dirname(__file__) + '/../secrets.yaml') as f:
        api_key = yaml.safe_load(f)['api_key']
    endpoints = ["forecast", "weather"]
    test_cities = [
        {
            "name": "albuquerque",
            "lat": "35.08",
            "lon": "-106.65"
        },
        {   
            "name": "calgary",
            "lat": "51.05",
            "lon": "-114.09"
        }
    ]

    for city in test_cities:
        for endpoint in endpoints:
            json_data = make_weather_api_call(city["lat"], city["lon"], endpoint, api_key)
            out_file = city["name"] + "_" + endpoint + ".json"
            with open(os.path.join(__location__, out_file), "w") as f:
                json.dump(json_data, f)