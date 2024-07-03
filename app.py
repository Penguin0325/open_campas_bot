from flask import Flask, request, render_template
import nltk

app = Flask(__name__)

# 辞書を作成
responses = {
    "hello": "Hello, how can I help you?",
    "goodbye": "Goodbye, see you next time!"
}

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_input = request.form.get("text")
        if user_input:
            response = responses.get(user_input.lower(), "I'm sorry, I don't understand.")
            return render_template("chat.html", response=response)
    return render_template("chat.html")

if __name__ == "__main__":
    app.run(debug=True)
