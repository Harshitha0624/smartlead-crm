from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

# Serve frontend folder
app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)

leads = []
activities = []


# -----------------------
# SERVE FRONTEND PAGES
# -----------------------

@app.route("/")
def dashboard():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/leads")
def leads_page():
    return send_from_directory(app.static_folder, "leads.html")

@app.route("/analytics")
def analytics_page():
    return send_from_directory(app.static_folder, "analytics.html")


# -----------------------
# GET LEADS
# -----------------------

@app.route("/api/leads", methods=["GET"])
def get_leads():
    return jsonify(leads)


# -----------------------
# ADD LEAD
# -----------------------

@app.route("/api/leads", methods=["POST"])
def add_lead():

    data = request.json

    lead = {
        "name": data.get("name"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "source": data.get("source"),
        "notes": data.get("notes"),
        "followup": data.get("followup"),
        "score": data.get("score"),
        "status": "New"
    }

    leads.append(lead)

    activities.insert(0, f"{lead['name']} lead added")

    return jsonify({"message": "Lead added"})


# -----------------------
# UPDATE STATUS
# -----------------------

@app.route("/api/leads/<int:index>", methods=["PUT"])
def update_status(index):

    data = request.json

    if index < len(leads):

        leads[index]["status"] = data["status"]

        activities.insert(0, f"{leads[index]['name']} status changed to {data['status']}")

    return jsonify({"message": "Status updated"})


# -----------------------
# DELETE LEAD
# -----------------------

@app.route("/api/leads/<int:index>", methods=["DELETE"])
def delete_lead(index):

    if index < len(leads):

        name = leads[index]["name"]

        leads.pop(index)

        activities.insert(0, f"{name} lead deleted")

    return jsonify({"message": "Lead deleted"})


# -----------------------
# GET ACTIVITY
# -----------------------

@app.route("/api/activity", methods=["GET"])
def get_activity():
    return jsonify(activities[:5])


# -----------------------

if __name__ == "__main__":
    app.run(debug=True)