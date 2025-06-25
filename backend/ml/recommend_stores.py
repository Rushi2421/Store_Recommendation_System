import sys
import json
import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from geopy.distance import geodesic

# Step 1: Read user input from Node.js
raw_input = sys.stdin.read()
params = json.loads(raw_input)

user_lat = float(params.get("lat", 0))
user_lon = float(params.get("lon", 0))
store_type_query = params.get("storeType", "").lower()

# Step 2: Connect to MongoDB
client = MongoClient("mongodb+srv://rushirapashe11:rushi1234@project.gayhhca.mongodb.net/")
db = client["store-recommendation"]
collection = db["stores"]

# Step 3: Load all stores as a DataFrame
stores = list(collection.find())
df = pd.DataFrame(stores)

if df.empty:
    print(json.dumps([]))
    sys.exit()

# Step 4: Apply cosine similarity on store_type
df["store_type"] = df["store_type"].astype(str)
vectorizer = CountVectorizer()
store_type_vectors = vectorizer.fit_transform(df["store_type"].str.lower())
input_vec = vectorizer.transform([store_type_query])
df["similarity"] = cosine_similarity(input_vec, store_type_vectors).flatten()

# Step 5: Filter similar store types
filtered = df[df["similarity"] > 0].copy()
if filtered.empty:
    print(json.dumps([]))
    sys.exit()

# Step 6: Calculate haversine distance
def calc_distance(row):
    return geodesic((user_lat, user_lon), (row["latitude"], row["longitude"])).km

filtered["distance"] = filtered.apply(calc_distance, axis=1)

# Step 7: Get top 5 nearest stores
top_all = filtered.sort_values(by="distance")


# Step 8: Return selected fields
fields = [
    "name", "store_type", "phone", "address", "opening_time",
    "latitude", "longitude", "city", "rating"
]

result = top_all[fields].to_dict(orient="records")

print(json.dumps(result))
