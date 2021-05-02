from pmp.rules import WeaklySeparable
import random
from pmp.preferences import Ordinal
from pmp.preferences import Profile
import numpy as np
import operator
from itertools import chain


def rules_randomizer(scorings=9, rules_num=100, rule_size=4):
    list_of_rules = []
    for i in range(rules_num):
        f = random.sample(range(scorings), rule_size)
        list_of_rules.append(f)
    for j in list_of_rules:
        j.sort(reverse=True)
    return list_of_rules


def ordinal_randomizer(candidates_num, comittee_size, voters_num):
    list = []
    for i in range(voters_num):
        f = random.sample(range(candidates_num), comittee_size)
        list.append(f)
    return list


def scoring_the_score(list_of_rules):
    list_of_votes = ordinal_randomizer(4, 4, 10)
    candidates = set(chain(*list_of_votes))
    candidates_ratings = []

    print(list_of_votes)
    for i in range(len(list_of_rules)):
        candidates_ratings.append(dict.fromkeys(candidates, 0))
        print(list_of_rules[i])
        for j in range(len(list_of_votes)):
            # print(list_of_votes[i][j])
            for k in range(len(list_of_votes[j])):
                candidates_ratings[i][list_of_votes[j][k]] += list_of_rules[i][k]
    print(candidates_ratings)


print(scoring_the_score(rules_randomizer()))
