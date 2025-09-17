# 🧠 Cognitive Skills & Student Performance Dashboard

This project analyzes synthetic student data to explore the relationship between **cognitive skills** (comprehension, attention, focus, retention, engagement time) and **student performance**.  
It combines **data science (Python)** for insights and **Next.js dashboard** for interactive visualization.

---

## 🚀 Features
- Synthetic student dataset (student_id, name, class, comprehension, attention, focus, retention, engagement_time, assessment_score).
- **Analysis (Jupyter Notebook)**:
  - Correlation between cognitive skills and performance.
  - Machine learning model to predict assessment scores.
  - Clustering students into learning personas.
- **Dashboard (Next.js)**:
  - Overview stats (average scores & skills).
  - Charts: bar (skill vs score), scatter (attention vs performance), radar (student profile).
  - Searchable & sortable student table.
  - Insights section with key findings.

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/student-performance-dashboard.git
cd student-performance-dashboard

2. Run Jupyter Notebook (Analysis + ML)
cd notebook
jupyter notebook analysis.ipynb

3. Run Next.js Dashboard
cd dashboard
npm install
npm run dev

Deployment on Vercel

Push repo to GitHub.

Go to Vercel
 → Import GitHub repo.

Framework: Next.js

Build Command: next build

Output Directory: .next

Deploy → Get your public link 🎉

📊 Example Insights

Comprehension has the strongest positive correlation with assessment scores.

Engagement time boosts performance, but after a point, returns diminish.

Students fall into 3 main learning personas:

🎯 Focused High Performers

📘 Average Attentive Learners

⏳ Low Engagement / Struggling

🛠️ Tech Stack

Python (pandas, scikit-learn, matplotlib, seaborn) → Analysis & ML

Next.js + React + TailwindCSS → Dashboard UI

Recharts / Chart.js → Visualizations

Vercel → Deployment
