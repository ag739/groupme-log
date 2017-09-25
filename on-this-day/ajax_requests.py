from django.http import JsonResponse

import json
import urllib2
from datetime import datetime
from collections import defaultdict

def getRequestData(url_addon):
  """Loads JSON data from request"""
  url = "https://api.groupme.com/v3/groups{}".format(url_addon)
  return json.loads(urllib2.urlopen(url).read())



def isInDateRange(date0, date1, month, day):
  """
  precondition: date0 >= date1
  check if date1 <= today <= date0
  """
  # remove time in datetime object
  date0 = datetime(date0.year, date0.month, date0.day)
  date1 = datetime(date1.year, date1.month, date1.day)
  today = datetime(date0.year, month, day)
  # today is assuming date0's year
  if date1 <= today <= date0:
    return True
  # however, if date0 is 8/22/16 but today is 8/23
  # 8/23 is not <= 8/22
  # but if date1 is 8/25/14, the functionshould return true
  # so subtract today's date's year by 1 to see if it falls in range
  today = datetime(date0.year - 1, month, day)
  return date1 <= today <= date0



def listGroups(request):
  """Lists all GroupMe groups given an access token"""
  groups = []
  at = request.GET.get('at', None)

  try:
    data = getRequestData("?token={}&omit=memberships".format(at))
    for group in data["response"]:
      groups.append({
        "group_id":   group["group_id"],
        "name":       group["name"],
        "image_url":  group["image_url"]
      })
  except Exception as e:
    pass
  finally:
    return JsonResponse({"groups": groups})



def getMessages(request):
  """List all messages for a particular group id"""
  group_id = request.GET.get('id', None)
  at = request.GET.get('at', None)

  month, day = datetime.now().month, datetime.now().day

  try:
    data = getRequestData("/{}?token={}".format(group_id, at))
    first = datetime.fromtimestamp(data["response"]["created_at"])
  except Exception as e:
    first = None

  res = defaultdict(list)
  res["years"] = []
  url = "/{}/messages?token={}&limit=100".format(group_id, at)

  try:
    while True:
      data = getRequestData(url)
      messages = data["response"]["messages"]

      # check if messages falls within range of today's date
      date0 = datetime.fromtimestamp(messages[0]["created_at"])
      # check if we're done looping through
      if not isInDateRange(date0, first, month, day):
        # print "{}/{} is no longer in the range of {} - {}".format(month, day, datetime.strftime(first, "%m/%d/%Y"), datetime.strftime(date0, "%m/%d/%Y"))
        break
      date1 = datetime.fromtimestamp(messages[len(messages)-1]["created_at"])

      if isInDateRange(date0, date1, month, day):
        # print "looping through messages in range {} - {}".format(datetime.strftime(date1, "%m/%d/%Y"), datetime.strftime(date0, "%m/%d/%Y"))
        for message in messages:

          m_date = datetime.fromtimestamp(message["created_at"])

          if m_date.month == month and m_date.day == day:

            if not m_date.year in res["years"]:
              res["years"].append(m_date.year)

            res[m_date.year].append({"time": datetime.strftime(m_date, "%B %d, %Y, %X"),
                "name":         message["name"],
                "avatar":       message["avatar_url"],
                "text":         message["text"],
                "system":       message["system"],
                "attachments":  message["attachments"]
              })

      # reset while loop
      url ="/{}/messages?token={}&limit=100&before_id={}".format(group_id, at, messages[len(messages) - 1]["id"])

  except Exception as e:
    pass

  finally:
    for key in res.keys():
      if key != "years":
        res[key] = res[key][::-1]
    return JsonResponse({"messages": res})
