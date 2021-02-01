from random import random
from pmp.preferences import Approval
from pmp.preferences import Profile
from pmp.rules import SNTV, Borda, ChamberlinCourant as CC, PAV, Bloc
from pmp.preferences import Ordinal
from pmp.experiments import ExperimentConfig, generate_uniform, generate_gauss, experiment_config, impartial
import random
from scipy.spatial import distance
import numpy as np
from functools import reduce


def Copeland_winner(list_of_lists_votes):
    a = np.array(list_of_lists_votes)
    n, m = a.shape
    scores = np.zeros(m)
    for m1 in range(m):
        for m2 in range(m1 + 1, m):
            m1prefm2 = 0  # m1prefm2 would hold #voters with m1 \pref
            for v in a:
                if (v[m1] < v[m2]):
                    m1prefm2 += 1
            m2prefm1 = n - m1prefm2
            if (m1prefm2 == m2prefm1):
                scores[m1] += 0.5
                scores[m2] += 0.5
            elif (m1prefm2 > m2prefm1):
                scores[m1] += 1
            else:
                scores[m2] += 1
    winner = np.argwhere(scores == np.max(scores)).flatten().tolist()
    return winner, scores


def Borda_winner(list_of_lists_votes):
    a = np.array(list_of_lists_votes)
    n, m = a.shape
    scores = np.zeros(reduce(lambda count, l: count + len(l), a, 0))
    for i in range(n):
        for j in range(m):
            scores[a[i][j]] += m - j - 1
    winner = np.argwhere(scores == np.max(scores)).flatten().tolist()
    return winner, scores


def plurality_winner(list_of_lists_votes):
    a = np.array(list_of_lists_votes)
    n, m = a.shape
    scores = np.zeros(reduce(lambda count, l: count + len(l), a, 0))
    for i in range(n):
        scores[a[i][0]] += 1
    winner = np.argwhere(scores == np.max(scores)).flatten().tolist()

    return winner, scores


def ordinal_randomizer(candidates_num, comittee_size, voters_num):
    list = []
    for i in range(voters_num):
        f = random.sample(range(candidates_num), comittee_size)
        list.append(f)
    return list


def Aproval_randomizer(candidates_num, comittee_size, voters_num):
    list = []
    for i in range(voters_num):
        f = random.sample(range(candidates_num), random.randint(1, comittee_size))
        list.append(f)
    return list


def ordinal_multi_winner():
    global k, candidates, sntv, committee_sntv, borda, committe_borda, bloc, committee_bloc, pav, committee_PAV, drop_down_list_orders
    n = 5  # How many voters
    m = 9  # How many Options
    k = 3  # Committe size
    orders = ordinal_randomizer(9, 3, 5)
    candidates = range(0, 9)
    preferences = [Ordinal(o) for o in orders]
    preferences_for_PAV = [Approval(a) for a in orders]
    print("Instances: " + str(orders))
    profile = Profile(candidates, preferences)
    Profile_approval_for_PAV = Profile(candidates, preferences_for_PAV)
    sntv = SNTV()
    committee_sntv = sntv.find_committee(k, profile)
    print(str("Committee by SNTV rule:") + " " + str(committee_sntv))
    borda = Borda()
    committe_borda = borda.find_committee(k, profile)
    print(str("Committee by Borda rule:") + " " + str(committe_borda))
    bloc = Bloc()
    committee_bloc = bloc.find_committee(k, profile)
    print(str("Committee by Bloc rule:") + " " + str(committee_bloc))
    pav = PAV()
    committee_PAV = list(pav.find_committee(k, Profile_approval_for_PAV, method='Bruteforce'))
    print(str("Committee by PAV rule:") + " " + str(committee_PAV))
    return [committee_sntv, committe_borda, committee_bloc, committee_PAV, orders]


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

    sortedDict = dict(sorted(thisdict.items(), key=lambda item: item[1], reverse=True))

    return f(next(iter(sortedDict)))


def f(x):
    return {
        0: 'SNTV Rule',
        1: 'Borda Rule',
        2: 'Bloc Rule',
        3: 'PAV Rule',
    }[x]


def checking_ranking(chose, list_of_lists):
    list_of_counters = []
    for i in range(len(list_of_lists)):
        counter = 0
        for j in range(len(list_of_lists[i])):
            if list_of_lists[i][j] != chose[j]:
                counter = counter + 1

        list_of_counters.append(counter)

    return list_of_counters


def winner_rule (list_of_choises):
    winner_borda = Borda_winner(list_of_choises)
    winner_copeland = Copeland_winner(list_of_choises)
    winner_Plurality = plurality_winner(list_of_choises)
    return winner_borda, winner_copeland, winner_Plurality

if __name__ == "__main__":
    a = checking_ranking([1, 2, 3], [[1, 2, 3], [4, 5, 6], [1, 3, 2]])
    print("b: " + str(a))
    ##############Ordinal choise#############

    print(counterSummary(3, 1, 3, 0))
    print(ordinal_multi_winner())

    print("-----------------------------------------------------------")
    ###########Approval based#############

    approves = Aproval_randomizer(9, 3, 5)

    print("Instances: " + str(approves))

    app_preferences = [Approval(a) for a in approves]
    profile_app = Profile(candidates, app_preferences)

    sntv = SNTV()
    committee_sntv = sntv.find_committee(k, profile_app)
    print(str("Committee by SNTV rule:") + " " + str(committee_sntv))

    borda = Borda()
    committee_borda = borda.find_committee(k, profile_app)
    print(str("Committee by Borda rule:") + " " + str(committe_borda))

    bloc = Bloc()
    committee_bloc = bloc.find_committee(k, profile_app)
    print(str("Committee by Bloc rule:") + " " + str(committee_bloc))

    pav = PAV()
    committee_PAV = pav.find_committee(k, profile_app, method='Bruteforce')
    print(str("Committee by PAV rule:") + " " + str(committee_PAV))

    drop_down_list_approval = committee_sntv, committe_borda, committee_bloc, committee_PAV
    print(drop_down_list_approval)

    print(distance.euclidean(committee_PAV, committee_bloc))


