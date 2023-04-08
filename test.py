from server import app
import unittest

class Flasktestcase(unittest.TestCase):

    data = {
        "username" : "hubba",
        "password" : "123"
    }

    demo_ques = {
        "questionid" : "1",
        "title" : "this is title",
        "body" : "this is body",
        "username" : "yadvender"
    }

    demo_signup = {
        "name2" : "hubba",
        "password2" : "123"
    }

    def test1_user_get(self):
        tester= app.test_client(self)
        response = tester.get("/user?name1=yad")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test1_user_post(self):
        tester = app.test_client(self)
        response = tester.post("/user",  json=self.data)
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test1_user_delete(self):
        tester= app.test_client(self)
        response = tester.delete("/user?name1=yad")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test1_user_put(self):
        tester = app.test_client(self)
        response = tester.put("/user?name1=yad",  json=self.data)
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_alluser(self):
        tester= app.test_client(self)
        response = tester.get("/users_list")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_question_get(self):
        tester= app.test_client(self)
        response = tester.get("/question")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_question_post(self):
        tester = app.test_client(self)
        response = tester.post("/question",  json=self.demo_ques)
        statuscode = response.status_code
        self.assertEqual(statuscode,200)
    
    def test_quesid_get(self):
        tester= app.test_client(self)
        response = tester.get("/question_quesid?quesid=1")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_quesid_put(self):
        tester = app.test_client(self)
        response = tester.put("/question_quesid?quesid=1",  json=self.demo_ques)
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_quesid_delete(self):
        tester= app.test_client(self)
        response = tester.delete("/question_quesid?quesid=1")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_ques_title_get(self):
        tester= app.test_client(self)
        response = tester.get("/question_title?title=hello")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_ques_author_get(self):
        tester= app.test_client(self)
        response = tester.get("/question_authid?authid=yadvender")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_login(self):
        tester= app.test_client(self)
        response = tester.get("/user_login?name1=yadvender&password1=pass1")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)

    def test_signup(self):
        tester = app.test_client(self)
        response = tester.post("/user_signup",  json=self.demo_signup)
        statuscode = response.status_code
        self.assertEqual(statuscode,200)


    # def test2_post(self):
    #     tester = app.test_client(self)
    #     response = tester.post("/members",  json=self.data)
    #     statuscode = response.status_code
    #     self.assertEqual(statuscode,200)

    # def test_user_get(self):
    #     tester2= app.test_client(self)
    #     response2 = tester2.get("/members")
    #     statuscode = response2.status_code
    #     self.assertEqual(statuscode,200)


if __name__ == "__main__":
    # unittest.main()
    tester= Flasktestcase()
    tester.test_quesid_put()