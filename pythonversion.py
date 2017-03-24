import sys


class PythonVersionHandler:
    """
    Handles errors and exceptions.
    """

    @classmethod
    def checkPythonVersion(cls):
        """
        Checks to see if python is version 2.7. If ok, returns null, else throws AssertionError.
        :return: Null
        """
        try:
            assert sys.version_info <= (2, 8)
        except AssertionError:
            raise AssertionError("Python Version 2.7 Required.")

        return





