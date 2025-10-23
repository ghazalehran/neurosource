import yaml, json, os
from jsonschema import validate

schema = json.load(open("schema/model.schema.json"))
for root, _, files in os.walk("models"):
    for f in files:
        if f.endswith(".yaml"):
            data = yaml.safe_load(open(os.path.join(root, f)))
            validate(data, schema)
print("✅ All model files valid!")
