from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        amount = float(data.get('amount', 0))
    except:
        amount = 0
    
    if amount > 50000:
        result = "FRAUD 🔴 - High Risk!"
    else:
        result = "SAFE ✅ - Low Risk"
    
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)