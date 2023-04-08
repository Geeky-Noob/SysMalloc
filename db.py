# Connect to the database
from typing import Optional

import pymysql

connection = pymysql.connect(host='localhost',
                             user='newuser',
                             password='password',
                             database='sysmalloc',
                             cursorclass=pymysql.cursors.DictCursor)

def setup():
  # with connection:
    with connection.cursor() as cursor:
      cursor.execute("""CREATE TABLE IF NOT EXISTS `users` (
        `userid` int NOT NULL AUTO_INCREMENT,
        `username` varchar(255) NOT NULL UNIQUE,
        `location` varchar(150) DEFAULT NULL,
        `userrating` int ,
        `password` varchar(150) NOT NULL UNIQUE,
        `followers` int DEFAULT 0,
        `following` int DEFAULT 0,
        PRIMARY KEY (`userid`))
        """)

      cursor.execute("""CREATE TABLE IF NOT EXISTS `votes` (
        `voteid` int NOT NULL AUTO_INCREMENT,
        `voterid` int NOT NULL,
        `voteeid` int NOT NULL,
        `form` char(1) NOT NULL,
        `questionid` int DEFAULT NULL,
        `answerid` int DEFAULT NULL,
        PRIMARY KEY (`voteid`)
      )""")

      cursor.execute("""CREATE TABLE IF NOT EXISTS `comments` (
        `commentid` int NOT NULL AUTO_INCREMENT,
        `body` varchar(1500),
        `authorid` int NOT NULL DEFAULT 0,
        `questionid` int DEFAULT NULL,
        `answerid` int DEFAULT NULL,
        PRIMARY KEY (`commentid`)
      )""")

      cursor.execute("""CREATE TABLE IF NOT EXISTS `answers` (
        `answerid` int NOT NULL AUTO_INCREMENT,
        `body` varchar(3000),
        `authorid` int NOT NULL DEFAULT 0,
        `questionid` int DEFAULT NULL,
        `upvotes` int DEFAULT 0,
        `downvotes` int DEFAULT 0,
        PRIMARY KEY (`answerid`)
      )""")
      cursor.execute("""CREATE TABLE IF NOT EXISTS `questions2` (
        `questionid` int NOT NULL AUTO_INCREMENT,
        `title` varchar(400),
        `body` varchar(3000),
        `maker` varchar(255) DEFAULT 'anan  ymous',
        `upvotes` int DEFAULT 0,
        `downvotes` int DEFAULT 0,
        `answers` int DEFAULT 0,
        PRIMARY KEY (`questionid`)
        
      )""")
      cursor.execute("""CREATE TABLE IF NOT EXISTS `followers` (
        `followerid` int NOT NULL,
        `followeeid` int NOT NULL
      )""")
      cursor.execute("""CREATE TABLE IF NOT EXISTS `tags` (
        `tagname` int NOT NULL,
        `questionid` int NOT NULL
      )""")
  
"""

def get_category_from_id(id: int) -> Optional[Category]:
  with connection.cursor() as cursor:
    sql = ""SELECT * FROM `category` WHERE `id`=%d""
    cursor.execute(sql, (id))
    r = cursor.fetchone()
    if r is None:
      return None
    return Category.from_dict(r)


def get_category_from_name(name: str) -> Optional[Category]:
  with connection.cursor() as cursor:
    sql = ""SELECT * FROM `category` WHERE `name`=%s""
    cursor.execute(sql, (name))
    r = cursor.fetchone()
    if r is None:
      return None
    return Category.from_dict(r)

"""
def get_user_from_name(username):
  with connection.cursor() as cursor:
    sql = """SELECT * FROM `users` WHERE `username`=%s"""
    cursor.execute(sql, (username))
    r = cursor.fetchall()
    if r is None:
      return None
    return r

def get_question_from_id(id):
  with connection.cursor() as cursor:
    sql = """SELECT * FROM `questions` WHERE `questionid`=%s"""
    cursor.execute(sql, (id))
    r = cursor.fetchall()
    if r is None:
      return None
    return r


def get_all_users():
  with connection.cursor() as cursor:
    sql = """SELECT username,location,userrating FROM `users`"""
    cursor.execute(sql)
    r = cursor.fetchall()
    if r == ():
      return None
    return r


def add_user(user):

  with connection.cursor() as cursor:
    sql = """SELECT * FROM `users` WHERE `username`=%s"""
    cursor.execute(sql, (user["username"]))
    r = cursor.fetchone()
    # print(r)
    if r == None:
     sql = f"INSERT INTO users (username,password) VALUES (%s,%s)"
     cursor.execute(sql, (user["username"],user["password"]))
     connection.commit()
     return True
    else:
      return False
      
# def add_question(question):

#   with connection.cursor() as cursor:

    #  sql = f"""SELECT `questionid` FROM `questions` WHERE `title`=%s"""
    #  cursor.execute(sql, (question["title"]))
    #  r1 = cursor.fetchone()
    #  sql = f"""SELECT `userid` FROM `users` WHERE `username`=%s"""
    #  cursor.execute(sql, (question["username"]))
    #  r2 = cursor.fetchone()
    #  sql = f"INSERT INTO questions (body,title,maker) VALUES (%s,%s,%s)"
    #  cursor.execute(sql, (question["body"],question["title"],question["username"]))
    #  connection.commit()
    #  return True

def add_question(question):

  with connection.cursor() as cursor:
      
     sql = f"INSERT INTO questions2 (title,body,maker)VALUES (%s,%s,%s)"
     cursor.execute(sql, (question["title"],question["body"],question["username"]))
     connection.commit()
     return True

    
def get_questions_from_title(title):
  with connection.cursor() as cursor:
    sql = """SELECT * FROM `questions2` WHERE `title`=%s"""
    cursor.execute(sql, (title))
    r = cursor.fetchall()
    return r

def get_questions_from_name(username):
  with connection.cursor() as cursor:
    sql = """SELECT * FROM `questions2` WHERE `maker`=%s"""
    cursor.execute(sql, (username))
    r = cursor.fetchall()
    return r

def clear():
    with connection.cursor() as cursor:
     print("lskjdf")
     sql = """DELETE FROM `questions2` WHERE `questionid`='' OR `questionid` IS NULL"""
     cursor.execute(sql)
    return 
def get_questions():
    with connection.cursor() as cursor:
     sql = """SELECT * FROM `questions2`"""
     cursor.execute(sql)
     r = cursor.fetchall()
    return r


def user_login(username):
  with connection.cursor() as cursor:
    sql = """SELECT * FROM `users` WHERE `username`=%s"""
    cursor.execute(sql, (username))
    r = cursor.fetchone()
    return r

"""
def get_tag_from_id(id: int) -> Optional[Tag]:
  with connection.cursor() as cursor:
    sql = ""SELECT * FROM `tag` WHERE `id`=%d""
    cursor.execute(sql, (id))
    r = cursor.fetchone()
    if r is None:
      return None
    return Tag.from_dict(r)


def get_tag_from_name(name: str) -> Optional[Tag]:
  with connection.cursor() as cursor:
    sql = ""SELECT * FROM `tag` WHERE `name`=%s""
    cursor.execute(sql, (name))
    r = cursor.fetchone()
    if r is None:
      return None
    return Tag.from_dict(r)


def add_tag(tag: Tag) -> None:
  assert tag.id is None
  t = get_tag_from_name(tag.name)
  if t is not None:
    tag.id = t.id
    return

  with connection.cursor() as cursor:
    sql = f"INSERT INTO tag (name) VALUES (%s)"
    cursor.execute(sql, (tag.name))
    connection.commit()
    tag.id = cursor.lastrowid


def add_pet(pet: Pet) -> None:
  assert pet.id is None
  if pet.category.id is None:
    add_category(pet.category)
  for tag in pet.tags:
    if tag.id is None:
      add_tag(tag)

  with connection.cursor() as cursor:
    sql = f"INSERT INTO pet (name, photo_urls, category_id, status) VALUES " \
          f"(%s, %s, %s, %s)"
    cursor.execute(sql, (pet.name, pet.photo_urls, pet.category.id, pet.status))
    connection.commit()
    pet.id = cursor.lastrowid

    sql = f"INSERT INTO pet_tag (pet_id, tag_id) VALUES (%s, %s)"
    for tag in pet.tags:
      cursor.execute(sql, (pet.id, tag.id))
    connection.commit()

"""