import pandas as pd
import matplotlib.pyplot as plt
import math
import numpy
from pythonversion import PythonVersionHandler


# from pandas.tools.merge import _OrderedMerge
#
# _orig = pd.read_excel("assignment-01-data-unformated.xlsx", header=None)
#
# _orig.head()


def __fallThroughToValue(df, rowNum, colNum):
    __val = df.iloc[rowNum, colNum]

    if not isinstance(__val, basestring) and math.isnan(__val):
        return __fallThroughToValue(df, rowNum + 1, colNum=colNum)
    else:
        return df.iloc[rowNum, colNum]


def __concatHeader(*args):
    __name = None
    for i in args:
        if __name is not None:
            __name = str(__name).strip() + '_' + str(int(i))
        else:
            __name = str(i)

    return __name


def __sideShuffle(lst):
    __tmp = list(lst)

    _cType = None

    for i in range(0, lst.__len__()):
        if isinstance(lst[i], basestring) and isinstance(lst[i + 1], basestring):

            __tmp[i] = lst[i]

        elif isinstance(lst[i], basestring) and isinstance(lst[i + 1], numpy.float):

            __tmp[i] = __concatHeader(lst[i], lst[i + 1] + 1)
            _cType = lst[i]

        elif _cType is not None:
            __tmp[i] = __concatHeader(_cType, lst[i])

    return __tmp


def setFeatureNames(pandasFrame):
    # this.isExists() => {
    # assert Excel.User == (implements Fail.Life)
    # }

    # Copy modifier
    __dt = pandasFrame.copy()
    # Assert column numbers
    assert __dt.shape[1] == 28

    # Col names container
    __colNames = []

    for c in range(0, __dt.shape[1]):
        __colNames.append(__fallThroughToValue(__dt, 0, c))

    # Assert extracted values for the colnames
    assert __colNames.__len__() == __dt.shape[1]

    # Since the first column name is site01 and that's actually a member rather than a header, let's fix it.
    __colNames[0] = 'site'

    # Now we see that we are missing the year from the first coral type column and then missing the coral type from the year designations.
    # Lets fix this.

    __colNames = __sideShuffle(__colNames)

    # Now we need to delete the first 2 rows and then set the column names.
    __dt.drop([0, 1], 0, inplace=True)

    # Replace the column names with the ones that we made before.
    __dt.columns = __colNames

    return __dt


def splitVarCol(pandasFrame):
    _dt = pandasFrame.copy()

    _dt['coral'] = _dt['variable'].apply(lambda x: x.split('_')[0])
    _dt['year'] = _dt['variable'].apply(lambda x: x.split('_')[1])

    _val = _dt['value']

    _dt.drop(['variable', 'value'], axis=1, inplace=True)

    _dt['bpercent'] = _val

    return _dt


if __name__ == '__main__':
    # check runtime version.
    PythonVersionHandler.checkPythonVersion()

    _orig = pd.read_excel("assignment-01-data-unformated.xlsx", header=None)

    _orig.head()

    # Extract the proper feature names
    _new = setFeatureNames(_orig)

    # Melt the dataframe to members ands facts.
    _melt = pd.melt(_new, id_vars=['site', 'longitude', 'latitude'])

    _melt = splitVarCol(_melt)

    _melt.to_csv('a1_data_melted.csv', index=False)
