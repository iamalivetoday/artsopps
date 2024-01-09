import requests
import json
from textblob import TextBlob

# Example URLs from the regulations.gov documentation
api_base_url = "https://api.regulations.gov/v4/"
api_key = "api_key=YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"
epa_req = "https://api.regulations.gov/v4/dockets?filter[agencyId]=EPA&api_key=YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"


# Step 1: Get all documents for the docket
epa_dockets = requests.get(epa_req)

# Check if the request was successful
if epa_dockets.status_code == 200:
    # Parse the JSON response
    data = json.loads(epa_dockets.content)

    # Extract docket IDs where docketType is "Rulemaking"
    epa_docket_ids = [item['id'] for item in data['data'] if item['attributes']['docketType'] == 'Rulemaking']

    # Print or return the list of docket IDs
    print(epa_docket_ids)
else:
    print("Failed to retrieve data. Status code:", epa_dockets.status_code)