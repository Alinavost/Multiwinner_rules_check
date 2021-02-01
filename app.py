import ast
from flask import Flask, request, render_template, jsonify, session
from flask_session import Session
from main import ordinal_multi_winner, checking_ranking

app = Flask(__name__)
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)


def counterSummary(answer1, answer2, answer3, answer4):
    thisdict = {
        0: 0,
        1: 0,
        2: 0,
        3: 0
    }
    thisdict[int(answer1)] += 1
    thisdict[int(answer2)] += 1
    thisdict[int(answer3)] += 1
    thisdict[int(answer4)] += 1

    return dict(sorted(thisdict.items(), key=lambda item: item[1], reverse=True))


def getResult(answer1, answer2, answer3, answer4, question1):
    result = counterSummary(answer1, answer2, answer3, answer4)

    iterator = iter(result)
    first = next(iterator)
    second = next(iterator)
    while result[first] == result[second]:
        lists = ast.literal_eval(question1)
        newRank = checking_ranking(lists[int(answer1)], lists)
        pos = newRank.index(sorted(newRank)[1])
        result = counterSummary(pos, answer2, answer3, answer4)
        iterator = iter(result)
        first = next(iterator)
        second = next(iterator)

    return f(next(iter(result)))


def f(x):
    return {
        0: 'SNTV Rule',
        1: 'Borda Rule',
        2: 'Bloc Rule',
        3: 'PAV Rule',
    }[x]


@app.route('/', methods=["POST", "GET"])
def home():
    if request.method == "POST":
        return getResult(request.form["answer1"], request.form["answer2"], request.form["answer3"],
                         request.form["answer4"], request.form["question1"])
    else:
        first_committee = ordinal_multi_winner()
        first_orders = first_committee[4]
        first_committee.remove(first_orders)
        second_committee = ordinal_multi_winner()
        second_orders = second_committee[4]
        second_committee.remove(second_orders)
        third_committee = ordinal_multi_winner()
        third_orders = third_committee[4]
        third_committee.remove(third_orders)
        forth_committee = ordinal_multi_winner()
        forth_orders = forth_committee[4]
        forth_committee.remove(forth_orders)
        questions = [second_orders, second_committee, third_orders, third_committee, forth_orders, forth_committee]
        return render_template('base.html', first_committee=first_committee, second_committee=second_committee,
                               third_committee=third_committee, forth_committee=forth_committee,
                               first_orders=first_orders,
                               second_orders=second_orders, third_orders=third_orders, forth_orders=forth_orders,
                               len=len(first_committee), questions=questions)


if __name__ == '__main__':
    app.run(debug=True, use_debugger=False, use_reloader=False, passthrough_errors=True)
    # app.run(host='0.0.0.0')
