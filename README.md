# SmartLead CRM

SmartLead CRM is a **Full-Stack Customer Relationship Management (CRM) dashboard** built using **Flask, JavaScript, and Chart.js**.
It helps businesses manage sales leads, track pipeline progress, and visualize conversion analytics through an interactive dashboard.

The system demonstrates **frontend–backend integration, REST API development, and data visualization for business insights**.

# Project Overview

SmartLead CRM simulates a **modern SaaS CRM platform** used by startups and sales teams to manage customer leads efficiently.

The application allows users to:

• Organize customer leads
• Track lead conversion stages
• Monitor follow-ups
• Analyze lead sources and sales performance

This project showcases **full-stack web development and dashboard analytics implementation**.



# Key Features

## Lead Management
• Add new leads with contact information
• View leads in a structured table
• Delete unwanted leads

## Lead Status Tracking
Sales pipeline stages:
New → Contacted → Converted
This helps visualize the **progress of leads through the sales funnel**.

## Lead Scoring System
Each lead receives an **automatic score** based on quality indicators such as:
• Lead source
• Follow-up scheduling
• Notes provided

Leads are categorized as:
Hot Lead
Warm Lead
Cold Lead
This helps prioritize high-potential leads.

## Sales Dashboard
Interactive dashboard displaying key metrics:

• Total Leads
• Converted Leads
• Conversion Rate
• Follow-ups scheduled for today

## Data Visualization
Analytics charts powered by **Chart.js**:

• Lead Source Distribution (Doughnut Chart)
• Sales Pipeline Status (Bar Chart)
• Lead Growth Trend (Line Chart)
These visualizations provide **data-driven insights into sales performance**.

## Activity Feed
Displays recent system activities such as:
• Lead added
• Status updated
• Lead deleted
This simulates **real CRM activity tracking systems**.

## Lead Search
Instant search functionality to filter and locate leads quickly.

# Technology Stack
## Frontend
• HTML
• CSS
• JavaScript
• Chart.js

## Backend
• Python
• Flask
• Flask-CORS

## Tools & Platforms
• Git
• GitHub
• Render (Deployment)
• VS Code

# Project Architecture
Frontend (User Interface)
        |
        | HTTP Requests
        ↓
Flask REST API
        |
        ↓
Business Logic Layer
        |
        ↓
In-Memory Data Storage
The frontend communicates with the backend via **REST APIs** to perform CRUD operations and retrieve analytics data.
# Project Structure

smartlead-crm
│
├── backend
│   ├── app.py
│   └── requirements.txt
│
├── frontend
│   ├── index.html
│   ├── leads.html
│   ├── analytics.html
│   │
│   ├── css
│   │   └── style.css
│   │
│   └── js
│       └── script.js
│
└── README.md

# Installation & Setup

## 1 Clone the Repository

git clone https://github.com/Harshitha0624/smartlead-crm.git
cd smartlead-crm

## 2 Install Dependencies
pip install -r backend/requirements.txt-

## 3 Run the Flask Backend```
cd backend
python app.py

The server will start at:
http://127.0.0.1:5000

## 4 Open the Frontend
Open the following file in your browser:
frontend/index.html

# API Endpoints
| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/leads`         | Retrieve all leads     |
| POST   | `/api/leads`         | Add a new lead         |
| PUT    | `/api/leads/<index>` | Update lead status     |
| DELETE | `/api/leads/<index>` | Delete a lead          |
| GET    | `/api/activity`      | Retrieve activity feed |


# Target Audience
• Small businesses
• Freelancers
• Startup sales teams
• Digital marketing agencies
• Sales managers

# Deployment
The backend API is deployed using **Render Cloud Platform**.

Deployment Steps:

1. Push project to GitHub
2. Create a Web Service on Render
3. Set root directory to `backend`
4. Install dependencies from `requirements.txt`
5. Start the application using:
python app.py

# Future Improvements

• Database integration (PostgreSQL / MongoDB)
• User authentication and authorization
• Multi-user CRM environment
• Email reminder automation for follow-ups
• AI-based lead conversion prediction

# Author

**Harshitha Vasanth**
Computer Science Engineering Student
