from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    # Setting the host and port explicitly
    app.run(host='0.0.0.0', port=8080, debug=True)
