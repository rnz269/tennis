import fetch from "node-fetch";

fetch(
  "https://penntennis.clubautomation.com/event/reserve-court-new?ajax=true",
  {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-instana-l": "1,correlationType=web;correlationId=6c8393dd5b5571e2",
      "x-instana-s": "6c8393dd5b5571e2",
      "x-instana-t": "6c8393dd5b5571e2",
      "x-requested-with": "XMLHttpRequest",
      cookie:
        "PHPSESSID=740i72s38p1p3i9vvoo966n6pc; isLoggedIn=1; __cf_bm=J8j3iYIQgndwBZi7QtvrtdwOAO8FIENUQZKNOTtjmrg-1739834887-1.0.1.1-69kMN2dCk0TGiRnOamq6W5hWggHfw7avEzh5wsvKYBwtoclbXy7bNmgAAArgttIi01K5DB4AT4di1QdtEZCeIw; cf_clearance=JxfCdG5OqXz1SbvYjUOmszumpINYl9PxdeVSLjf1OBc-1739835148-1.2.1.1-mQ7ZJrwDfrBZGxaEhnFUtDv76eeTHHzvTyfchsrecwRU2goex9EY9KBJq9J35QMFXbfJXfZr7wIMpIRM9UOEInPMMlFgVE1hp91r6Q8WF3mKxdcmdXyQ7y18UVRQ_TcQ8bbA9TNFwTdLbQM711we2PDz6dNJ5NZ1Tjli3Mv1L0JYs2oHP0Vx20wUhX.ueuMvIoMWtKPEci9O3ENd7v0gFVOUtiTMdrx1qFkizvZZF0VeYlnCj1w7BCF75shyrJuk1EXZN_fbL5AWs5NMS6j2sv5m2XdCIAOKmCz08z1I4v8; SessionExpirationTime=1739863959",
      Referer: "https://penntennis.clubautomation.com/event/reserve-court-new",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "reservation-list-page=1&user_id=13057&event_member_token_reserve_court=3c2fc409b9cb8e80b875e357343b75c3&current_guest_count=0&component=2&club=-1&location=-1&court=-1&host=13057&add-new-child-to-guest_1=&add-new-child-to-guest_2=&add-new-child-to-guest_3=&add-new-child-to-guest_4=&add-new-child-to-guest_5=&add-new-child-to-guest_6=&add-new-child-to-guest_7=&add-new-child-to-guest_8=&add-new-child-to-guest_9=&add-new-child-to-guest_10=&add-new-child-to-guest_11=&add-new-child-to-guest_12=&add-new-child-to-guest_13=&add-new-child-to-guest_14=&add-new-child-to-guest_15=&date=02%2F17%2F2025&interval=60&timeFrom=1&timeTo=23&time-reserve=&location-reserve=&surface-reserve=&courtsnotavailable=&join-waitlist-case=0",
    method: "POST",
  }
);
