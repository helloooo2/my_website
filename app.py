from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# حالة السويتش الافتراضية
switch_state = "off"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_switch_state", methods=["GET"])
def get_switch_state():
    return jsonify({"state": switch_state})

@app.route("/set_switch_state", methods=["POST"])
def set_switch_state():
    global switch_state
    state = request.json.get("state")
    if state in ["on", "off"]:
        switch_state = state
        return jsonify({"message": "Switch state updated successfully"}), 200
    return jsonify({"message": "Invalid state"}), 400

if __name__ == "__main__":
    app.run(debug=True)
